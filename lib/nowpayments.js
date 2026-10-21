import { createHmac, timingSafeEqual } from "node:crypto";

const BASE = "https://api.nowpayments.io/v1";

function apiKey() {
  const key = process.env.NOWPAYMENTS_API_KEY;
  if (!key) throw new Error("NOWPAYMENTS_API_KEY is not set");
  return key;
}

export const CRYPTO_COINS = { btc: "btc", eth: "eth" };

export async function createPayment({ priceAmount, orderId, payCurrency, ipnCallbackUrl }) {
  const res = await fetch(`${BASE}/payment`, {
    method: "POST",
    headers: { "x-api-key": apiKey(), "Content-Type": "application/json" },
    body: JSON.stringify({
      price_amount: priceAmount,
      price_currency: "usd",
      pay_currency: payCurrency,
      order_id: orderId,
      ipn_callback_url: ipnCallbackUrl,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`NOWPayments create payment failed (${res.status})`);
  const paymentId = String(body.payment_id ?? body.id ?? "");
  if (!paymentId || !body.pay_address) throw new Error("NOWPayments response was missing the payment address");
  return {
    paymentId,
    payAddress: body.pay_address,
    payAmount: String(body.pay_amount),
    payCurrency: body.pay_currency,
  };
}

export async function getPaymentStatus(paymentId) {
  const res = await fetch(`${BASE}/payment/${encodeURIComponent(paymentId)}`, {
    headers: { "x-api-key": apiKey() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`NOWPayments status lookup failed (${res.status})`);
  return res.json();
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    return Object.keys(value).sort().reduce((out, k) => {
      out[k] = sortKeys(value[k]);
      return out;
    }, {});
  }
  return value;
}

export function verifyIpnSignature(rawBody, signature) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret || !signature) return null;
  let parsed;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return null;
  }
  const expected = createHmac("sha512", secret)
    .update(JSON.stringify(sortKeys(parsed)))
    .digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(String(signature), "utf8");
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? parsed : null;
}
