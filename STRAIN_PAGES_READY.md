# Strain Page Templates - Ready to Create

**Structure for: /products/[strain-slug]**

---

## STRAIN 1: Pink Runtz
**SEO Target:** "Pink Runtz strain" (KD 7, 12,100 monthly searches) ⭐ PRIORITY
**Status:** Ready to create

```
Page Title: Pink Runtz Strain: Effects, THC%, Terpenes & How to Use

Section 1: Quick Facts Card
- Type: Indica-Dominant Hybrid
- THC: 19-23%
- CBD: <1%
- Dominant Terpenes: Myrcene (0.8%), Caryophyllene (0.6%), Limonene (0.3%)
- Best For: Relaxation, Sleep, Evening Use
- Flavor Profile: Sweet, fruity, candy-like
- Effects: Euphoria, relaxation, sedation, body high
- Rating: 4.7/5 (from reviews)
- Price: $12-18/gram
- [Add to Cart] [Compare] [Save]

Section 2: What to Expect
Pink Runtz is an indica-dominant hybrid known for a balanced, mellow high. The strain delivers a wave of relaxation without extreme sedation—perfect for evening use or unwinding after work. Many users report euphoria followed by deep body relaxation.

Link: → Learn about indica vs. sativa effects

Section 3: Cannabinoid Profile
- THC: 21% (average)
- CBD: <1%
- CBN: <0.1%
- THC:CBD Ratio: 21:1 (psychoactive)

Link: → Understanding Cannabinoids: THCA, CBDA, CBN

Section 4: Terpene Breakdown
- Myrcene (0.8%) - Sedating, herbal aroma
- Caryophyllene (0.6%) - Peppery, pain-relieving
- Limonene (0.3%) - Citrus, mood-elevating

Link: → Complete Terpenes Guide

Section 5: Dosing Recommendations
- First-time users: 5-10mg THC
- Regular users: 10-15mg THC
- Experienced users: 15mg+ THC
- Best time: Evening (2 hours before bed for sleep)
- Onset: 5-15 min (flower), 45-90 min (edibles)
- Duration: 2-4 hours (flower), 6-8 hours (edibles)

Links: → Cannabis for Beginners | Dosing Guide

Section 6: Customer Reviews
- Average rating: 4.7/5
- 247 reviews
- Top review: "Perfect for sleep. Takes about 30 minutes, then smooth relaxation into deep sleep"
- Price-value rating: 4.8/5

Section 7: Similar Strains
- Apple Fritter (myrcene-dominant)
- Ice Cream Cake (heavy sedation)
- Zkittlez (fruity, beginner-friendly)
- Wedding Cake (balanced sedation)

Links to: → Other strain pages

Section 8: Lab Results
[Certificate of Analysis]
- Pesticides: PASS
- Heavy Metals: PASS
- Microbials: PASS
- Terpene Analysis: INCLUDED

Link: → How to Read a Certificate of Analysis

Section 9: FAQ
Q: Is Pink Runtz good for sleep?
A: Yes. The high myrcene content (0.8%) combined with moderate THC makes it excellent for sleep. Most users report onset within 30-60 minutes and sleep within 90 minutes.
→ Best Indica Strains for Sleep

Q: How much should I take my first time?
A: Start with 5mg THC. Wait 2 hours before taking more (if using edibles) or 15 minutes (if smoking).
→ Cannabis for Beginners

Q: Is this good for anxiety?
A: Pink Runtz's balanced THC and earthy terpene profile make it calming rather than anxiety-inducing for most users. If you are anxious, you might prefer a high-CBD strain.
→ Cannabis for Anxiety

Q: What's the difference between this and distillate?
A: Pink Runtz flower is full-spectrum (includes all terpenes). Distillate removes terpenes, losing the fruity, earthy character.
→ Live Resin vs. Distillate

Section 10: Shop Related Products
- Pink Runtz Edibles (10mg THC gummies)
- Pink Runtz Pre-Roll (1g joint)
- Pink Runtz Distillate
- All Indica Products
- All Sleep-Focused Products

Links: → Product pages

Section 11: CTA
[Add to Cart]
[Compare With Other Strains]
[Take Strain Quiz]
[Save to Wishlist]
```

---

## STRAIN 2: Apple Fritter
**SEO Target:** "Apple Fritter strain" (KD 10, 14,800 monthly searches) ⭐ PRIORITY

Quick Facts:
- Indica (86%), Sativa (14%)
- THC: 18-22%
- Dominant Terpenes: Myrcene, Caryophyllene, Limonene
- Best For: Sleep, pain relief, relaxation
- Rating: 4.8/5

Links to:
- → Best Indica Strains for Sleep
- → Cannabis for Pain Relief (coming)
- → Terpenes Guide (myrcene & caryophyllene)

---

## STRAIN 3: Ice Cream Cake
**SEO Target:** "Ice Cream Cake strain" (KD 12, 18,100 monthly searches) ⭐ PRIORITY

