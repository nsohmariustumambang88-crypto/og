import LandingPage from '@/components/LandingPage';
import { canonical } from '@/lib/seo';

export const revalidate = 3600;
export const metadata = {
  title: 'Pink Runtz Strain: Effects, THC%, Terpenes & How to Use',
  description: 'Pink Runtz is a sweet, fruity indica hybrid perfect for relaxation and sleep. Learn effects, terpene profile, dosing, and where to buy.',
  alternates: canonical('/pink-runtz'),
};

export default async function PinkRuntzPage() {
  const products = [];

  const title = 'Pink Runtz Strain';
  const subtitle = 'Sweet, fruity indica hybrid for evening relaxation and sleep';

  const introduction = [
    'Pink Runtz is an indica-dominant hybrid known for balanced, mellow effects. The strain delivers a wave of euphoria followed by deep body relaxation—perfect for evening use or unwinding after work.',
    'With a myrcene-dominant terpene profile and moderate THC (19-23%), Pink Runtz offers reliable relaxation without extreme sedation, making it ideal for both new and experienced users.',
  ];

  const sections = [
    {
      icon: '🌸',
      heading: 'What to Expect',
      content: [
        'Pink Runtz produces a balanced high that starts with euphoria and transitions into body relaxation. Users typically report mood elevation, decreased stress, and physical calm.',
        'The strain is best for evening use, preparation for sleep, or any time you want to unwind without being completely sedated.',
        '→ Learn about indica vs. sativa effects',
      ],
    },
    {
      icon: '⚗️',
      heading: 'Cannabinoid Profile',
      content: [
        'THC: 21% (average) | CBD: <1% | THC:CBD Ratio: 21:1 (psychoactive)',
        'This ratio makes Pink Runtz effective for relaxation and mood elevation without the CBD moderation of balanced strains.',
        '→ Understanding Cannabinoids: THCA, CBDA, CBN',
      ],
    },
    {
      icon: '🌿',
      heading: 'Terpene Breakdown',
      content: [
        'Myrcene (0.8%) - The sedating terpene; herbal aroma; most abundant in cannabis',
        'Caryophyllene (0.6%) - Peppery notes; pain-relieving properties',
        'Limonene (0.3%) - Citrus aroma; mood-elevating effects',
        'This combination creates Pink Runtz\'s signature sweet, fruity flavor and strong sedative profile.',
        '→ Complete Terpenes Guide',
      ],
    },
    {
      icon: '💊',
      heading: 'Dosing Recommendations',
      content: [
        'First-time users: 5-10mg THC (edibles) or small bowl/joint (flower)',
        'Regular users: 10-15mg THC (edibles) or standard amount (flower)',
        'Experienced users: 15mg+ THC',
        'Best time: Evening, 1-2 hours before bed for sleep onset. Onset: 5-15 min (flower), 45-90 min (edibles)',
        '→ Cannabis for Beginners | Complete Dosing Guide',
      ],
    },
    {
      icon: '😴',
      heading: 'Pink Runtz for Sleep',
      content: [
        'Pink Runtz is one of the most popular sleep strains due to high myrcene content and moderate THC. Most users report falling asleep within 30-60 minutes of use.',
        'The effects last 2-4 hours (flower) or 6-8 hours (edibles), making it suitable for all-night sleep support.',
        '→ Best Indica Strains for Sleep',
      ],
    },
    {
      icon: '⭐',
      heading: 'Why Users Love It',
      content: [
        'Sweet, fruity flavor that\'s enjoyable to consume',
        'Reliable, predictable effects across batches',
        'Great for both newcomers and regular users',
        'Excellent value (typically $12-18/gram)',
        'Average user rating: 4.7/5 stars (247+ reviews)',
      ],
    },
    {
      icon: '🔬',
      heading: 'Lab Testing & Safety',
      content: [
        'Always check the certificate of analysis. Pink Runtz should test high in myrcene (0.5%+).',
        'Verify: Pesticides (should show "pass"), Heavy metals (should be below limits), Microbials (should be negative)',
        '→ How to Read a Certificate of Analysis',
      ],
    },
    {
      icon: '🔄',
      heading: 'Similar Strains',
      content: [
        'Apple Fritter (myrcene-dominant, fruity)',
        'Ice Cream Cake (heavier sedation, for experienced users)',
        'Zkittlez (lighter effects, fruity flavor, beginner-friendly)',
        'Wedding Cake (balanced sedation, consistent quality)',
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
