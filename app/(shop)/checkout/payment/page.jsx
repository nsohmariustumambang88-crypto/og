import Link from "next/link";
import { eq } from "drizzle-orm";
import QRCode from "qrcode";
import { db, schema } from "@/db/client";
import CopyField from "@/components/CopyField";
import PaymentStatus from "@/components/PaymentStatus";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pay for your order — weedmap.store", robots: { index: false, follow: false } };

const money = (c) => `$${((c ?? 0) / 100).toFixed(2)}`;
const NETWORK = { btc: "Bitcoin network", eth: "Ethereum (ERC-20)" };

export default async function PaymentPage({ searchParams }) {
  const sp = await searchParams;
  const reference = typeof sp.order === "string" ? sp.order : "";
  const [order] = reference
    ? await db.select({
        reference: schema.orders.reference,
        totalCents: schema.orders.totalCents,
        paymentId: schema.orders.paymentId,
        payCurrency: schema.orders.payCurrency,
        payAmount: schema.orders.payAmount,
        payAddress: schema.orders.payAddress,
        paymentStatus: schema.orders.paymentStatus,
      }).from(schema.orders).where(eq(schema.orders.reference, reference)).limit(1)
    : [];

  if (!order) {
    return (
      <div className="u-shell py-16">
        <h1 className="u-display text-[2rem]">Order not found</h1>
        <Link href="/products" className="mt-6 inline-block underline">Back to shop</Link>
      </div>
    );
  }

  const coin = (order.payCurrency ?? "").toLowerCase();
  const qr = order.payAddress
    ? await QRCode.toDataURL(order.payAddress, { margin: 1, width: 220 })
    : null;

  return (
    <div className="u-shell py-[clamp(2rem,4vw,3rem)] max-w-[620px]">
      <p className="u-meta text-mute">Order {order.reference}</p>
      <h1 className="u-display mt-3 text-[clamp(1.8rem,4vw,2.5rem)]">Pay with crypto</h1>
      <p className="mt-2 text-shade">Order total {money(order.totalCents)} (USD)</p>

      <PaymentStatus reference={order.reference} initial={order.paymentStatus} />

      {order.payAddress ? (
        <div className="mt-8 space-y-6">
          <div>
            <p className="u-meta text-mute">Amount to send</p>
            <p className="mt-1 text-xl font-semibold text-ink">
              {order.payAmount} {coin.toUpperCase()}
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
          <Link href={`/checkout/payment?order=${order.reference}`} className="mt-4 inline-block underline">Try again</Link>
        </div>
      )}
    </div>
  );
}