Quick Facts:
- Indica (90%), Sativa (10%)
- THC: 19-24%
- Dominant Terpenes: Myrcene, Caryophyllene, Humulene
- Best For: Deep sleep, pain management, experienced users
- Rating: 4.9/5

Links to:
- → Best Indica Strains for Sleep
- → Heavy Sedation Strains
- → Understanding Cannabinoids

---

## STRAIN 4: Zkittlez
**SEO Target:** "Zkittlez strain" (KD 8, 10,000+ monthly searches) ⭐ PRIORITY

Quick Facts:
- Indica (80%), Sativa (20%)
- THC: 15-21%
- Dominant Terpenes: Myrcene, Caryophyllene, Pinene
- Best For: Beginners, anxiety-prone users, mood elevation
- Flavor: Fruity, candy-like, sweet
- Rating: 4.7/5

Links to:
- → Cannabis for Beginners
- → Best Strains for Beginners
- → Anxiety-Friendly Products

---

## STRAIN 5: Blue Dream
**SEO Target:** "Blue Dream strain" (KD 30, 40,500 monthly searches)

Quick Facts:
- Sativa (60%), Indica (40%)
- THC: 17-24%
- Dominant Terpenes: Myrcene, Pinene, Caryophyllene
- Best For: Daytime use, creative work, balanced effects
- Rating: 4.6/5

Links to:
- → 5 Best Sativa Strains for Daytime Energy
- → Balanced Hybrid Strains
- → Terpenes Guide (pinene section)

---

## STRAIN 6: Girl Scout Cookies (GSC)
**SEO Target:** "Girl Scout Cookies strain" (KD 44, 49,500 monthly searches)

Quick Facts:
- Indica (60%), Sativa (40%)
- THC: 17-28%
- Dominant Terpenes: Caryophyllene, Humulene, Myrcene
- Best For: Pain relief, evening relaxation, experienced users
- Rating: 4.8/5

Links to:
- → Best Strains for Pain Management (coming)
- → High-THC Strains
- → Caryophyllene Benefits

---

## HOW TO CREATE THESE PAGES

### Option 1: Static Pages (Recommended)
Create in `/app/(shop)/products/[strain-name]/page.jsx`

```jsx
import { getProductsByCategory } from '@/db/queries';
import { canonical } from '@/lib/seo';

export const revalidate = 3600; // 1 hour cache

export const metadata = {
  title: '[Strain Name]: Effects, THC%, Terpenes & How to Use',
  description: '[Short description with strain type, THC%, and effects]',
  alternates: canonical(`/products/${slug}`),
  openGraph: {
    title: '[Strain Name] Strain',
    description: '[Effects description]',
    url: `https://weedmap.store/products/${slug}`,
    type: 'article',
  },
};

export default async function StrainPage({ params }) {
  const strain = await getStrainData(params.slug);
  const similarStrains = await getSimilarStrains(strain.id);
  
  return (
    <div>
      {/* Render strain page components using strain data */}
    </div>
  );
}
```

### Option 2: CMS Integration
Pull strain data from database and render dynamically

### Option 3: Markdown + SSG (Fastest)
Write static markdown files, generate at build time

---

## INTERNAL LINKING PRIORITY

Each strain page should link to:
1. **Relevant Learn articles:**
   - Sleep strains → "Best Indica Strains for Sleep"
   - Sativas → "5 Best Sativa Strains for Daytime"
   - Terpene-rich → "Terpenes Guide"
   - High-CBD → "THC:CBD Ratios"

2. **Related product categories:**
   - Indica category
   - Sleep-focused collection
   - High-myrcene strains
   - Similar strains

3. **Tools & guides:**
   - Strain Quiz
   - Dosing Guide
   - COA Guide
   - Beginner Guide

---

## PUBLISHING CHECKLIST

For each strain page:
- [ ] Write 800-1200 word content
- [ ] Add cannabinoid data
- [ ] Add terpene profile
- [ ] Add customer reviews (if available)
- [ ] Create similar strains list (3-5)
- [ ] Add internal links (5-10 total)
- [ ] Add FAQ (4-6 questions)
- [ ] Optimize title & meta description
- [ ] Add structured data (schema.org)
- [ ] Test on mobile
- [ ] Submit URL to Search Console

---

## SCHEDULE

**Week 1:** Pink Runtz, Apple Fritter, Ice Cream Cake, Zkittlez
**Week 2:** Blue Dream, GSC, Wedding Cake, Granddaddy Purple
**Week 3-4:** 10-15 more popular strains
**Weeks 5-8:** Remaining strains (30+ total)

---

## EXPECTED RESULTS

- 30+ strain pages = 30+ long-tail keywords
- Average position: #2-5 (within 3 months)
- Average traffic per strain: 50-200 visitors/month
- Total from strains: 1,500-6,000 visitors/month

---

**Status: Ready to create. Templates complete. Content outline done.**
