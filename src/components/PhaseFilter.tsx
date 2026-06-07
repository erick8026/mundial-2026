'use client';

import type { Phase } from '@/types/match';

export type FilterValue = Phase | 'all';

const TABS: { value: FilterValue; label: string; color: string; active: string }[] = [
  { value: 'all',           label: 'Todos',        color: 'border-gray-300 text-gray-600 hover:border-gray-400', active: 'bg-gray-800 text-white border-gray-800' },
  { value: 'group',         label: 'Grupos',       color: 'border-slate-300 text-slate-600 hover:border-slate-400', active: 'bg-slate-600 text-white border-slate-600' },
  { value: 'round-of-32',   label: 'Ronda 32',     color: 'border-violet-300 text-violet-600 hover:border-violet-400', active: 'bg-violet-600 text-white border-violet-600' },
  { value: 'round-of-16',   label: 'Octavos',      color: 'border-blue-300 text-blue-600 hover:border-blue-400', active: 'bg-blue-600 text-white border-blue-600' },
  { value: 'quarter-final', label: 'Cuartos',      color: 'border-orange-300 text-orange-600 hover:border-orange-400', active: 'bg-orange-500 text-white border-orange-500' },
  { value: 'semi-final',    label: 'Semis',        color: 'border-rose-300 text-rose-600 hover:border-rose-400', active: 'bg-rose-600 text-white border-rose-600' },
  { value: 'third-place',   label: '3er Lugar',    color: 'border-teal-300 text-teal-600 hover:border-teal-400', active: 'bg-teal-600 text-white border-teal-600' },
  { value: 'final',         label: '⭐ Final',      color: 'border-yellow-400 text-yellow-700 hover:border-yellow-500', active: 'bg-yellow-500 text-white border-yellow-500' },
];

export default function PhaseFilter({
  selected,
  onChange,
}: {
  selected: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`
            text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all
            ${selected === tab.value ? tab.active : tab.color + ' bg-white'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
