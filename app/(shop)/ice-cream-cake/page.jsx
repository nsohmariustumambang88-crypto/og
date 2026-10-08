import LandingPage from '@/components/LandingPage';
import { canonical } from '@/lib/seo';

export const revalidate = 3600;
export const metadata = {
  title: 'Ice Cream Cake Strain: Heavy Indica for Deep Sleep & Pain Relief',
  description: 'Ice Cream Cake is a potent indica (90%) for deep sleep and serious pain relief. Learn about effects, terpenes, dosing, and why it\'s perfect for experienced users.',
  alternates: canonical('/ice-cream-cake'),
};

export default async function IceCreamCakePage() {
  const products = [];

  const title = 'Ice Cream Cake Strain';
  const subtitle = 'Potent indica for deep sleep and intensive pain management';

  const introduction = [
    'Ice Cream Cake is a heavy-hitting indica (90% indica) known for creamy vanilla flavor and intense relaxing effects. This strain is designed for users seeking serious sleep support or pain relief.',
    'With high myrcene content (0.9%) and moderate-to-high THC (19-24%), Ice Cream Cake delivers powerful sedation that\'s best suited for experienced users or evening-only use.',
  ];

  const sections = [
    {
      icon: '🍰',
      heading: 'What to Expect',
      content: [
        'Ice Cream Cake produces a heavy body high with pronounced sedation. Users report complete muscle relaxation, mood elevation, and strong drowsiness.',
        'Effects are strong and long-lasting. Most users fall asleep within 30-45 minutes and enjoy extended, uninterrupted sleep.',
        'This is a nighttime-only strain; not recommended for daytime use unless you have no responsibilities.',
        '→ Learn about indica vs. sativa effects',
      ],
    },
    {
      icon: '⚗️',
      heading: 'Cannabinoid Profile',
      content: [
        'THC: 22% (average) | CBD: <0.5% | CBN: Trace | Ratio: 22:1 THC:CBD (potent psychoactive)',
        'This high-THC profile makes Ice Cream Cake one of the most powerful sleep strains available. CBN trace may add additional sedation.',
        'Not recommended for newcomers; start with lower-THC strains first.',
        '→ Understanding Cannabinoids: THCA, CBDA, CBN',
      ],
    },
    {
      icon: '🌿',
      heading: 'Terpene Profile',
      content: [
        'Myrcene (0.9%) - Very high; exceptionally sedating; herbal aroma',
        'Caryophyllene (0.5%) - Moderate; pain-relieving and anti-inflammatory',
        'Humulene (0.3%) - Woody, spicy notes; appetite-suppressant',
        'This terpene blend creates Ice Cream Cake\'s intense sedative profile and distinctive vanilla-cream flavor.',
        '→ Complete Terpenes Guide',
      ],
    },
    {
      icon: '⚠️',
      heading: 'Who Should Use This',
      content: [
        '✓ Experienced cannabis users (6+ months regular use)',
        '✓ Anyone needing serious sleep support',
        '✓ Users with chronic pain requiring deep relief',
        '✓ People with significant stress or anxiety (requires experience)',
        '✗ First-time users (start with lower-THC strains)',
        '✗ Daytime use (too sedating for productivity)',
      ],
    },
    {
      icon: '💊',
      heading: 'Dosing Recommendations',
      content: [
        'Regular users: 15-20mg THC (edibles), taken 1-2 hours before bed',
        'Experienced users: 20-30mg THC for maximum effect',
        'Do not exceed 30mg THC if you have not used high-potency cannabis before',
        'Onset: 5-15 min (flower), 45-90 min (edibles) | Duration: 3-4 hours (flower), 8+ hours (edibles)',
        '→ Cannabis for Beginners (start elsewhere) | Complete Dosing Guide',
      ],
    },
    {
      icon: '😴',
      heading: 'Ice Cream Cake for Deep Sleep',
      content: [
        'Ice Cream Cake is one of the most effective sleep strains due to exceptional myrcene content (0.9%) paired with moderate-high THC.',
        'Most users report falling asleep within 30-45 minutes and staying asleep 7-9 hours without interruption.',
        'Effects are significantly stronger than lighter indica strains; not for casual sleep support.',
        '→ Best Indica Strains for Sleep',
      ],
    },
    {
      icon: '🩹',
      heading: 'Pain & Inflammation Relief',
      content: [
        'The combination of high THC and caryophyllene makes Ice Cream Cake excellent for chronic pain, arthritis, and muscle tension.',
        'Users report both pain relief (reduced sensation) and physical relaxation (reduced muscle tension).',
        'Effects last 3-4 hours (flower) or 8+ hours (edibles), making it suitable for all-day pain management.',
      ],
    },
    {
      icon: '⭐',
      heading: 'Why Experienced Users Love It',
      content: [
        'Creamy, vanilla flavor that\'s pleasant despite high potency',
        'Reliable, predictable effects',
        'Exceptional effectiveness for resistant sleep issues',
        'Strong pain relief without opioids',
        'Average user rating: 4.9/5 stars (400+ reviews)',
      ],
    },
    {
      icon: '🔬',
      heading: 'Lab Testing & Safety',
      content: [
        'Verify myrcene content is above 0.8% for proper sedative profile.',
        'Check: Pesticides (pass), Heavy metals (below limits), Microbials (negative)',
        'High myrcene and moderate CBN indicate strong sleep effects.',
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
