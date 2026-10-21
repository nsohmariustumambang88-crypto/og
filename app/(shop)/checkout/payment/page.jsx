import Link from "next/link";
import { inArray } from "drizzle-orm";
import QRCode from "qrcode";
import { db, schema } from "@/db/client";
import CopyField from "@/components/CopyField";
import PaymentStatus from "@/components/PaymentStatus";
import { retryPayment } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pay for your order — weedmap.store", robots: { index: false, follow: false } };

const money = (c) => `$${((c ?? 0) / 100).toFixed(2)}`;
const NETWORK = { btc: "Bitcoin network", eth: "Ethereum (ERC-20)" };

export default async function PaymentPage({ searchParams }) {
  const sp = await searchParams;
  const refs = [
    ...(typeof sp.order === "string" ? [sp.order] : []),
    ...(typeof sp.also === "string" ? sp.also.split(",").filter(Boolean) : []),
  ].slice(0, 20);

  const rows = refs.length
    ? await db.select({
        reference: schema.orders.reference,
        totalCents: schema.orders.totalCents,
        paymentMethod: schema.orders.paymentMethod,
        paymentId: schema.orders.paymentId,
        payCurrency: schema.orders.payCurrency,
        payAmount: schema.orders.payAmount,
        payAddress: schema.orders.payAddress,
        paymentStatus: schema.orders.paymentStatus,
      }).from(schema.orders).where(inArray(schema.orders.reference, refs))
    : [];

  const ordered = refs.map((r) => rows.find((o) => o.reference === r)).filter(Boolean);

  if (!ordered.length) {
    return (
      <div className="u-shell py-16">
        <h1 className="u-display text-[2rem]">Order not found</h1>
        <Link href="/products" className="mt-6 inline-block underline">Back to shop</Link>
      </div>
    );
  }

  const blocks = await Promise.all(ordered.map(async (order) => {
    const coin = (order.payCurrency ?? order.paymentMethod ?? "").toLowerCase();
    const qr = order.payAddress
      ? await QRCode.toDataURL(order.payAddress, { margin: 1, width: 220 })
      : null;
    return { order, coin, qr };
  }));

  return (
    <div className="u-shell py-[clamp(2rem,4vw,3rem)] max-w-[620px] space-y-12">
      {blocks.map(({ order, coin, qr }) => (
        <section key={order.reference}>
          <p className="u-meta text-mute">Order {order.reference}</p>
          <h1 className="u-display mt-3 text-[clamp(1.8rem,4vw,2.5rem)]">Pay with crypto</h1>
          <p className="mt-2 text-shade">Order total {money(order.totalCents)} (USD)</p>

          <PaymentStatus reference={order.reference} initial={order.paymentStatus} />

          {order.payAddress ? (
            <div className="mt-8 space-y-6">
              <div>
                <p className="u-meta text-mute">Amount to send</p>
                <p className="mt-1 text-xl font-semibold text-ink">
                  {String(order.payAmount)} {coin.toUpperCase()}
                </p>
                <CopyField label="Amount" value={String(order.payAmount)} />
              </div>

              <div>
                <p className="u-meta text-mute">Network</p>
                <p className="mt-1 font-semibold text-ink">{NETWORK[coin] ?? coin.toUpperCase()}</p>
                <p className="mt-1 text-sm text-shade">Send only on this network. Other networks lose the funds.</p>
              </div>

              <div>
                <CopyField label="Wallet address" value={order.payAddress} />
                {qr && <img src={qr} alt="QR code for the wallet address" width={220} height={220} className="mt-4 rounded-sm" />}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-sm border border-rule p-5">
              <p className="text-ink">Your order is saved, but the payment couldn&apos;t start. Please try again.</p>
              <form action={retryPayment} className="mt-4">
                <input type="hidden" name="reference" value={order.reference} />
                <button type="submit" className="u-pill h-10 bg-ink px-5 text-sm font-semibold text-linen hover:bg-ink-soft">
                  Try payment again
                </button>
              </form>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
