'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Match } from '@/types/match';
import { phaseLabels } from '@/data/matches';

const phaseColor: Record<string, string> = {
  group:          'bg-slate-100 text-slate-700',
  'round-of-32':  'bg-violet-100 text-violet-700',
  'round-of-16':  'bg-blue-100 text-blue-700',
  'quarter-final':'bg-orange-100 text-orange-700',
  'semi-final':   'bg-rose-100 text-rose-700',
  'third-place':  'bg-teal-100 text-teal-700',
  final:          'bg-yellow-100 text-yellow-800',
};

const countryFlag: Record<string, string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' };

function Flag({ code, name }: { code?: string; name: string }) {
  const [error, setError] = useState(false);
  if (!code || error) {
    return (
      <div className="w-12 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
        {name.slice(0, 3).toUpperCase()}
      </div>
    );
  }
  return (
    <Image
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={name}
      width={56}
      height={38}
      className="rounded shadow-sm object-cover"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

function formatLocalTime(utc: string) {
  const d = new Date(utc);
  return {
    date: d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }),
    time: d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function ScoreOrTime({ match }: { match: Match }) {
  const [display, setDisplay] = useState<{ date: string; time: string; tz: string } | null>(null);

  useEffect(() => {
    setDisplay(formatLocalTime(match.utcDate));
  }, [match.utcDate]);

  const isCompleted = match.status === 'completed';
  const isLive = match.status === 'live';
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  if (isLive) {
    return (
      <div className="flex flex-col items-center gap-1 min-w-[70px]">
        <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
          EN VIVO
        </span>
        {hasScore && (
          <span className="text-2xl font-black text-gray-900">
            {match.homeScore} – {match.awayScore}
          </span>
        )}
      </div>
    );
  }

  if (isCompleted && hasScore) {
    const hw = match.homeScore! > match.awayScore!;
    const aw = match.awayScore! > match.homeScore!;
    return (
      <div className="flex flex-col items-center gap-0.5 min-w-[70px]">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Final</span>
        <div className="flex items-center gap-1">
          <span className={`text-3xl font-black ${hw ? 'text-green-600' : aw ? 'text-gray-400' : 'text-gray-700'}`}>
            {match.homeScore}
          </span>
          <span className="text-xl text-gray-300 font-light">–</span>
          <span className={`text-3xl font-black ${aw ? 'text-green-600' : hw ? 'text-gray-400' : 'text-gray-700'}`}>
            {match.awayScore}
          </span>
        </div>
      </div>
    );
  }

  // upcoming
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-[70px]">
      {display ? (
        <>
          <span className="text-[11px] text-gray-400 text-center leading-tight">
            {display.date}
          </span>
          <span className="text-lg font-bold text-gray-800">{display.time}</span>
          <span className="text-[10px] text-gray-400">{display.tz}</span>
        </>
      ) : (
        <span className="text-gray-300 text-sm">...</span>
      )}
    </div>
  );
}

export default function MatchCard({ match }: { match: Match }) {
  const isFinal = match.phase === 'final';
  const isCompleted = match.status === 'completed';
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <div className={`
      relative bg-white rounded-2xl border transition-all hover:shadow-md
      ${isFinal
        ? 'border-yellow-400 shadow-lg shadow-yellow-100 ring-1 ring-yellow-300'
        : isCompleted && hasScore
          ? 'border-gray-200 bg-gray-50'
          : 'border-gray-100 shadow-sm'
      }
    `}>
      {/* Status ribbon for completed */}
      {isCompleted && hasScore && (
        <div className="absolute top-0 right-0 bg-gray-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-2xl tracking-wider">
          FINAL
        </div>
      )}

      <div className="p-4">
        {/* Phase + Match # */}
        <div className="flex justify-between items-center mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${phaseColor[match.phase]}`}>
            {phaseLabels[match.phase]}{match.group ? ` · Grupo ${match.group}` : ''}
          </span>
          <span className="text-[11px] text-gray-300 font-mono">#{match.matchNumber}</span>
        </div>

        {/* Teams + Score */}
        <div className="flex items-center justify-between gap-2">
          {/* Home team */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <Flag code={match.homeFlag} name={match.homeTeam} />
            <span className="text-xs font-semibold text-gray-800 text-center leading-tight max-w-[80px]">
              {match.homeTeam}
            </span>
          </div>

          <ScoreOrTime match={match} />

          {/* Away team */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <Flag code={match.awayFlag} name={match.awayTeam} />
            <span className="text-xs font-semibold text-gray-800 text-center leading-tight max-w-[80px]">
              {match.awayTeam}
            </span>
          </div>
        </div>

        {/* Venue */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-center gap-1">
          <span className="text-sm">{countryFlag[match.country]}</span>
          <span className="text-[11px] text-gray-400 text-center">
            {match.venue} · {match.city}
          </span>
        </div>
      </div>
    </div>
  );
}
