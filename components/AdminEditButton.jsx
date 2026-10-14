"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminEditButton({ productId }) {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { admin: false }))
      .then((d) => { if (!cancelled) setAdmin(Boolean(d.admin)); })
      .catch(() => { if (!cancelled) setAdmin(false); });
    return () => { cancelled = true; };
  }, []);

  if (!admin) return null;

  return (
    <Link
      href={`/admin/products/${productId}`}
      className="u-pill fixed left-4 top-24 z-50 inline-flex h-10 items-center bg-ink px-5 text-[0.85rem] font-semibold text-linen shadow-md hover:bg-ink-soft"
    >
      Edit product
    </Link>
  );
}
