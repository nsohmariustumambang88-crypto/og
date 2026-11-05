import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";
import { Breadcrumb } from "@/components/PageHeader";
import { canonical } from "@/lib/seo";
import { DELIVERY_CITIES, MIN_LIVE_SERVICES, shopServesCity } from "@/lib/delivery-areas";

export const revalidate = 86400;

const money = (c) => (c == null ? "—" : `$${(c / 100).toFixed(2)}`);

function findCity(slug) {
  return DELIVERY_CITIES.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return DELIVERY_CITIES.map((c) => ({ city: c.slug }));
}

async function liveServices(city) {
  const rows = await db.select({
    slug: schema.shops.slug,
    name: schema.shops.name,
    serviceArea: schema.shops.serviceArea,
    etaMin: schema.shops.etaMinMinutes,
    etaMax: schema.shops.etaMaxMinutes,
    fee: schema.shops.deliveryFeeCents,
    minOrder: schema.shops.minOrderCents,
    freeOver: schema.shops.freeDeliveryOverCents,
    live: schema.shops.deliveringNow,
  }).from(schema.shops).where(eq(schema.shops.deliveringNow, true));
  return rows.filter((s) => shopServesCity(s.serviceArea, city));
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) return {};
  return {
    title: `Cannabis delivery in ${city.name} — weedmap.store`,
    description: `Licensed cannabis delivery in ${city.name}, ${city.state}. Compare the services that deliver there now, with their delivery times, fees and minimum orders.`,
    alternates: canonical(`/delivery-areas/${city.slug}`),
  };
}

export default async function DeliveryAreaPage({ params }) {
  const { city: slug } = await params;
  const city = findCity(slug);
  if (!city) notFound();

  const services = await liveServices(city);
  if (services.length < MIN_LIVE_SERVICES) notFound();

  const trail = [
    { label: "Home", href: "/" },
    { label: "Delivery", href: "/deliveries" },
    { label: city.name },
  ];

  return (
    <>
      <div className="u-shell pt-[clamp(1.5rem,3vw,2.5rem)]">
        <Breadcrumb trail={trail} />
      </div>

      <header className="u-shell py-[clamp(2rem,4vw,3rem)]">
        <h1 className="u-display text-[clamp(2rem,5vw,3.4rem)]">Cannabis delivery in {city.name}</h1>
        <p className="u-prose mt-4 max-w-[60ch] text-shade">
          {services.length} licensed {services.length === 1 ? "service delivers" : "services deliver"} in {city.name}, {city.state} right now.
          Each one sets its own delivery time, fee and minimum order, shown below.
        </p>
      </header>

      <section className="u-shell pb-[clamp(2rem,4vw,3rem)]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/delivery/${s.slug}`} className="block rounded-sm border border-rule p-5 hover:border-ink">
                <span className="block text-lg font-semibold text-ink">{s.name}</span>
                <span className="u-meta mt-1 block text-mute">{s.serviceArea}</span>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <dt className="text-mute">Arrives</dt>
                    <dd className="text-ink">{s.etaMin && s.etaMax ? `${s.etaMin}–${s.etaMax} min` : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-mute">Fee</dt>
                    <dd className="text-ink">{money(s.fee)}</dd>
                  </div>
                  <div>
                    <dt className="text-mute">Minimum</dt>
                    <dd className="text-ink">{money(s.minOrder)}</dd>
                  </div>
                </dl>
                {s.freeOver != null && (
                  <p className="u-meta mt-3 text-mute">Free delivery over {money(s.freeOver)}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="u-shell pb-[clamp(3rem,6vw,4rem)] max-w-[62ch]">
        <p className="u-prose text-shade">
          You must be 21+, or 18+ with a valid medical recommendation, to order. Someone 21+ must be present to receive the delivery.
        </p>
        <p className="mt-4">
          <Link href="/products" className="underline underline-offset-4 text-ink">Browse all products</Link>
          {" · "}
          <Link href="/deliveries" className="underline underline-offset-4 text-ink">All delivery services</Link>
        </p>
      </section>
    </>
  );
}
