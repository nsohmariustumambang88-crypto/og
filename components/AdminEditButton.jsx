"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { updateProduct, setProductPhoto } from "@/app/admin/actions";

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
  const [photoBusy, setPhotoBusy] = useState("");
  const [photoMsg, setPhotoMsg] = useState("");
  const fileRef = useRef(null);

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
    setPhotoMsg("");
    setStatus("loading");
    try {
      const r = await fetch(`/api/admin/products/${productId}`, { cache: "no-store" });
      if (!r.ok) throw new Error("load");
      const d = await r.json();
      setData(d);
      setDraft(d);
      setStatus("idle");
    } catch {
      setErrors(["Could not load this product. Sign in again and retry."]);
      setStatus("error");
    }
  }

  function applyPhoto(next) {
    setDraft((d) => ({ ...d, imageAvif: next.imageAvif, imageWebp: next.imageWebp, photo: { url: next.url, source: next.source } }));
  }

  async function savePhoto(fd) {
    setPhotoMsg("");
    const result = await setProductPhoto(null, fd);
    if (result?.errors?.length) {
      setPhotoMsg(result.errors.join(" "));
      return false;
    }
    return true;
  }

  async function uploadPhoto(file) {
    setPhotoBusy("uploading");
    try {
      const sr = await fetch("/api/admin/cloudinary-sign", { method: "POST", cache: "no-store" });
      if (!sr.ok) throw new Error("sign");
      const sig = await sr.json();

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", sig.apiKey);
      body.append("timestamp", String(sig.timestamp));
      body.append("signature", sig.signature);
      body.append("folder", sig.folder);

      const ur = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, { method: "POST", body });
      const up = await ur.json();
      if (!ur.ok || !up.public_id) throw new Error(up?.error?.message || "upload");

      setPhotoBusy("saving");
      const fd = new FormData();
      fd.set("id", String(data.id));
      fd.set("mode", "cloud");
      fd.set("publicId", up.public_id);
      if (await savePhoto(fd)) {
        applyPhoto({ imageAvif: "", imageWebp: "", url: up.secure_url, source: "cloudinary" });
        setPhotoMsg("Photo uploaded to Cloudinary.");
      }
    } catch (err) {
      setPhotoMsg(`Upload failed: ${err.message}. Try a JPG or PNG under 10 MB.`);
    } finally {
      setPhotoBusy("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function pickLibrary(item) {
    setPhotoBusy("saving");
    const fd = new FormData();
    fd.set("id", String(data.id));
    fd.set("mode", "library");
    fd.set("avif", item.avif);
    if (await savePhoto(fd)) {
      applyPhoto({ imageAvif: item.avif, imageWebp: item.webp, url: item.webp, source: "local" });
      setPhotoMsg("Photo switched.");
    }
    setPhotoBusy("");
  }

  async function removePhoto() {
    setPhotoBusy("saving");
    const fd = new FormData();
    fd.set("id", String(data.id));
    fd.set("mode", "none");
    if (await savePhoto(fd)) {
      applyPhoto({ imageAvif: "", imageWebp: "", url: null, source: null });
      setPhotoMsg("Photo removed. The site will show the package label.");
    }
    setPhotoBusy("");
  }

  async function save(e) {
    e.preventDefault();
    setStatus("saving");
    setErrors([]);
    const { photo, library, ...fields } = draft;
    const fd = new FormData();
    fd.set("id", String(data.id));
    for (const [k, v] of Object.entries(fields)) {
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

  const busy = Boolean(photoBusy);

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
          <div className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-md border border-ink bg-linen p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Quick edit</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-ink-soft hover:text-ink" aria-label="Close">✕</button>
            </div>

            {status === "loading" && <p className="mt-4 text-sm text-shade">Loading…</p>}

            {draft && (
              <>
                <section className="mt-4 rounded-sm border border-rule bg-white p-4">
                  <h3 className="text-sm font-semibold text-ink">Photo</h3>
                  <div className="mt-3 flex gap-4">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-sm border border-rule bg-linen">
                      {draft.photo?.url ? (
                        <img src={draft.photo.url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="grid h-full place-items-center px-2 text-center text-xs text-mute">No photo (package label shows)</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <input ref={fileRef} type="file" accept="image/*" className="hidden"
                        onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
                      <button type="button" disabled={busy} onClick={() => fileRef.current?.click()}
                        className="u-pill h-9 bg-ink px-4 font-semibold text-linen hover:bg-ink-soft disabled:opacity-60">
                        {photoBusy === "uploading" ? "Uploading…" : "Upload from my computer"}
                      </button>
                      <button type="button" disabled={busy || !draft.photo?.url} onClick={removePhoto}
                        className="u-pill h-9 border border-ink px-4 text-ink disabled:opacity-40">
                        Remove photo
                      </button>
                      {photoMsg && <p className="text-xs text-shade">{photoMsg}</p>}
                    </div>
                  </div>

                  {draft.library?.length > 0 && (
                    <>
                      <p className="mt-4 text-xs text-shade">Or switch to a library photo for this category:</p>
                      <div className="mt-2 grid max-h-56 grid-cols-6 gap-2 overflow-y-auto">
                        {draft.library.map((item) => {
                          const selected = draft.imageAvif === item.avif;
                          return (
                            <button key={item.avif} type="button" disabled={busy} onClick={() => pickLibrary(item)}
                              aria-label={`Use ${item.label}`}
                              className={`aspect-square overflow-hidden rounded-sm border-2 ${selected ? "border-ink" : "border-transparent"} disabled:opacity-60`}>
                              <img src={item.webp} alt="" loading="lazy" className="h-full w-full object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </section>

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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
