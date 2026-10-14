import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db, schema } from "@/db/client";
import { resolveProductImage } from "@/lib/images";
import manifest from "@/public/products/manifest.json";

export const dynamic = "force-dynamic";

const dollars = (cents) => (cents == null ? "" : (cents / 100).toFixed(2));
const list = (xs) => (Array.isArray(xs) ? xs.join(", ") : "");

export async function GET(_request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Not signed in." }, { status: 401 });

  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) return Response.json({ error: "Bad id." }, { status: 400 });

  const [p] = await db.select().from(schema.products).where(eq(schema.products.id, productId)).limit(1);
  if (!p) return Response.json({ error: "Not found." }, { status: 404 });

  const [cat] = await db.select({ slug: schema.categories.slug }).from(schema.categories)
    .where(eq(schema.categories.id, p.categoryId)).limit(1);
  const categorySlug = cat?.slug ?? "";

  const photo = resolveProductImage(p, "card");

  return Response.json({
    id: p.id,
    name: p.name,
    price: dollars(p.priceCents),
    was: dollars(p.wasPriceCents),
    description: p.description ?? "",
    stockQty: p.stockQty == null ? "" : String(p.stockQty),
    lowStockAt: String(p.lowStockAt ?? 5),
    featured: Boolean(p.featured),
    brandId: p.brandId ?? "",
    categoryId: p.categoryId ?? "",
    subcategoryId: p.subcategoryId ?? "",
    shopId: p.shopId ?? "",
    strainType: p.strainType ?? "",
    weight: p.weight ?? "",
    thc: String(p.thc ?? ""),
    cbd: String(p.cbd ?? ""),
    distance: String(p.distanceMi ?? ""),
    colorway: p.colorway ?? "",
    effects: list(p.effects),
    flavors: list(p.flavors),
    tags: list(p.tags),
    imageAvif: p.imageAvif ?? "",
    imageWebp: p.imageWebp ?? "",
    photo: {
      url: photo?.src ?? null,
      source: photo?.source ?? null,
    },
    library: (manifest[categorySlug] ?? []).map((i) => ({ avif: i.avif, webp: i.webp, label: i.slug })),
  });
}
