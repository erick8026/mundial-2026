'use client';

import { useState, useMemo } from 'react';
import { matches, phaseLabels, phaseOrder } from '@/data/matches';
import type { Phase } from '@/types/match';
import MatchCard from '@/components/MatchCard';
import PhaseFilter, { type FilterValue } from '@/components/PhaseFilter';
import SyncButton from '@/components/SyncButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import TelegramButton from '@/components/TelegramButton';

const BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : 'https://mundial.rodai.io';

const totalCompleted = matches.filter((m) => m.status === 'completed').length;
const totalUpcoming = matches.filter((m) => m.status !== 'completed' && m.status !== 'live').length;
const totalLive = matches.filter((m) => m.status === 'live').length;

export default function Home() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return matches;
    return matches.filter((m) => m.phase === filter);
  }, [filter]);

  // Group by phase then by group letter (within group phase)
  const sections = useMemo(() => {
    const map = new Map<string, { label: string; order: number; matches: typeof matches }>();

    for (const m of filtered) {
      const key = m.phase === 'group' ? `group-${m.group ?? 'X'}` : m.phase;
      if (!map.has(key)) {
        map.set(key, {
          label: m.phase === 'group'
            ? `Grupo ${m.group}`
            : phaseLabels[m.phase],
          order: m.phase === 'group'
            ? (m.group?.charCodeAt(0) ?? 0)
            : phaseOrder[m.phase] * 1000,
          matches: [],
        });
      }
      map.get(key)!.matches.push(m);
    }

    return [...map.values()].sort((a, b) => a.order - b.order);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HEADER ──────────────────────────────── */}
      <header className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center gap-5">
          {/* Title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">⚽</span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">MUNDIAL 2026</h1>
              <span className="text-4xl">🏆</span>
            </div>
            <p className="text-green-200 text-sm font-medium">
              🇺🇸 USA · 🇨🇦 Canadá · 🇲🇽 México &nbsp;·&nbsp; 11 Jun – 19 Jul 2026
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Stat value={matches.length} label="Partidos" color="bg-white/20" />
            {totalCompleted > 0 && <Stat value={totalCompleted} label="Jugados" color="bg-white/20" />}
            {totalLive > 0 && (
              <div className="flex flex-col items-center bg-red-500/80 text-white rounded-xl px-4 py-2 min-w-[70px]">
                <span className="text-xl font-black animate-pulse">{totalLive}</span>
                <span className="text-xs font-semibold uppercase tracking-wide">En Vivo</span>
              </div>
            )}
            <Stat value={totalUpcoming} label="Próximos" color="bg-white/20" />
          </div>

          {/* Alert CTA */}
          <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex flex-col gap-3">
            <div className="text-center">
              <p className="text-white font-bold text-sm leading-snug">⚡ Alertas en tiempo real con IA</p>
              <p className="text-green-200 text-xs mt-0.5">Todo el Mundial por <span className="font-bold text-white">$4.99</span> · WhatsApp o Telegram</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {['⚽ Gol al instante', '⏱ 30 min antes', '🏁 Resultado final', '🤖 Pregúntale algo'].map((t) => (
                <span key={t} className="text-xs font-semibold bg-white/15 text-white px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <a
              href="https://www.paypal.com/ncp/payment/JRQL4J79ECAWQ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => typeof gtag !== 'undefined' && gtag('event', 'paypal_click')}
              className="flex items-center justify-center gap-2 bg-[#FFC439] hover:bg-[#f0b429] text-[#003087] font-black px-4 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 text-sm w-full"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.99l-.219 1.337c-.06.38.227.741.607.741h3.957a.641.641 0 0 0 .633-.598l.026-.175.503-3.179.032-.174a.641.641 0 0 1 .633-.598h.398c2.587 0 4.61-.608 5.804-2.274.922-1.293 1.273-2.983.834-5z"/>
              </svg>
              Pagar $4.99 con PayPal
            </a>
            <div className="flex gap-2">
              <WhatsAppButton compact />
              <TelegramButton compact />
            </div>
          </div>

          {/* Sync calendar */}
          <SyncButton baseUrl={BASE_URL} />
        </div>
      </header>

      {/* ── FILTERS ─────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <PhaseFilter selected={filter} onChange={setFilter} />
        </div>
      </div>

      {/* ── MATCHES ─────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {sections.length === 0 && (
          <p className="text-center text-gray-400 py-20">No hay partidos en esta fase aún.</p>
        )}

        {sections.map((section) => (
          <section key={section.label}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold text-gray-800">{section.label}</h2>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">{section.matches.length} partidos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.matches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="text-center text-xs text-gray-400 py-8 border-t border-gray-100">
        Horarios en tu zona horaria local &nbsp;·&nbsp;
        Portal por{' '}
        <a href="https://rodai.io" className="underline hover:text-gray-600">
          RODAI
        </a>
      </footer>
    </div>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className={`flex flex-col items-center ${color} text-white rounded-xl px-4 py-2 min-w-[70px]`}>
      <span className="text-xl font-black">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wide opacity-90">{label}</span>
    </div>
  );
}
