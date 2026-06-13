import type { Match } from '@/types/match';

export const phaseLabels: Record<string, string> = {
  group: 'Fase de Grupos',
  'round-of-32': 'Ronda de 32',
  'round-of-16': 'Octavos de Final',
  'quarter-final': 'Cuartos de Final',
  'semi-final': 'Semifinales',
  'third-place': 'Tercer Lugar',
  final: 'Gran Final',
};

export const phaseOrder: Record<string, number> = {
  group: 0,
  'round-of-32': 1,
  'round-of-16': 2,
  'quarter-final': 3,
  'semi-final': 4,
  'third-place': 5,
  final: 6,
};

// ─────────────────────────────────────────────────────────────────────────────
//  FIFA WORLD CUP 2026 — GROUP STAGE — ALL 72 MATCHES
//  Sources: ESPN, Yahoo Sports, NBC Sports, FIFA.com, Sky Sports (cross-verified)
//
//  Groups A–L confirmed from the official draw (Dec 5, 2025, Washington D.C.)
//  UTC times derived from official ET/local kick-off times:
//    EDT (ET) = UTC−4 → +4 h
//    CDT (Central US) = UTC−5 → +5 h
//    Mexico (CDMX/Guadalajara/Monterrey) = UTC−6 todo el año (sin DST desde 2022) → +6 h
//    PDT (LA/Santa Clara/Seattle/Vancouver) = UTC−7 → +7 h
// ─────────────────────────────────────────────────────────────────────────────

