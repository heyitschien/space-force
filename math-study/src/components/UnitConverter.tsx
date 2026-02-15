import { useState, useEffect } from 'react';

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}
interface CategoryData {
  label: string;
  base: string;
  units: Record<string, UnitDef>;
}
const UC_DATA: Record<string, CategoryData> = {
  length: {
    label: 'Length',
    base: 'm',
    units: {
      in: { label: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      ft: { label: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      yd: { label: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      mi: { label: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      mm: { label: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      cm: { label: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      m: { label: 'm', toBase: (v) => v, fromBase: (v) => v },
      km: { label: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
  },
  mass: {
    label: 'Mass / Weight',
    base: 'kg',
    units: {
      oz: { label: 'oz', toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
      lb: { label: 'lb', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      g: { label: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      kg: { label: 'kg', toBase: (v) => v, fromBase: (v) => v },
    },
  },
  volume: {
    label: 'Capacity',
    base: 'L',
    units: {
      tsp: { label: 'tsp', toBase: (v) => v * 0.00492892159375, fromBase: (v) => v / 0.00492892159375 },
      tbsp: { label: 'tbsp', toBase: (v) => v * 0.01478676478125, fromBase: (v) => v / 0.01478676478125 },
      floz: { label: 'fl oz', toBase: (v) => v * 0.0295735295625, fromBase: (v) => v / 0.0295735295625 },
      cup: { label: 'cup', toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
      pt: { label: 'pt', toBase: (v) => v * 0.473176473, fromBase: (v) => v / 0.473176473 },
      qt: { label: 'qt', toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
      gal: { label: 'gal', toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      mL: { label: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      L: { label: 'L', toBase: (v) => v, fromBase: (v) => v },
    },
  },
  time: {
    label: 'Time',
    base: 'sec',
    units: {
      sec: { label: 'sec', toBase: (v) => v, fromBase: (v) => v },
      min: { label: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      hr: { label: 'hr', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      day: { label: 'day', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    },
  },
  temperature: {
    label: 'Temperature',
    base: 'C',
    units: {
      C: { label: '°C', toBase: (v) => v, fromBase: (v) => v },
      F: { label: '°F', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => (v * (9 / 5)) + 32 },
    },
  },
  speed: {
    label: 'Speed',
    base: 'mps',
    units: {
      mph: { label: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      fps: { label: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      mps: { label: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      kmh: { label: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    },
  },
};

function formatNumber(v: number): string {
  if (!Number.isFinite(v)) return '—';
  const s = v.toFixed(6);
  return s.replace(/\.?0+$/, '');
}

export function UnitConverter() {
  const [category, setCategory] = useState<string>('length');
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('ft');
  const [toUnit, setToUnit] = useState<string>('in');
  const [result, setResult] = useState<string>('—');
  const [error, setError] = useState<string>('');

  const units = UC_DATA[category]?.units ?? {};
  const unitKeys = Object.keys(units);

  useEffect(() => {
    if (unitKeys.length > 0) {
      setFromUnit((prev) => (UC_DATA[category]?.units?.[prev] ? prev : unitKeys[0]));
      setToUnit((prev) => (UC_DATA[category]?.units?.[prev] ? prev : unitKeys[1] ?? unitKeys[0]));
    }
  }, [category]);

  useEffect(() => {
    setError('');
    const numValue = Number(value);
    if (!Number.isFinite(numValue)) {
      setResult('—');
      if (value !== '' && value !== '-') setError('Enter a valid number.');
      return;
    }
    const from = units[fromUnit];
    const to = units[toUnit];
    if (!from || !to) {
      setResult('—');
      return;
    }
    const baseValue = from.toBase(numValue);
    const outValue = to.fromBase(baseValue);
    setResult(`${formatNumber(outValue)} ${to.label}`);
  }, [category, value, fromUnit, toUnit, units]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-100">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 justify-between">
        <div>
          <h3 className="font-bold text-lg">Quick Unit Converter</h3>
          <p className="text-sm text-gray-600">A small calculator so conversions are "working," not just memorized.</p>
        </div>
        {error && (
          <p className="text-sm font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        <div className="lg:col-span-1">
          <label htmlFor="uc-category" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Category
          </label>
          <select
            id="uc-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="length">Length</option>
            <option value="mass">Mass / Weight</option>
            <option value="volume">Capacity</option>
            <option value="time">Time</option>
            <option value="temperature">Temperature</option>
            <option value="speed">Speed</option>
          </select>
        </div>

        <div className="lg:col-span-1">
          <label htmlFor="uc-value" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Value
          </label>
          <input
            id="uc-value"
            type="number"
            inputMode="decimal"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="lg:col-span-1">
          <label htmlFor="uc-from" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            From
          </label>
          <select
            id="uc-from"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {units[key].label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1">
          <label htmlFor="uc-to" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            To
          </label>
          <select
            id="uc-to"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {units[key].label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Result</label>
          <div className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50">
            <span className="font-mono text-sm">{result}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Notes: Speed here is common ASVAB word-problem usage (mph, ft/s, m/s, km/h). Temperature uses the exact F ↔ C formulas.
      </div>
    </div>
  );
}
