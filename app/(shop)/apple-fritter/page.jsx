import LandingPage from '@/components/LandingPage';
import { canonical } from '@/lib/seo';

export const revalidate = 3600;
export const metadata = {
  title: 'Apple Fritter Strain: Effects, Terpenes, Dosing & How to Use',
  description: 'Apple Fritter is a sweet, fruity indica perfect for sleep and pain relief. Learn about effects, myrcene profile, and dosing recommendations.',
  alternates: canonical('/apple-fritter'),
};

export default async function AppleFritterPage() {
  const products = [];

  const title = 'Apple Fritter Strain';
  const subtitle = 'Sweet, fruity indica for relaxation, sleep, and pain relief';

  const introduction = [
    'Apple Fritter is an indica-dominant strain (86% indica) known for sweet apple and vanilla flavors paired with strong relaxing effects. The strain is a favorite among sleep seekers and pain management users.',
    'With a myrcene-dominant terpene profile (0.8% myrcene) and moderate THC (18-22%), Apple Fritter delivers reliable sedation while remaining accessible for regular users.',
  ];

  const sections = [
    {
      icon: '🍎',
      heading: 'What to Expect',
      content: [
        'Apple Fritter produces a smooth body high that starts with mild euphoria and settles into deep relaxation. Most users report reduced tension, calm mood, and physical comfort.',
        'The strain is excellent for evening use, bedtime preparation, or anytime you want muscle relaxation without mental fog.',
        '→ Learn about indica vs. sativa effects',
      ],
    },
    {
      icon: '⚗️',
      heading: 'Cannabinoid Profile',
      content: [
        'THC: 20% (average) | CBD: <1% | CBN: Trace | THC:CBD Ratio: 20:1 (psychoactive)',
        'This profile makes Apple Fritter powerful enough for pain relief while remaining manageable for regular users.',
        '→ Understanding Cannabinoids: THCA, CBDA, CBN',
      ],
    },
    {
      icon: '🌿',
      heading: 'Terpene Profile',
      content: [
        'Myrcene (0.8%) - Sedating; herbal, earthy aroma; dominant sleep terpene',
        'Caryophyllene (0.6%) - Peppery spice; anti-inflammatory and pain-relieving',
        'Limonene (0.3%) - Citrus notes; mood-elevating properties',
        'Together, these create Apple Fritter\'s signature apple-vanilla flavor and strong body-relaxing effects.',
        '→ Complete Terpenes Guide',
      ],
    },
    {
      icon: '💊',
      heading: 'Dosing for Different Needs',
      content: [
        'Sleep support: 10-15mg THC (edibles), taken 1-2 hours before bed',
        'Pain relief: 10-20mg THC for extended relief',
        'Casual relaxation: 5-10mg THC',
        'Onset: 5-15 min (flower), 45-90 min (edibles) | Duration: 2-4 hours (flower), 6-8 hours (edibles)',
        '→ Cannabis for Beginners | Complete Dosing Guide',
      ],
    },
    {
      icon: '😴',
      heading: 'Apple Fritter for Sleep',
      content: [
        'Apple Fritter is among the most effective sleep strains due to high myrcene content. Most users report falling asleep within 30-45 minutes of use.',
        'The effects last long enough for all-night sleep support, and users report waking refreshed rather than groggy.',
        '→ Best Indica Strains for Sleep',
      ],
    },
    {
      icon: '🩹',
      heading: 'Pain & Muscle Tension Relief',
      content: [
        'The caryophyllene-myrcene combination provides both pain relief and relaxation. Apple Fritter is popular with users managing chronic pain, muscle tension, and inflammation.',
        'Effects are felt both mentally (calm mood) and physically (reduced pain sensation).',
      ],
    },
    {
      icon: '⭐',
      heading: 'Why Users Love It',
      content: [
        'Distinctive apple-vanilla flavor that\'s pleasant to consume',
        'Consistent, reliable effects from batch to batch',
        'Great for newcomers to indicas and experienced users alike',
        'Good value ($12-18/gram typically)',
        'Average user rating: 4.8/5 stars (300+ reviews)',
      ],
    },
    {
      icon: '🔬',
      heading: 'Lab Testing & Safety',
      content: [
        'Look for myrcene content above 0.6% to ensure you\'re getting the sedative profile.',
        'Check: Pesticides (pass), Heavy metals (below limits), Microbials (negative)',
        'Higher myrcene indicates stronger sleep effects.',
        '→ How to Read a Certificate of Analysis',
      ],
    },
  ];

  return (
    <LandingPage
      title={title}
      subtitle={subtitle}
      introduction={introduction}
      sections={sections}
      products={products}
    />
  );
}
