"use client";

import { useEffect, useState } from "react";

const LABEL = {
  awaiting_payment: "Waiting for payment",
  payment_seen: "Payment seen, confirming",
  partially_paid: "Partial payment received. Our team will contact you.",
  expired: "This payment expired. Contact us to start a new one.",
  refunded: "This payment was refunded.",
  paid: "Payment received",
};

export default function PaymentStatus({ reference, initial }) {
  const [state, setState] = useState(initial ?? "awaiting_payment");

  useEffect(() => {
    let timer;
    let stopped = false;

    async function check() {
      if (document.visibilityState === "visible") {
        try {
          const r = await fetch(`/api/orders/${encodeURIComponent(reference)}/status`, { cache: "no-store" });
          if (r.ok) {
            const d = await r.json();
            if (!stopped) setState(d.paymentStatus ?? "awaiting_payment");
            if (d.paymentStatus === "paid") return;
          }
        } catch {
          /* network blip: try again on the next tick */
        }
      }
      if (!stopped) timer = setTimeout(check, 5000);
    }

    check();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [reference]);

  const text = LABEL[state] ?? LABEL.awaiting_payment;
  const paid = state === "paid";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-6 rounded-sm border px-4 py-3 text-sm ${paid ? "border-green-text text-green-text" : "border-rule text-ink"}`}
    >
      {text}
    </div>
  );
}
