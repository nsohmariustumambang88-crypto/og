import LandingPage from '@/components/LandingPage';
import { canonical } from '@/lib/seo';

export const revalidate = 3600;
export const metadata = {
  title: 'Zkittlez Strain: Fruity Indica for Beginners & Evening Relaxation',
  description: 'Zkittlez is a beginner-friendly indica with fruity flavors and gentle relaxation. Perfect for first-time users seeking calm, predictable effects.',
  alternates: canonical('/zkittlez'),
};

export default async function ZkittlezPage() {
  const products = [];

  const title = 'Zkittlez Strain';
  const subtitle = 'Fruity, beginner-friendly indica for gentle relaxation and sleep';

  const introduction = [
    'Zkittlez is a mild-to-moderate indica known for bright fruity flavors (think Skittles candy) and gentle, predictable relaxing effects. The strain is perfect for newcomers to cannabis or anyone seeking reliable, non-overwhelming sedation.',
    'With moderate myrcene (0.8%) and accessible THC levels (15-21%), Zkittlez delivers smooth relaxation without the intensity of heavier indicas, making it ideal for regular use.',
  ];

  const sections = [
    {
      icon: '🍬',
      heading: 'What to Expect',
      content: [
        'Zkittlez produces a smooth, balanced high that starts with mild mood elevation and gently transitions into body relaxation. Effects are predictable and non-overwhelming.',
        'Most users report feeling calm, relaxed, and happy without heavy sedation or mental clouding. It\'s perfect for evening wind-down or casual relaxation.',
        'The strain is accessible enough for new users while enjoyable for experienced consumers.',
        '→ Learn about indica vs. sativa effects',
      ],
    },
    {
      icon: '⚗️',
      heading: 'Cannabinoid Profile',
      content: [
        'THC: 18% (average) | CBD: 0.5-1% | Ratio: 18:1 THC:CBD (mild psychoactive)',
        'The slight CBD content moderates THC\'s intensity, making Zkittlez more forgiving for anxiety-prone users or newcomers.',
        'This profile is perfect for learning cannabis effects without overwhelming intensity.',
        '→ Understanding Cannabinoids: THCA, CBDA, CBN',
      ],
    },
    {
      icon: '🌿',
      heading: 'Terpene Profile',
      content: [
        'Myrcene (0.8%) - Sedating; herbal notes; the main relaxation driver',
        'Caryophyllene (0.5%) - Spicy-peppery; mild anti-inflammatory',
        'Pinene (0.2%) - Pine aroma; slightly uplifting and focused',
        'Together, these create Zkittlez\'s signature fruity candy flavor and gently relaxing profile.',
        '→ Complete Terpenes Guide',
      ],
    },
    {
      icon: '✨',
      heading: 'Perfect for First-Time Users',
      content: [
        'Zkittlez is one of the best strains for newcomers because effects are mild, predictable, and forgiving.',
        'The flavor is pleasant and enjoyable (actual fruity taste, not harsh).',
        'THC levels are moderate enough that most people won\'t experience anxiety or paranoia.',
        'Start with 5mg THC (edibles) or small bowl (flower) to learn your tolerance in a safe way.',
        '→ Cannabis for Beginners: Complete Guide',
      ],
    },
    {
      icon: '💊',
      heading: 'Dosing for Different Needs',
      content: [
        'Newcomers: 5mg THC (edibles) or small bowl (flower); start low and increase gradually',
        'Casual relaxation: 5-10mg THC (edibles) or standard amount (flower)',
        'Sleep support: 10-15mg THC, taken 1-2 hours before bed',
        'Onset: 5-15 min (flower), 45-90 min (edibles) | Duration: 2-3 hours (flower), 5-7 hours (edibles)',
        '→ Cannabis for Beginners | Complete Dosing Guide',
      ],
    },
    {
      icon: '😴',
      heading: 'Zkittlez for Sleep',
      content: [
        'While not as heavy as Ice Cream Cake or Apple Fritter, Zkittlez is still effective for sleep support.',
        'Most users fall asleep within 45-60 minutes of use. Effects last long enough for through-the-night sleep.',
        'The gentle nature makes it good for people sensitive to heavy sedation.',
        '→ Best Indica Strains for Sleep',
      ],
    },
    {
      icon: '🧠',
      heading: 'Anxiety & Stress Relief',
      content: [
        'The balanced THC:CBD ratio and mild potency make Zkittlez good for anxiety-prone users.',
        'The strain provides calm and relaxation without the intensity that sometimes triggers anxiety in sensitive people.',
        'Users often report reduced racing thoughts and improved mood.',
        '→ Cannabis for Anxiety',
      ],
    },
    {
      icon: '⭐',
      heading: 'Why Users Love It',
      content: [
        'Authentic fruity, candy-like flavor (tastes like Skittles)',
        'Predictable, gentle effects that are never overwhelming',
        'Great value for quality and flavor ($12-16/gram typically)',
        'Perfect for both newcomers and experienced users',
        'Beginner-friendly without sacrificing enjoyment',
        'Average user rating: 4.6/5 stars (250+ reviews)',
      ],
    },
    {
      icon: '🔬',
      heading: 'Lab Testing & Safety',
      content: [
        'Look for myrcene content above 0.6% to ensure proper relaxing profile.',
        'Check: Pesticides (pass), Heavy metals (below limits), Microbials (negative)',
        'Slight CBD presence indicates gentle effects.',
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