export const matches: Match[] = [

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO A — México, Corea del Sur, Chequia, Sudáfrica
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GA1', phase: 'group', group: 'A', matchNumber: 1,
    homeTeam: 'México', awayTeam: 'Sudáfrica',
    homeFlag: 'mx', awayFlag: 'za',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    // Jun 11, 3:00 PM ET (EDT UTC-4) → 19:00 UTC
    utcDate: '2026-06-11T19:00:00Z',
    status: 'completed',
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: 'GA2', phase: 'group', group: 'A', matchNumber: 2,
    homeTeam: 'Corea del Sur', awayTeam: 'Chequia',
    homeFlag: 'kr', awayFlag: 'cz',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    // Jun 11, 10:00 PM ET (EDT UTC-4) → Jun 12 02:00 UTC
    utcDate: '2026-06-12T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA3', phase: 'group', group: 'A', matchNumber: 25,
    homeTeam: 'Chequia', awayTeam: 'Sudáfrica',
    homeFlag: 'cz', awayFlag: 'za',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    // Jun 18, 12:00 PM ET → 16:00 UTC
    utcDate: '2026-06-18T16:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA4', phase: 'group', group: 'A', matchNumber: 28,
    homeTeam: 'México', awayTeam: 'Corea del Sur',
    homeFlag: 'mx', awayFlag: 'kr',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    // Jun 18, 9:00 PM ET → Jun 19 01:00 UTC
    utcDate: '2026-06-19T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA5', phase: 'group', group: 'A', matchNumber: 53,
    homeTeam: 'Chequia', awayTeam: 'México',
    homeFlag: 'cz', awayFlag: 'mx',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    // Jun 24, 9:00 PM ET → Jun 25 01:00 UTC
    utcDate: '2026-06-25T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA6', phase: 'group', group: 'A', matchNumber: 54,
    homeTeam: 'Sudáfrica', awayTeam: 'Corea del Sur',
    homeFlag: 'za', awayFlag: 'kr',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    // Jun 24, 9:00 PM ET → Jun 25 01:00 UTC
    utcDate: '2026-06-25T01:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO B — Canadá, Bosnia y Herzegovina, Qatar, Suiza
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GB1', phase: 'group', group: 'B', matchNumber: 3,
    homeTeam: 'Canadá', awayTeam: 'Bosnia y Herzegovina',
    homeFlag: 'ca', awayFlag: 'ba',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    // Jun 12, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-12T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB2', phase: 'group', group: 'B', matchNumber: 8,
    homeTeam: 'Qatar', awayTeam: 'Suiza',
    homeFlag: 'qa', awayFlag: 'ch',
    venue: "Levi's Stadium", city: 'Santa Clara', country: 'USA',
    // Jun 13, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-13T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB3', phase: 'group', group: 'B', matchNumber: 26,
    homeTeam: 'Suiza', awayTeam: 'Bosnia y Herzegovina',
    homeFlag: 'ch', awayFlag: 'ba',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    // Jun 18, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-18T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB4', phase: 'group', group: 'B', matchNumber: 27,
    homeTeam: 'Canadá', awayTeam: 'Qatar',
    homeFlag: 'ca', awayFlag: 'qa',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    // Jun 18, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-18T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB5', phase: 'group', group: 'B', matchNumber: 51,
    homeTeam: 'Suiza', awayTeam: 'Canadá',
    homeFlag: 'ch', awayFlag: 'ca',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    // Jun 24, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-24T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB6', phase: 'group', group: 'B', matchNumber: 52,
    homeTeam: 'Bosnia y Herzegovina', awayTeam: 'Qatar',
    homeFlag: 'ba', awayFlag: 'qa',
    venue: 'Lumen Field', city: 'Seattle', country: 'USA',
    // Jun 24, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-24T19:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO C — Brasil, Marruecos, Haití, Escocia
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GC1', phase: 'group', group: 'C', matchNumber: 7,
    homeTeam: 'Brasil', awayTeam: 'Marruecos',
    homeFlag: 'br', awayFlag: 'ma',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    // Jun 13, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-13T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC2', phase: 'group', group: 'C', matchNumber: 5,
    homeTeam: 'Haití', awayTeam: 'Escocia',
    homeFlag: 'ht', awayFlag: 'gb-sct',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    // Jun 13, 9:00 PM ET → Jun 14 01:00 UTC
    utcDate: '2026-06-14T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC3', phase: 'group', group: 'C', matchNumber: 30,
    homeTeam: 'Escocia', awayTeam: 'Marruecos',
    homeFlag: 'gb-sct', awayFlag: 'ma',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    // Jun 19, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-19T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC4', phase: 'group', group: 'C', matchNumber: 31,
    homeTeam: 'Brasil', awayTeam: 'Haití',
    homeFlag: 'br', awayFlag: 'ht',
    venue: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    // Jun 19, 8:30 PM ET → Jun 20 00:30 UTC
    utcDate: '2026-06-20T00:30:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC5', phase: 'group', group: 'C', matchNumber: 49,
    homeTeam: 'Escocia', awayTeam: 'Brasil',
    homeFlag: 'gb-sct', awayFlag: 'br',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    // Jun 24, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-24T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC6', phase: 'group', group: 'C', matchNumber: 50,
    homeTeam: 'Marruecos', awayTeam: 'Haití',
    homeFlag: 'ma', awayFlag: 'ht',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    // Jun 24, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-24T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO D — Estados Unidos, Paraguay, Australia, Türkiye
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GD1', phase: 'group', group: 'D', matchNumber: 4,
    homeTeam: 'Estados Unidos', awayTeam: 'Paraguay',
    homeFlag: 'us', awayFlag: 'py',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    // Jun 12, 9:00 PM ET → Jun 13 01:00 UTC
    utcDate: '2026-06-13T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD2', phase: 'group', group: 'D', matchNumber: 6,
    homeTeam: 'Australia', awayTeam: 'Türkiye',
    homeFlag: 'au', awayFlag: 'tr',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    // Jun 13, 12:00 AM ET (Jun 14 local) → Jun 14 04:00 UTC
    utcDate: '2026-06-14T04:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD3', phase: 'group', group: 'D', matchNumber: 32,
    homeTeam: 'Estados Unidos', awayTeam: 'Australia',
    homeFlag: 'us', awayFlag: 'au',
    venue: 'Lumen Field', city: 'Seattle', country: 'USA',
    // Jun 19, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-19T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD4', phase: 'group', group: 'D', matchNumber: 29,
    homeTeam: 'Türkiye', awayTeam: 'Paraguay',
    homeFlag: 'tr', awayFlag: 'py',
    venue: "Levi's Stadium", city: 'Santa Clara', country: 'USA',
    // Jun 19, 11:00 PM ET → Jun 20 03:00 UTC
    utcDate: '2026-06-20T03:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD5', phase: 'group', group: 'D', matchNumber: 59,
    homeTeam: 'Türkiye', awayTeam: 'Estados Unidos',
    homeFlag: 'tr', awayFlag: 'us',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    // Jun 25, 10:00 PM ET → Jun 26 02:00 UTC
    utcDate: '2026-06-26T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD6', phase: 'group', group: 'D', matchNumber: 60,
    homeTeam: 'Paraguay', awayTeam: 'Australia',
    homeFlag: 'py', awayFlag: 'au',
    venue: "Levi's Stadium", city: 'Santa Clara', country: 'USA',
    // Jun 25, 10:00 PM ET → Jun 26 02:00 UTC
    utcDate: '2026-06-26T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO E — Alemania, Curazao, Costa de Marfil, Ecuador
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GE1', phase: 'group', group: 'E', matchNumber: 10,
    homeTeam: 'Alemania', awayTeam: 'Curazao',
    homeFlag: 'de', awayFlag: 'cw',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    // Jun 14, 1:00 PM ET → 17:00 UTC
    utcDate: '2026-06-14T17:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE2', phase: 'group', group: 'E', matchNumber: 9,
    homeTeam: 'Costa de Marfil', awayTeam: 'Ecuador',
    homeFlag: 'ci', awayFlag: 'ec',
    venue: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    // Jun 14, 7:00 PM ET → 23:00 UTC
    utcDate: '2026-06-14T23:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE3', phase: 'group', group: 'E', matchNumber: 33,
    homeTeam: 'Alemania', awayTeam: 'Costa de Marfil',
    homeFlag: 'de', awayFlag: 'ci',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    // Jun 20, 4:00 PM ET → 20:00 UTC
    utcDate: '2026-06-20T20:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE4', phase: 'group', group: 'E', matchNumber: 34,
    homeTeam: 'Ecuador', awayTeam: 'Curazao',
    homeFlag: 'ec', awayFlag: 'cw',
    venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    // Jun 20, 8:00 PM ET → Jun 21 00:00 UTC
    utcDate: '2026-06-21T00:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE5', phase: 'group', group: 'E', matchNumber: 55,
    homeTeam: 'Curazao', awayTeam: 'Costa de Marfil',
    homeFlag: 'cw', awayFlag: 'ci',
    venue: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    // Jun 25, 4:00 PM ET → 20:00 UTC
    utcDate: '2026-06-25T20:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE6', phase: 'group', group: 'E', matchNumber: 56,
    homeTeam: 'Ecuador', awayTeam: 'Alemania',
    homeFlag: 'ec', awayFlag: 'de',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    // Jun 25, 4:00 PM ET → 20:00 UTC
    utcDate: '2026-06-25T20:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO F — Países Bajos, Japón, Suecia, Túnez
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GF1', phase: 'group', group: 'F', matchNumber: 11,
    homeTeam: 'Países Bajos', awayTeam: 'Japón',
    homeFlag: 'nl', awayFlag: 'jp',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    // Jun 14, 4:00 PM ET → 20:00 UTC
    utcDate: '2026-06-14T20:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF2', phase: 'group', group: 'F', matchNumber: 12,
    homeTeam: 'Suecia', awayTeam: 'Túnez',
    homeFlag: 'se', awayFlag: 'tn',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    // Jun 14, 10:00 PM ET → Jun 15 02:00 UTC
    utcDate: '2026-06-15T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF3', phase: 'group', group: 'F', matchNumber: 35,
    homeTeam: 'Países Bajos', awayTeam: 'Suecia',
    homeFlag: 'nl', awayFlag: 'se',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    // Jun 20, 1:00 PM ET → 17:00 UTC
    utcDate: '2026-06-20T17:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF4', phase: 'group', group: 'F', matchNumber: 36,
    homeTeam: 'Túnez', awayTeam: 'Japón',
    homeFlag: 'tn', awayFlag: 'jp',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    // Jun 20, 12:00 AM ET (Jun 21 local) → Jun 21 04:00 UTC
    utcDate: '2026-06-21T04:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF5', phase: 'group', group: 'F', matchNumber: 57,
    homeTeam: 'Japón', awayTeam: 'Suecia',
    homeFlag: 'jp', awayFlag: 'se',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    // Jun 25, 7:00 PM ET → 23:00 UTC
    utcDate: '2026-06-25T23:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF6', phase: 'group', group: 'F', matchNumber: 58,
    homeTeam: 'Túnez', awayTeam: 'Países Bajos',
    homeFlag: 'tn', awayFlag: 'nl',
    venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    // Jun 25, 7:00 PM ET → 23:00 UTC
    utcDate: '2026-06-25T23:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO G — Bélgica, Egipto, Irán, Nueva Zelanda
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GG1', phase: 'group', group: 'G', matchNumber: 16,
    homeTeam: 'Bélgica', awayTeam: 'Egipto',
    homeFlag: 'be', awayFlag: 'eg',
    venue: 'Lumen Field', city: 'Seattle', country: 'USA',
    // Jun 15, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-15T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG2', phase: 'group', group: 'G', matchNumber: 15,
    homeTeam: 'Irán', awayTeam: 'Nueva Zelanda',
    homeFlag: 'ir', awayFlag: 'nz',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    // Jun 15, 9:00 PM ET → Jun 16 01:00 UTC
    utcDate: '2026-06-16T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG3', phase: 'group', group: 'G', matchNumber: 39,
    homeTeam: 'Bélgica', awayTeam: 'Irán',
    homeFlag: 'be', awayFlag: 'ir',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    // Jun 21, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-21T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG4', phase: 'group', group: 'G', matchNumber: 40,
    homeTeam: 'Nueva Zelanda', awayTeam: 'Egipto',
    homeFlag: 'nz', awayFlag: 'eg',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    // Jun 21, 9:00 PM ET → Jun 22 01:00 UTC
    utcDate: '2026-06-22T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG5', phase: 'group', group: 'G', matchNumber: 65,
    homeTeam: 'Egipto', awayTeam: 'Irán',
    homeFlag: 'eg', awayFlag: 'ir',
    venue: 'Lumen Field', city: 'Seattle', country: 'USA',
    // Jun 26, 11:00 PM ET → Jun 27 03:00 UTC
    utcDate: '2026-06-27T03:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG6', phase: 'group', group: 'G', matchNumber: 64,
    homeTeam: 'Nueva Zelanda', awayTeam: 'Bélgica',
    homeFlag: 'nz', awayFlag: 'be',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    // Jun 26, 11:00 PM ET → Jun 27 03:00 UTC
    utcDate: '2026-06-27T03:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO H — España, Cabo Verde, Arabia Saudita, Uruguay
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GH1', phase: 'group', group: 'H', matchNumber: 14,
    homeTeam: 'España', awayTeam: 'Cabo Verde',
    homeFlag: 'es', awayFlag: 'cv',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    // Jun 15, 12:00 PM ET → 16:00 UTC
    utcDate: '2026-06-15T16:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH2', phase: 'group', group: 'H', matchNumber: 13,
    homeTeam: 'Arabia Saudita', awayTeam: 'Uruguay',
    homeFlag: 'sa', awayFlag: 'uy',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    // Jun 15, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-15T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH3', phase: 'group', group: 'H', matchNumber: 38,
    homeTeam: 'España', awayTeam: 'Arabia Saudita',
    homeFlag: 'es', awayFlag: 'sa',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    // Jun 21, 12:00 PM ET → 16:00 UTC
    utcDate: '2026-06-21T16:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH4', phase: 'group', group: 'H', matchNumber: 37,
    homeTeam: 'Uruguay', awayTeam: 'Cabo Verde',
    homeFlag: 'uy', awayFlag: 'cv',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    // Jun 21, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-21T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH5', phase: 'group', group: 'H', matchNumber: 63,
    homeTeam: 'Cabo Verde', awayTeam: 'Arabia Saudita',
    homeFlag: 'cv', awayFlag: 'sa',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    // Jun 26, 8:00 PM ET → Jun 27 00:00 UTC
    utcDate: '2026-06-27T00:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH6', phase: 'group', group: 'H', matchNumber: 66,
    homeTeam: 'Uruguay', awayTeam: 'España',
    homeFlag: 'uy', awayFlag: 'es',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    // Jun 26, 8:00 PM ET → Jun 27 00:00 UTC
    utcDate: '2026-06-27T00:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO I — Francia, Senegal, Irak, Noruega
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GI1', phase: 'group', group: 'I', matchNumber: 17,
    homeTeam: 'Francia', awayTeam: 'Senegal',
    homeFlag: 'fr', awayFlag: 'sn',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    // Jun 16, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-16T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI2', phase: 'group', group: 'I', matchNumber: 18,
    homeTeam: 'Irak', awayTeam: 'Noruega',
    homeFlag: 'iq', awayFlag: 'no',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    // Jun 16, 6:00 PM ET → 22:00 UTC
    utcDate: '2026-06-16T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI3', phase: 'group', group: 'I', matchNumber: 42,
    homeTeam: 'Francia', awayTeam: 'Irak',
    homeFlag: 'fr', awayFlag: 'iq',
    venue: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    // Jun 22, 5:00 PM ET → 21:00 UTC
    utcDate: '2026-06-22T21:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI4', phase: 'group', group: 'I', matchNumber: 43,
    homeTeam: 'Noruega', awayTeam: 'Senegal',
    homeFlag: 'no', awayFlag: 'sn',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    // Jun 22, 8:00 PM ET → Jun 23 00:00 UTC
    utcDate: '2026-06-23T00:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI5', phase: 'group', group: 'I', matchNumber: 61,
    homeTeam: 'Noruega', awayTeam: 'Francia',
    homeFlag: 'no', awayFlag: 'fr',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    // Jun 26, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-26T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI6', phase: 'group', group: 'I', matchNumber: 62,
    homeTeam: 'Senegal', awayTeam: 'Irak',
    homeFlag: 'sn', awayFlag: 'iq',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    // Jun 26, 3:00 PM ET → 19:00 UTC
    utcDate: '2026-06-26T19:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO J — Argentina, Algeria, Austria, Jordania
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GJ1', phase: 'group', group: 'J', matchNumber: 19,
    homeTeam: 'Argentina', awayTeam: 'Algeria',
    homeFlag: 'ar', awayFlag: 'dz',
    venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    // Jun 16, 9:00 PM ET → Jun 17 01:00 UTC
    utcDate: '2026-06-17T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ2', phase: 'group', group: 'J', matchNumber: 20,
    homeTeam: 'Austria', awayTeam: 'Jordania',
    homeFlag: 'at', awayFlag: 'jo',
    venue: "Levi's Stadium", city: 'Santa Clara', country: 'USA',
    // Jun 16, 12:00 AM ET (Jun 17) → Jun 17 04:00 UTC
    utcDate: '2026-06-17T04:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ3', phase: 'group', group: 'J', matchNumber: 41,
    homeTeam: 'Argentina', awayTeam: 'Austria',
    homeFlag: 'ar', awayFlag: 'at',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    // Jun 22, 1:00 PM ET → 17:00 UTC
    utcDate: '2026-06-22T17:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ4', phase: 'group', group: 'J', matchNumber: 44,
    homeTeam: 'Jordania', awayTeam: 'Algeria',
    homeFlag: 'jo', awayFlag: 'dz',
    venue: "Levi's Stadium", city: 'Santa Clara', country: 'USA',
    // Jun 22, 11:00 PM ET → Jun 23 03:00 UTC
    utcDate: '2026-06-23T03:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ5', phase: 'group', group: 'J', matchNumber: 69,
    homeTeam: 'Algeria', awayTeam: 'Austria',
    homeFlag: 'dz', awayFlag: 'at',
    venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    // Jun 27, 10:00 PM ET → Jun 28 02:00 UTC
    utcDate: '2026-06-28T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ6', phase: 'group', group: 'J', matchNumber: 70,
    homeTeam: 'Jordania', awayTeam: 'Argentina',
    homeFlag: 'jo', awayFlag: 'ar',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    // Jun 27, 10:00 PM ET → Jun 28 02:00 UTC
    utcDate: '2026-06-28T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO K — Portugal, DR Congo, Uzbekistán, Colombia
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GK1', phase: 'group', group: 'K', matchNumber: 23,
    homeTeam: 'Portugal', awayTeam: 'DR Congo',
    homeFlag: 'pt', awayFlag: 'cd',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    // Jun 17, 1:00 PM ET → 17:00 UTC
    utcDate: '2026-06-17T17:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK2', phase: 'group', group: 'K', matchNumber: 24,
    homeTeam: 'Uzbekistán', awayTeam: 'Colombia',
    homeFlag: 'uz', awayFlag: 'co',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    // Jun 17, 10:00 PM ET → Jun 18 02:00 UTC
    utcDate: '2026-06-18T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK3', phase: 'group', group: 'K', matchNumber: 47,
    homeTeam: 'Portugal', awayTeam: 'Uzbekistán',
    homeFlag: 'pt', awayFlag: 'uz',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    // Jun 23, 1:00 PM ET → 17:00 UTC
    utcDate: '2026-06-23T17:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK4', phase: 'group', group: 'K', matchNumber: 48,
    homeTeam: 'Colombia', awayTeam: 'DR Congo',
    homeFlag: 'co', awayFlag: 'cd',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    // Jun 23, 10:00 PM ET → Jun 24 02:00 UTC
    utcDate: '2026-06-24T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK5', phase: 'group', group: 'K', matchNumber: 71,
    homeTeam: 'Colombia', awayTeam: 'Portugal',
    homeFlag: 'co', awayFlag: 'pt',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    // Jun 27, 7:30 PM ET → 23:30 UTC
    utcDate: '2026-06-27T23:30:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK6', phase: 'group', group: 'K', matchNumber: 72,
    homeTeam: 'DR Congo', awayTeam: 'Uzbekistán',
    homeFlag: 'cd', awayFlag: 'uz',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    // Jun 27, 7:30 PM ET → 23:30 UTC
    utcDate: '2026-06-27T23:30:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRUPO L — Inglaterra, Croacia, Ghana, Panamá
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'GL1', phase: 'group', group: 'L', matchNumber: 22,
    homeTeam: 'Inglaterra', awayTeam: 'Croacia',
    homeFlag: 'gb-eng', awayFlag: 'hr',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    // Jun 17, 4:00 PM ET → 20:00 UTC
    utcDate: '2026-06-17T20:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL2', phase: 'group', group: 'L', matchNumber: 21,
    homeTeam: 'Ghana', awayTeam: 'Panamá',
    homeFlag: 'gh', awayFlag: 'pa',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    // Jun 17, 7:00 PM ET → 23:00 UTC
    utcDate: '2026-06-17T23:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL3', phase: 'group', group: 'L', matchNumber: 45,
    homeTeam: 'Inglaterra', awayTeam: 'Ghana',
    homeFlag: 'gb-eng', awayFlag: 'gh',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    // Jun 23, 4:00 PM ET → 20:00 UTC
    utcDate: '2026-06-23T20:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL4', phase: 'group', group: 'L', matchNumber: 46,
    homeTeam: 'Panamá', awayTeam: 'Croacia',
    homeFlag: 'pa', awayFlag: 'hr',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    // Jun 23, 7:00 PM ET → 23:00 UTC
    utcDate: '2026-06-23T23:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL5', phase: 'group', group: 'L', matchNumber: 67,
    homeTeam: 'Panamá', awayTeam: 'Inglaterra',
    homeFlag: 'pa', awayFlag: 'gb-eng',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    // Jun 27, 5:00 PM ET → 21:00 UTC
    utcDate: '2026-06-27T21:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL6', phase: 'group', group: 'L', matchNumber: 68,
    homeTeam: 'Croacia', awayTeam: 'Ghana',
    homeFlag: 'hr', awayFlag: 'gh',
    venue: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    // Jun 27, 5:00 PM ET → 21:00 UTC
    utcDate: '2026-06-27T21:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  RONDA DE 32 — Partidos 73–88 (Jun 29 – Jul 4)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'R32-1', phase: 'round-of-32', matchNumber: 73,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-28T19:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-2', phase: 'round-of-32', matchNumber: 74,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    utcDate: '2026-06-29T20:30:00Z', status: 'upcoming',
  },
  {
    id: 'R32-3', phase: 'round-of-32', matchNumber: 75,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-30T01:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-4', phase: 'round-of-32', matchNumber: 76,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    utcDate: '2026-06-29T17:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-5', phase: 'round-of-32', matchNumber: 77,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    utcDate: '2026-06-30T21:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-6', phase: 'round-of-32', matchNumber: 78,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    utcDate: '2026-06-30T17:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-7', phase: 'round-of-32', matchNumber: 79,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-07-01T01:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-8', phase: 'round-of-32', matchNumber: 80,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    utcDate: '2026-07-01T16:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-9', phase: 'round-of-32', matchNumber: 81,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: "Levi's Stadium", city: 'Santa Clara', country: 'USA',
    utcDate: '2026-07-02T00:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-10', phase: 'round-of-32', matchNumber: 82,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Lumen Field', city: 'Seattle', country: 'USA',
    utcDate: '2026-07-01T20:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-11', phase: 'round-of-32', matchNumber: 83,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    utcDate: '2026-07-02T23:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-12', phase: 'round-of-32', matchNumber: 84,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-07-02T19:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-13', phase: 'round-of-32', matchNumber: 85,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-07-03T03:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-14', phase: 'round-of-32', matchNumber: 86,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    utcDate: '2026-07-03T22:00:00Z', status: 'upcoming',
  },
  {
    id: 'R32-15', phase: 'round-of-32', matchNumber: 87,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    utcDate: '2026-07-04T01:30:00Z', status: 'upcoming',
  },
  {
    id: 'R32-16', phase: 'round-of-32', matchNumber: 88,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    utcDate: '2026-07-03T18:00:00Z', status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  OCTAVOS DE FINAL — Partidos 89–96 (Jul 8–11)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'R16-1', phase: 'round-of-16', matchNumber: 89,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    utcDate: '2026-07-04T21:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-2', phase: 'round-of-16', matchNumber: 90,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'NRG Stadium', city: 'Houston', country: 'USA',
    utcDate: '2026-07-04T17:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-3', phase: 'round-of-16', matchNumber: 91,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    utcDate: '2026-07-05T20:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-4', phase: 'round-of-16', matchNumber: 92,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-07-06T00:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-5', phase: 'round-of-16', matchNumber: 93,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    utcDate: '2026-07-06T19:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-6', phase: 'round-of-16', matchNumber: 94,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Lumen Field', city: 'Seattle', country: 'USA',
    utcDate: '2026-07-07T00:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-7', phase: 'round-of-16', matchNumber: 95,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    utcDate: '2026-07-07T16:00:00Z', status: 'upcoming',
  },
  {
    id: 'R16-8', phase: 'round-of-16', matchNumber: 96,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-07-07T20:00:00Z', status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  CUARTOS DE FINAL — Partidos 97–100 (Jul 14–15)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'QF-1', phase: 'quarter-final', matchNumber: 97,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Gillette Stadium', city: 'Foxborough', country: 'USA',
    utcDate: '2026-07-09T20:00:00Z', status: 'upcoming',
  },
  {
    id: 'QF-2', phase: 'quarter-final', matchNumber: 98,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-07-10T19:00:00Z', status: 'upcoming',
  },
  {
    id: 'QF-3', phase: 'quarter-final', matchNumber: 99,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    utcDate: '2026-07-11T21:00:00Z', status: 'upcoming',
  },
  {
    id: 'QF-4', phase: 'quarter-final', matchNumber: 100,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    utcDate: '2026-07-12T01:00:00Z', status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  SEMIFINALES — Partidos 101–102 (Jul 18–19)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'SF-1', phase: 'semi-final', matchNumber: 101,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'AT&T Stadium', city: 'Arlington', country: 'USA',
    utcDate: '2026-07-14T19:00:00Z', status: 'upcoming',
  },
  {
    id: 'SF-2', phase: 'semi-final', matchNumber: 102,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA',
    utcDate: '2026-07-15T19:00:00Z', status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  TERCER LUGAR — Partido 103 (Jul 18)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'TP', phase: 'third-place', matchNumber: 103,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA',
    utcDate: '2026-07-18T21:00:00Z', status: 'upcoming',
  },

  // ══════════════════════════════════════════════════════════════════════
  //  GRAN FINAL — Partido 104 (Jul 19)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: 'FINAL', phase: 'final', matchNumber: 104,
    homeTeam: 'Por definir', awayTeam: 'Por definir',
    venue: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    utcDate: '2026-07-19T19:00:00Z', status: 'upcoming',
  },

];
