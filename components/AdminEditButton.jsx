"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateProduct } from "@/app/admin/actions";

const FIELDS = [
  { key: "name", label: "Name", type: "text" },
  { key: "price", label: "Price (USD)", type: "number" },
  { key: "was", label: "Was price (leave empty for none)", type: "number" },
  { key: "stockQty", label: "Stock (leave empty = not tracked)", type: "number" },
  { key: "description", label: "Description", type: "textarea" },
];

export default function AdminEditButton({ productId }) {
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { admin: false }))
      .then((d) => { if (!cancelled) setAdmin(Boolean(d.admin)); })
      .catch(() => { if (!cancelled) setAdmin(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function openEditor() {
    setOpen(true);
    setErrors([]);
    setStatus("loading");
    try {
      const r = await fetch(`/api/admin/products/${productId}`, { cache: "no-store" });
      if (!r.ok) throw new Error("load");
      const d = await r.json();
      setData(d);
      setDraft({ ...d });
      setStatus("idle");
    } catch {
      setErrors(["Could not load this product. Sign in again and retry."]);
      setStatus("error");
    }
  }

  async function save(e) {
    e.preventDefault();
    setStatus("saving");
    setErrors([]);
    const fd = new FormData();
    fd.set("id", String(data.id));
    for (const [k, v] of Object.entries(draft)) {
      if (k === "featured") { if (v) fd.set("featured", "on"); continue; }
      fd.set(k, v == null ? "" : String(v));
    }
    try {
      const result = await updateProduct(null, fd);
      if (result?.errors?.length) {
        setErrors(result.errors);
        setStatus("error");
        return;
      }
      setStatus("saved");
      setTimeout(() => window.location.reload(), 600);
    } catch {
      setErrors(["Save failed. Check your connection and try again."]);
      setStatus("error");
    }
  }

  if (!admin) return null;

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className="u-pill fixed left-4 top-24 z-50 inline-flex h-10 items-center bg-ink px-5 text-[0.85rem] font-semibold text-linen shadow-md hover:bg-ink-soft"
      >
        Edit product
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Quick edit product"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-md border border-ink bg-linen p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Quick edit</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-ink-soft hover:text-ink" aria-label="Close">✕</button>
            </div>

            {status === "loading" && <p className="mt-4 text-sm text-shade">Loading…</p>}

            {draft && (
              <form onSubmit={save} className="mt-4 space-y-3">
                {FIELDS.map((f) => (
                  <label key={f.key} className="block">
                    <span className="text-[0.8rem] text-shade">{f.label}</span>
                    {f.type === "textarea" ? (
                      <textarea
                        value={draft[f.key] ?? ""}
                        onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                        rows={4}
                        className="mt-1 w-full rounded-sm border border-rule bg-white px-3 py-2 text-sm text-ink"
                      />
                    ) : (
                      <input
                        type={f.type}
                        step={f.type === "number" ? "0.01" : undefined}
                        value={draft[f.key] ?? ""}
                        onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                        className="mt-1 h-10 w-full rounded-sm border border-rule bg-white px-3 text-sm text-ink"
                      />
                    )}
                  </label>
                ))}

                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={Boolean(draft.featured)}
                    onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                  />
                  Featured
                </label>

                {errors.length > 0 && (
                  <ul className="rounded-sm border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                    {errors.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button type="submit" disabled={status === "saving" || status === "saved"}
                    className="u-pill h-10 bg-ink px-5 text-sm font-semibold text-linen hover:bg-ink-soft disabled:opacity-60">
                    {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save changes"}
                  </button>
                  <Link href={`/admin/products/${productId}`} className="text-sm text-ink underline">
                    Open full editor
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
