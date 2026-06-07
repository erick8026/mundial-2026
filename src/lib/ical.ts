import { createEvents, type EventAttributes } from 'ics';
import type { Match } from '@/types/match';
import { phaseLabels } from '@/data/matches';

function toUTCArray(iso: string): [number, number, number, number, number] {
  const d = new Date(iso);
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes()];
}

export function matchesToICS(matches: Match[]): string {
  const events: EventAttributes[] = matches.map((m) => {
    const isKnown = m.homeTeam !== 'TBD' && m.awayTeam !== 'TBD';
    const score = m.homeScore !== undefined && m.awayScore !== undefined
      ? ` [${m.homeScore}-${m.awayScore}]`
      : '';

    const title = isKnown
      ? `${m.homeTeam} vs ${m.awayTeam}${score} — Mundial 2026`
      : `Mundial 2026 · ${phaseLabels[m.phase]} · Partido #${m.matchNumber}`;

    const desc = [
      `⚽ ${phaseLabels[m.phase]}`,
      m.group ? `Grupo ${m.group}` : '',
      `🏟 ${m.venue}`,
      `📍 ${m.city}, ${m.country}`,
      `🔢 Partido #${m.matchNumber}`,
      '',
      'Los horarios se ajustan automáticamente a tu zona horaria.',
      '🌐 https://mundial.rodai.io',
    ].filter(Boolean).join('\n');

    return {
      uid: `mundial2026-${m.id}@rodai.io`,
      title,
      description: desc,
      location: `${m.venue}, ${m.city}`,
      start: toUTCArray(m.utcDate),
      startInputType: 'utc',
      duration: { hours: 2 },
      url: 'https://mundial.rodai.io',
      categories: ['Fútbol', 'Mundial 2026'],
    };
  });

  const { error, value } = createEvents(events);
  if (error || !value) throw new Error(`iCal error: ${error}`);
  return value;
}
