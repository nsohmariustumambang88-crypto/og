import Link from "next/link";
import { getShops } from "@/db/queries";
import { DELIVERY_CITIES } from "@/lib/delivery-areas";
import { canonical } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import ShopList from "@/components/ShopList";

export const revalidate = 3600;

export const metadata = {
  alternates: canonical("/deliveries"),
  title: "Cannabis delivery services near you — weedmap.store",
  description: "Every licensed delivery service that reaches your address, with live arrival windows, fees and minimums.",
};

export default async function DeliveriesPage() {
  const shops = await getShops() ?? [];
  const live = shops?.filter((s) => s?.live)?.length ?? 0;

  return (
    <>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Delivery" }]}
        title="Who is driving right now"
        blurb="Every licensed service that reaches your address. Arrival window, delivery fee and order minimum are on every row before you commit — there is no pickup option to weigh them against."
        meta={`${live} of ${shops?.length ?? 0} delivering now`}
      />
      <ShopList shops={shops} />
      <section className="u-shell pb-[clamp(3rem,6vw,4rem)]">
        <h2 className="u-heading text-[clamp(1.25rem,2.2vw,1.6rem)]">Delivery by city</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {DELIVERY_CITIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/delivery-areas/${c.slug}`} className="u-pill inline-block border border-ink px-4 py-2 text-sm text-ink hover:bg-ink hover:text-linen">
                Cannabis delivery in {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
