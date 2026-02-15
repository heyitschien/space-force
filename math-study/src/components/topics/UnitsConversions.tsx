import { Math } from '../Math';
import { UnitConverter } from '../UnitConverter';

interface UnitsConversionsProps {
  visible: boolean;
}

const CONVERSION_CARDS = [
  {
    title: 'Length (US Customary)',
    items: ['12 in = 1 ft', '3 ft = 1 yd', '1760 yd = 1 mi', '5280 ft = 1 mi'],
    tip: 'Tip: If the word problem mixes ft/in, convert first before computing area/perimeter.',
  },
  {
    title: 'Length (Metric)',
    items: ['10 mm = 1 cm', '100 cm = 1 m', '1000 m = 1 km'],
    tip: 'Metric prefixes: kilo (1000), centi (1/100), milli (1/1000).',
  },
  {
    title: 'Mass / Weight',
    items: ['16 oz = 1 lb', '2000 lb = 1 ton', '1000 g = 1 kg'],
    tip: 'ASVAB usually uses these simple relationships—memorize them.',
  },
  {
    title: 'Capacity (US)',
    items: ['3 tsp = 1 tbsp', '2 tbsp = 1 fl oz', '8 fl oz = 1 cup', '2 cups = 1 pt', '2 pt = 1 qt', '4 qt = 1 gal'],
    tip: null,
  },
  {
    title: 'Capacity (Metric)',
    items: ['1000 mL = 1 L'],
    tip: 'If a problem mixes L and mL, convert to one before computing.',
  },
  {
    title: 'Time',
    items: ['60 sec = 1 min', '60 min = 1 hr', '24 hr = 1 day'],
    tip: 'Used constantly with d = rt word problems.',
  },
];

export function UnitsConversions({ visible }: UnitsConversionsProps) {
  if (!visible) return null;

  return (
    <section id="units-conversions" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-sky-800 border-b-2 border-sky-200 pb-2 mb-6">Units & Conversions (ASVAB Quick Reference)</h2>

      <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-sky-900 mb-2">How to convert (fast + reliable)</h3>
        <ul className="list-disc ml-5 text-sm space-y-1 text-sky-900">
          <li><span className="font-semibold">Step 1:</span> Write the value with units (e.g., <Math>{'3 \\text{ ft}'}</Math>).</li>
          <li><span className="font-semibold">Step 2:</span> Multiply by a conversion fraction that cancels units (e.g., <Math>{'\\frac{12\\text{ in}}{1\\text{ ft}}'}</Math>).</li>
          <li>
            <span className="font-semibold">Step 3:</span> If converting <span className="font-semibold">area</span> or <span className="font-semibold">volume</span>, square/cube the factor:
            <span className="font-mono"> 1 ft = 12 in</span> → <span className="font-mono"><Math>{'1 \\text{ ft}^2 = 144 \\text{ in}^2'}</Math></span>, <span className="font-mono"><Math>{'1 \\text{ ft}^3 = 1728 \\text{ in}^3'}</Math></span>.
          </li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {CONVERSION_CARDS.map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-xl shadow-sm formula-card border-l-4 border-sky-500">
            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              {card.items.map((item) => {
                const [left, right] = item.split(' = ');
                const leftParts = left.split(/\s+/);
                const rightParts = right.split(/\s+/);
                return (
                  <li key={item}>
                    <span className="font-semibold">{leftParts[0]}</span> {leftParts.slice(1).join(' ')} = <span className="font-semibold">{rightParts[0]}</span> {rightParts.slice(1).join(' ')}
                  </li>
                );
              })}
            </ul>
            {card.tip && <p className="text-xs text-gray-500 mt-3">{card.tip}</p>}
          </div>
        ))}
      </div>

      <UnitConverter />
    </section>
  );
}
