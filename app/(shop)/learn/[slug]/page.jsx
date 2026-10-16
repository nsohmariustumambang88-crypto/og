import Link from "next/link";
import { notFound } from "next/navigation";
import learn from "@/data/learn.json";
import { Breadcrumb } from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { canonical, absolute, breadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { getProductsByCategory } from "@/db/queries";

const find = (slug) => learn.reads.find((r) => r.slug === slug);

const SHOP_CATEGORY = {
  "thc-percentage-is-a-bad-way-to-pick-flower": "flower",
  "how-to-read-a-certificate-of-analysis": "flower",
  "edibles-start-at-2-5mg-and-wait": "edibles",
  "what-actually-happens-after-you-hit-order": "flower",
  "cannabis-drug-interactions-what-you-must-know": "wellness",
  "thc-cbd-ratios-explained-best-doses-for-beginners": "wellness",
  "indica-vs-sativa-vs-hybrid-effects-when-to-choose-each": "flower",
  "cannabis-terpenes-guide-effects-limonene-myrcene-pinene": "flower",
  "best-indica-strains-for-sleep": "flower",
  "cannabis-for-beginners-first-purchase": "edibles",
  "live-resin-vs-distillate-complete-comparison": "concentrates",
  "best-cannabis-deals-this-week": "edibles",
  "cannabis-deals-near-me": "flower",
  "concentrate-deals-guide": "concentrates",
  "edibles-deals-guide": "edibles",
  "complete-cannabis-deals-guide": "flower",
};

export function generateStaticParams() {
  return learn.reads.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const read = find(slug);
  if (!read) return {};
  return {
    title: `${read.title} — weedmap.store`,
    description: read.deck,
    alternates: canonical(`/learn/${slug}`),
    openGraph: {
      title: read.title,
      description: read.deck,
      url: absolute(`/learn/${slug}`),
      type: "article",
    },
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const read = find(slug);
  if (!read) notFound();

  const trail = [
    { label: "Home", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: read.title },
  ];

  const others = learn.reads.filter((r) => r.slug !== slug);
  const shopCategory = SHOP_CATEGORY[slug] ?? "flower";
  const shopProducts = await getProductsByCategory(shopCategory, 6);

  /* Article schema without a datePublished or an author: this is explainer copy
     written for the site, not a bylined piece with a publication date, and
     inventing either would be inventing a fact. */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: read.title,
    description: read.deck,
    url: absolute(`/learn/${slug}`),
    publisher: { "@type": "Organization", name: SITE_NAME },
    articleSection: "Learn",
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema(trail)]} />

      <header className="u-shell pt-[clamp(1.5rem,3vw,2.5rem)]">
        <Breadcrumb trail={trail} />
        <h1 className="u-display mt-6 max-w-[19ch] text-[clamp(2rem,5.2vw,3.6rem)]">
          {read.title}
        </h1>
        <p className="u-prose mt-5 max-w-[52ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-shade">
          {read.deck}
        </p>
        <p className="u-meta mt-6 border-t border-rule pt-4 text-mute">{read.mins} min read</p>
      </header>

      <article className="u-shell py-[clamp(2.5rem,5vw,4rem)]">
        <div className="max-w-[62ch]">
          {read.sections.map((section, i) => (
            <Reveal key={section.h} index={Math.min(i, 3)} className="mt-10 first:mt-0">
              <h2 className="u-heading text-[clamp(1.25rem,2.2vw,1.6rem)]">{section.h}</h2>
              {section.p.map((para, j) => (
                <p
                  key={j}
                  className="u-prose mt-4 text-[1rem] leading-[1.7] text-shade"
                >
                  {para}
                </p>
              ))}
            </Reveal>
          ))}
        </div>

        {shopProducts.length > 0 && (
          <section className="mt-14 max-w-[62ch]">
            <h2 className="u-heading text-[clamp(1.25rem,2.2vw,1.6rem)]">Shop these</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {shopProducts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} className="block rounded-sm border border-rule px-4 py-3 hover:border-ink">
                    <span className="block text-[0.95rem] font-semibold text-ink">{p.name}</span>
                    <span className="u-meta block text-mute">{p.brand} · {p.weight}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/products/${shopCategory}`} className="u-meta mt-4 inline-block text-ink underline underline-offset-4">
              See all {shopCategory.replace("-", " ")} →
            </Link>
          </section>
        )}

        <aside className="mt-14 flex items-start gap-3 border-t border-rule pt-6 max-w-[62ch]">
          <Icon name="shield" size={22} className="mt-0.5 shrink-0 text-green-text" />
          <p className="u-prose text-[0.9rem] leading-relaxed text-shade">
            General information, not medical advice. Cannabis affects people differently, and it
            interacts with some medications — talk to a clinician about your own situation. You
            must be 21+, or 18+ with a valid medical recommendation.
          </p>
        </aside>
      </article>

      <section className="u-tooth border-t border-rule bg-linen-deep">
        <div className="u-shell py-[clamp(2.5rem,5vw,3.5rem)]">
          <h2 className="u-heading text-[clamp(1.4rem,2.6vw,2rem)]">Keep reading</h2>
          <ul className="mt-6 grid gap-x-16 sm:grid-cols-3">
            {others.map((other, i) => (
              <Reveal as="li" key={other.slug} index={i} className="border-t border-rule">
                <Link href={`/learn/${other.slug}`} className="group block py-5">
                  <span className="block text-[1rem] font-bold leading-snug tracking-[-0.025em] text-ink decoration-orange/60 underline-offset-4 group-hover:underline">
                    {other.title}
                  </span>
                  <span className="u-meta mt-2 block text-mute">{other.mins} min read</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
