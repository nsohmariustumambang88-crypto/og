"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db, schema } from "@/db/client";
import { createPayment, CRYPTO_COINS } from "@/lib/nowpayments";

const { orders } = schema;

export async function retryPayment(formData) {
  const reference = String(formData.get("reference") ?? "");
  const [order] = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1);
  if (!order || order.paymentId || order.paymentStatus === "paid") {
    redirect(`/checkout/payment?order=${reference}`);
  }

  const coin = String(order.paymentMethod ?? "");
  if (CRYPTO_COINS[coin]) {
    try {
      const payment = await createPayment({
        priceAmount: order.totalCents / 100,
        orderId: order.reference,
        payCurrency: coin,
        ipnCallbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/nowpayments`,
      });
      await db.update(orders).set({
        paymentId: payment.paymentId,
        payCurrency: payment.payCurrency,
        payAmount: payment.payAmount,
        payAddress: payment.payAddress,
      }).where(eq(orders.id, order.id));
    } catch (err) {
      console.error("nowpayments: retry failed for", reference, err.message);
    }
  }

  redirect(`/checkout/payment?order=${reference}`);
}
