import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { verifyIpnSignature } from "@/lib/nowpayments";
import { notifyPaymentConfirmed } from "@/lib/notify";

export const dynamic = "force-dynamic";

const { orders, shops } = schema;

const SEEN = new Set(["confirming", "confirmed", "sending"]);

export async function POST(request) {
  const raw = await request.text();
  const body = verifyIpnSignature(raw, request.headers.get("x-nowpayments-sig"));
  if (!body) return new Response("invalid signature", { status: 401 });

  const reference = String(body.order_id ?? "");
  const [order] = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1);
  if (!order) return new Response("ok", { status: 200 });

  const paymentId = String(body.payment_id ?? "");
  if (!order.paymentId || paymentId !== order.paymentId) {
    console.warn("nowpayments: payment_id mismatch", reference);
    return new Response("ok", { status: 200 });
  }

  const amountMatches = Math.abs(Number(body.price_amount) - order.totalCents / 100) < 0.005;
  const currencyMatches = String(body.price_currency ?? "").toLowerCase() === "usd";
  const status = String(body.payment_status ?? "");

  if (status === "finished") {
    if (!amountMatches || !currencyMatches) {
      await db.update(orders).set({ paymentStatus: "flagged" }).where(eq(orders.id, order.id));
      return new Response("ok", { status: 200 });
    }
    if (order.paymentStatus === "paid") return new Response("ok", { status: 200 });

    await db.update(orders).set({
      paymentStatus: "paid",
      paymentConfirmedAt: new Date(),
      paymentConfirmedBy: "nowpayments",
      status: "confirmed",
    }).where(eq(orders.id, order.id));

    const [row] = await db.select({
      contactEmail: orders.contactEmail, deliveryAddress: orders.deliveryAddress,
      total: orders.totalCents, reference: orders.reference, shopName: shops.name,
    }).from(orders).leftJoin(shops, eq(orders.shopId, shops.id)).where(eq(orders.id, order.id)).limit(1);

    if (row?.contactEmail) {
      await notifyPaymentConfirmed({
        id: order.id,
        reference: row.reference,
        totalCents: row.total,
        contactEmail: row.contactEmail,
        deliveryAddress: row.deliveryAddress,
        shopName: row.shopName,
      });
    }
    return new Response("ok", { status: 200 });
  }

  if (order.paymentStatus === "paid") return new Response("ok", { status: 200 });

  let next = null;
  if (SEEN.has(status)) next = "payment_seen";
  else if (status === "partially_paid") next = "partially_paid";
  else if (status === "failed" || status === "expired") next = "expired";
  else if (status === "refunded") next = "refunded";

  if (next && next !== order.paymentStatus) {
    await db.update(orders).set({ paymentStatus: next }).where(eq(orders.id, order.id));
  }
  return new Response("ok", { status: 200 });
}
