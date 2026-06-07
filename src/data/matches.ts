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

// homeScore / awayScore se actualizan conforme avanza el torneo.
// Los primeros partidos ya tienen marcador de ejemplo para mostrar el diseño.
export const matches: Match[] = [
  // ══════════════════════════════════
  //  GRUPO A  (México, Uruguay, Alemania, Ecuador)
  // ══════════════════════════════════
  {
    id: 'GA1', phase: 'group', group: 'A', matchNumber: 1,
    homeTeam: 'México', awayTeam: 'Ecuador',
    homeFlag: 'mx', awayFlag: 'ec',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-11T23:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA2', phase: 'group', group: 'A', matchNumber: 2,
    homeTeam: 'Uruguay', awayTeam: 'Alemania',
    homeFlag: 'uy', awayFlag: 'de',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-12T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA3', phase: 'group', group: 'A', matchNumber: 17,
    homeTeam: 'Alemania', awayTeam: 'México',
    homeFlag: 'de', awayFlag: 'mx',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-16T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA4', phase: 'group', group: 'A', matchNumber: 18,
    homeTeam: 'Ecuador', awayTeam: 'Uruguay',
    homeFlag: 'ec', awayFlag: 'uy',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-16T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA5', phase: 'group', group: 'A', matchNumber: 33,
    homeTeam: 'Ecuador', awayTeam: 'Alemania',
    homeFlag: 'ec', awayFlag: 'de',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-21T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GA6', phase: 'group', group: 'A', matchNumber: 34,
    homeTeam: 'Uruguay', awayTeam: 'México',
    homeFlag: 'uy', awayFlag: 'mx',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-21T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO B  (España, Portugal, Marruecos, Croacia)
  // ══════════════════════════════════
  {
    id: 'GB1', phase: 'group', group: 'B', matchNumber: 3,
    homeTeam: 'España', awayTeam: 'Marruecos',
    homeFlag: 'es', awayFlag: 'ma',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-12T00:00:00Z',
    // Marcador de demo para visualización del diseño
    status: 'completed',
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: 'GB2', phase: 'group', group: 'B', matchNumber: 4,
    homeTeam: 'Portugal', awayTeam: 'Croacia',
    homeFlag: 'pt', awayFlag: 'hr',
    venue: "Levi's Stadium", city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-12T23:00:00Z',
    status: 'completed',
    homeScore: 3,
    awayScore: 1,
  },
  {
    id: 'GB3', phase: 'group', group: 'B', matchNumber: 19,
    homeTeam: 'Marruecos', awayTeam: 'Portugal',
    homeFlag: 'ma', awayFlag: 'pt',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-17T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB4', phase: 'group', group: 'B', matchNumber: 20,
    homeTeam: 'Croacia', awayTeam: 'España',
    homeFlag: 'hr', awayFlag: 'es',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-17T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB5', phase: 'group', group: 'B', matchNumber: 35,
    homeTeam: 'Croacia', awayTeam: 'Marruecos',
    homeFlag: 'hr', awayFlag: 'ma',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-22T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GB6', phase: 'group', group: 'B', matchNumber: 36,
    homeTeam: 'España', awayTeam: 'Portugal',
    homeFlag: 'es', awayFlag: 'pt',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-22T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO C  (Argentina, Canadá, Chile, Perú)
  // ══════════════════════════════════
  {
    id: 'GC1', phase: 'group', group: 'C', matchNumber: 5,
    homeTeam: 'Argentina', awayTeam: 'Canadá',
    homeFlag: 'ar', awayFlag: 'ca',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-13T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC2', phase: 'group', group: 'C', matchNumber: 6,
    homeTeam: 'Chile', awayTeam: 'Perú',
    homeFlag: 'cl', awayFlag: 'pe',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-13T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC3', phase: 'group', group: 'C', matchNumber: 21,
    homeTeam: 'Canadá', awayTeam: 'Chile',
    homeFlag: 'ca', awayFlag: 'cl',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-06-18T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC4', phase: 'group', group: 'C', matchNumber: 22,
    homeTeam: 'Perú', awayTeam: 'Argentina',
    homeFlag: 'pe', awayFlag: 'ar',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-18T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC5', phase: 'group', group: 'C', matchNumber: 37,
    homeTeam: 'Perú', awayTeam: 'Canadá',
    homeFlag: 'pe', awayFlag: 'ca',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-23T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GC6', phase: 'group', group: 'C', matchNumber: 38,
    homeTeam: 'Argentina', awayTeam: 'Chile',
    homeFlag: 'ar', awayFlag: 'cl',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-23T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO D  (Francia, Bélgica, Senegal, Argelia)
  // ══════════════════════════════════
  {
    id: 'GD1', phase: 'group', group: 'D', matchNumber: 7,
    homeTeam: 'Francia', awayTeam: 'Argelia',
    homeFlag: 'fr', awayFlag: 'dz',
    venue: "Levi's Stadium", city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-13T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD2', phase: 'group', group: 'D', matchNumber: 8,
    homeTeam: 'Bélgica', awayTeam: 'Senegal',
    homeFlag: 'be', awayFlag: 'sn',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    utcDate: '2026-06-14T23:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD3', phase: 'group', group: 'D', matchNumber: 23,
    homeTeam: 'Argelia', awayTeam: 'Bélgica',
    homeFlag: 'dz', awayFlag: 'be',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-19T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD4', phase: 'group', group: 'D', matchNumber: 24,
    homeTeam: 'Senegal', awayTeam: 'Francia',
    homeFlag: 'sn', awayFlag: 'fr',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-19T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD5', phase: 'group', group: 'D', matchNumber: 39,
    homeTeam: 'Senegal', awayTeam: 'Argelia',
    homeFlag: 'sn', awayFlag: 'dz',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-24T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GD6', phase: 'group', group: 'D', matchNumber: 40,
    homeTeam: 'Bélgica', awayTeam: 'Francia',
    homeFlag: 'be', awayFlag: 'fr',
    venue: "Levi's Stadium", city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-24T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO E  (Brasil, Países Bajos, Colombia, Paraguay)
  // ══════════════════════════════════
  {
    id: 'GE1', phase: 'group', group: 'E', matchNumber: 9,
    homeTeam: 'Brasil', awayTeam: 'Paraguay',
    homeFlag: 'br', awayFlag: 'py',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-14T18:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE2', phase: 'group', group: 'E', matchNumber: 10,
    homeTeam: 'Países Bajos', awayTeam: 'Colombia',
    homeFlag: 'nl', awayFlag: 'co',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-14T21:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE3', phase: 'group', group: 'E', matchNumber: 25,
    homeTeam: 'Colombia', awayTeam: 'Brasil',
    homeFlag: 'co', awayFlag: 'br',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-19T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE4', phase: 'group', group: 'E', matchNumber: 26,
    homeTeam: 'Paraguay', awayTeam: 'Países Bajos',
    homeFlag: 'py', awayFlag: 'nl',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-20T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE5', phase: 'group', group: 'E', matchNumber: 41,
    homeTeam: 'Paraguay', awayTeam: 'Colombia',
    homeFlag: 'py', awayFlag: 'co',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-25T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GE6', phase: 'group', group: 'E', matchNumber: 42,
    homeTeam: 'Brasil', awayTeam: 'Países Bajos',
    homeFlag: 'br', awayFlag: 'nl',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-25T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO F  (Inglaterra, Nigeria, Australia, Arabia Saudita)
  // ══════════════════════════════════
  {
    id: 'GF1', phase: 'group', group: 'F', matchNumber: 11,
    homeTeam: 'Inglaterra', awayTeam: 'Nigeria',
    homeFlag: 'gb-eng', awayFlag: 'ng',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-15T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF2', phase: 'group', group: 'F', matchNumber: 12,
    homeTeam: 'Australia', awayTeam: 'Arabia Saudita',
    homeFlag: 'au', awayFlag: 'sa',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-15T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF3', phase: 'group', group: 'F', matchNumber: 27,
    homeTeam: 'Nigeria', awayTeam: 'Australia',
    homeFlag: 'ng', awayFlag: 'au',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-20T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF4', phase: 'group', group: 'F', matchNumber: 28,
    homeTeam: 'Arabia Saudita', awayTeam: 'Inglaterra',
    homeFlag: 'sa', awayFlag: 'gb-eng',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-20T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF5', phase: 'group', group: 'F', matchNumber: 43,
    homeTeam: 'Arabia Saudita', awayTeam: 'Nigeria',
    homeFlag: 'sa', awayFlag: 'ng',
    venue: "Levi's Stadium", city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-26T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GF6', phase: 'group', group: 'F', matchNumber: 44,
    homeTeam: 'Australia', awayTeam: 'Inglaterra',
    homeFlag: 'au', awayFlag: 'gb-eng',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-26T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO G  (Estados Unidos, Japón, Costa de Marfil, Bolivia)
  // ══════════════════════════════════
  {
    id: 'GG1', phase: 'group', group: 'G', matchNumber: 13,
    homeTeam: 'Estados Unidos', awayTeam: 'Bolivia',
    homeFlag: 'us', awayFlag: 'bo',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-15T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG2', phase: 'group', group: 'G', matchNumber: 14,
    homeTeam: 'Japón', awayTeam: 'C. de Marfil',
    homeFlag: 'jp', awayFlag: 'ci',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-16T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG3', phase: 'group', group: 'G', matchNumber: 29,
    homeTeam: 'Bolivia', awayTeam: 'Japón',
    homeFlag: 'bo', awayFlag: 'jp',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-21T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG4', phase: 'group', group: 'G', matchNumber: 30,
    homeTeam: 'C. de Marfil', awayTeam: 'Estados Unidos',
    homeFlag: 'ci', awayFlag: 'us',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-21T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG5', phase: 'group', group: 'G', matchNumber: 45,
    homeTeam: 'Bolivia', awayTeam: 'C. de Marfil',
    homeFlag: 'bo', awayFlag: 'ci',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-06-26T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GG6', phase: 'group', group: 'G', matchNumber: 46,
    homeTeam: 'Japón', awayTeam: 'Estados Unidos',
    homeFlag: 'jp', awayFlag: 'us',
    venue: "Levi's Stadium", city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-26T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO H  (Italia, Corea del Sur, Ghana, Ecuador)
  // ══════════════════════════════════
  {
    id: 'GH1', phase: 'group', group: 'H', matchNumber: 15,
    homeTeam: 'Italia', awayTeam: 'Ghana',
    homeFlag: 'it', awayFlag: 'gh',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-16T18:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH2', phase: 'group', group: 'H', matchNumber: 16,
    homeTeam: 'Corea del Sur', awayTeam: 'Ecuador',
    homeFlag: 'kr', awayFlag: 'ec',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-17T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH3', phase: 'group', group: 'H', matchNumber: 31,
    homeTeam: 'Ghana', awayTeam: 'Corea del Sur',
    homeFlag: 'gh', awayFlag: 'kr',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-22T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH4', phase: 'group', group: 'H', matchNumber: 32,
    homeTeam: 'Ecuador', awayTeam: 'Italia',
    homeFlag: 'ec', awayFlag: 'it',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-22T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH5', phase: 'group', group: 'H', matchNumber: 47,
    homeTeam: 'Ghana', awayTeam: 'Ecuador',
    homeFlag: 'gh', awayFlag: 'ec',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-27T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GH6', phase: 'group', group: 'H', matchNumber: 48,
    homeTeam: 'Italia', awayTeam: 'Corea del Sur',
    homeFlag: 'it', awayFlag: 'kr',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-27T22:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO I  (Serbia, Polonia, y 2 clasificados)
  // ══════════════════════════════════
  {
    id: 'GI1', phase: 'group', group: 'I', matchNumber: 49,
    homeTeam: 'Serbia', awayTeam: 'Polonia',
    homeFlag: 'rs', awayFlag: 'pl',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-13T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI2', phase: 'group', group: 'I', matchNumber: 50,
    homeTeam: 'Turquía', awayTeam: 'Suiza',
    homeFlag: 'tr', awayFlag: 'ch',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-13T18:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI3', phase: 'group', group: 'I', matchNumber: 51,
    homeTeam: 'Polonia', awayTeam: 'Turquía',
    homeFlag: 'pl', awayFlag: 'tr',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-18T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI4', phase: 'group', group: 'I', matchNumber: 52,
    homeTeam: 'Suiza', awayTeam: 'Serbia',
    homeFlag: 'ch', awayFlag: 'rs',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-18T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI5', phase: 'group', group: 'I', matchNumber: 53,
    homeTeam: 'Suiza', awayTeam: 'Polonia',
    homeFlag: 'ch', awayFlag: 'pl',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-23T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GI6', phase: 'group', group: 'I', matchNumber: 54,
    homeTeam: 'Serbia', awayTeam: 'Turquía',
    homeFlag: 'rs', awayFlag: 'tr',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-23T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO J  (Portugal 2 equipos más — ajustar al sorteo real)
  // ══════════════════════════════════
  {
    id: 'GJ1', phase: 'group', group: 'J', matchNumber: 55,
    homeTeam: 'Países Bajos', awayTeam: 'Rumania',
    homeFlag: 'nl', awayFlag: 'ro',
    venue: "Levi's Stadium", city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-14T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ2', phase: 'group', group: 'J', matchNumber: 56,
    homeTeam: 'Ucrania', awayTeam: 'Hungría',
    homeFlag: 'ua', awayFlag: 'hu',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    utcDate: '2026-06-14T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ3', phase: 'group', group: 'J', matchNumber: 57,
    homeTeam: 'Rumania', awayTeam: 'Ucrania',
    homeFlag: 'ro', awayFlag: 'ua',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-19T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ4', phase: 'group', group: 'J', matchNumber: 58,
    homeTeam: 'Hungría', awayTeam: 'Países Bajos',
    homeFlag: 'hu', awayFlag: 'nl',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-19T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ5', phase: 'group', group: 'J', matchNumber: 59,
    homeTeam: 'Hungría', awayTeam: 'Rumania',
    homeFlag: 'hu', awayFlag: 'ro',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-24T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GJ6', phase: 'group', group: 'J', matchNumber: 60,
    homeTeam: 'Ucrania', awayTeam: 'Países Bajos',
    homeFlag: 'ua', awayFlag: 'nl',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-24T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO K
  // ══════════════════════════════════
  {
    id: 'GK1', phase: 'group', group: 'K', matchNumber: 61,
    homeTeam: 'Irán', awayTeam: 'Camerún',
    homeFlag: 'ir', awayFlag: 'cm',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-06-15T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK2', phase: 'group', group: 'K', matchNumber: 62,
    homeTeam: 'Dinamarca', awayTeam: 'Nueva Zelanda',
    homeFlag: 'dk', awayFlag: 'nz',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-15T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK3', phase: 'group', group: 'K', matchNumber: 63,
    homeTeam: 'Camerún', awayTeam: 'Dinamarca',
    homeFlag: 'cm', awayFlag: 'dk',
    venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA',
    utcDate: '2026-06-20T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK4', phase: 'group', group: 'K', matchNumber: 64,
    homeTeam: 'Nueva Zelanda', awayTeam: 'Irán',
    homeFlag: 'nz', awayFlag: 'ir',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-20T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK5', phase: 'group', group: 'K', matchNumber: 65,
    homeTeam: 'Nueva Zelanda', awayTeam: 'Camerún',
    homeFlag: 'nz', awayFlag: 'cm',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    utcDate: '2026-06-25T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GK6', phase: 'group', group: 'K', matchNumber: 66,
    homeTeam: 'Irán', awayTeam: 'Dinamarca',
    homeFlag: 'ir', awayFlag: 'dk',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-25T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  GRUPO L
  // ══════════════════════════════════
  {
    id: 'GL1', phase: 'group', group: 'L', matchNumber: 67,
    homeTeam: 'Mozambique', awayTeam: 'Venezuela',
    homeFlag: 'mz', awayFlag: 've',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-16T01:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL2', phase: 'group', group: 'L', matchNumber: 68,
    homeTeam: 'Escocia', awayTeam: 'Kenia',
    homeFlag: 'gb-sct', awayFlag: 'ke',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-06-16T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL3', phase: 'group', group: 'L', matchNumber: 69,
    homeTeam: 'Venezuela', awayTeam: 'Escocia',
    homeFlag: 've', awayFlag: 'gb-sct',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-21T19:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL4', phase: 'group', group: 'L', matchNumber: 70,
    homeTeam: 'Kenia', awayTeam: 'Mozambique',
    homeFlag: 'ke', awayFlag: 'mz',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-21T22:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL5', phase: 'group', group: 'L', matchNumber: 71,
    homeTeam: 'Kenia', awayTeam: 'Venezuela',
    homeFlag: 'ke', awayFlag: 've',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-26T02:00:00Z',
    status: 'upcoming',
  },
  {
    id: 'GL6', phase: 'group', group: 'L', matchNumber: 72,
    homeTeam: 'Escocia', awayTeam: 'Mozambique',
    homeFlag: 'gb-sct', awayFlag: 'mz',
    venue: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    utcDate: '2026-06-26T02:00:00Z',
    status: 'upcoming',
  },

  // ══════════════════════════════════
  //  RONDA DE 32  (partidos 73–88)
  // ══════════════════════════════════
  { id: 'R32-1',  phase: 'round-of-32', matchNumber: 73,  homeTeam: '1º Grupo A', awayTeam: '2º Grupo B', venue: 'MetLife Stadium',   city: 'New Jersey',        country: 'USA',    utcDate: '2026-06-29T22:00:00Z' },
  { id: 'R32-2',  phase: 'round-of-32', matchNumber: 74,  homeTeam: '1º Grupo C', awayTeam: '2º Grupo D', venue: 'AT&T Stadium',      city: 'Dallas',            country: 'USA',    utcDate: '2026-06-29T19:00:00Z' },
  { id: 'R32-3',  phase: 'round-of-32', matchNumber: 75,  homeTeam: '1º Grupo E', awayTeam: '2º Grupo F', venue: 'Hard Rock Stadium', city: 'Miami',             country: 'USA',    utcDate: '2026-06-30T22:00:00Z' },
  { id: 'R32-4',  phase: 'round-of-32', matchNumber: 76,  homeTeam: '1º Grupo G', awayTeam: '2º Grupo H', venue: 'SoFi Stadium',      city: 'Los Ángeles',       country: 'USA',    utcDate: '2026-06-30T19:00:00Z' },
  { id: 'R32-5',  phase: 'round-of-32', matchNumber: 77,  homeTeam: '1º Grupo B', awayTeam: '2º Grupo A', venue: "Levi's Stadium",    city: 'San Francisco',     country: 'USA',    utcDate: '2026-07-01T22:00:00Z' },
  { id: 'R32-6',  phase: 'round-of-32', matchNumber: 78,  homeTeam: '1º Grupo D', awayTeam: '2º Grupo C', venue: 'Gillette Stadium',  city: 'Boston',            country: 'USA',    utcDate: '2026-07-01T19:00:00Z' },
  { id: 'R32-7',  phase: 'round-of-32', matchNumber: 79,  homeTeam: '1º Grupo F', awayTeam: '2º Grupo E', venue: 'BMO Field',         city: 'Toronto',           country: 'Canada', utcDate: '2026-07-02T22:00:00Z' },
  { id: 'R32-8',  phase: 'round-of-32', matchNumber: 80,  homeTeam: '1º Grupo H', awayTeam: '2º Grupo G', venue: 'BC Place',          city: 'Vancouver',         country: 'Canada', utcDate: '2026-07-02T19:00:00Z' },
  { id: 'R32-9',  phase: 'round-of-32', matchNumber: 81,  homeTeam: '1º Grupo I', awayTeam: '2º Grupo J', venue: 'Estadio Azteca',    city: 'Ciudad de México',  country: 'Mexico', utcDate: '2026-07-03T22:00:00Z' },
  { id: 'R32-10', phase: 'round-of-32', matchNumber: 82,  homeTeam: '1º Grupo K', awayTeam: '2º Grupo L', venue: 'Estadio BBVA',      city: 'Monterrey',         country: 'Mexico', utcDate: '2026-07-03T19:00:00Z' },
  { id: 'R32-11', phase: 'round-of-32', matchNumber: 83,  homeTeam: '1º Grupo J', awayTeam: '2º Grupo I', venue: 'MetLife Stadium',   city: 'New Jersey',        country: 'USA',    utcDate: '2026-07-04T22:00:00Z' },
  { id: 'R32-12', phase: 'round-of-32', matchNumber: 84,  homeTeam: '1º Grupo L', awayTeam: '2º Grupo K', venue: 'AT&T Stadium',      city: 'Dallas',            country: 'USA',    utcDate: '2026-07-04T19:00:00Z' },
  { id: 'R32-13', phase: 'round-of-32', matchNumber: 85,  homeTeam: 'TBD',        awayTeam: 'TBD',        venue: 'Hard Rock Stadium', city: 'Miami',             country: 'USA',    utcDate: '2026-07-05T22:00:00Z' },
  { id: 'R32-14', phase: 'round-of-32', matchNumber: 86,  homeTeam: 'TBD',        awayTeam: 'TBD',        venue: 'SoFi Stadium',      city: 'Los Ángeles',       country: 'USA',    utcDate: '2026-07-05T19:00:00Z' },
  { id: 'R32-15', phase: 'round-of-32', matchNumber: 87,  homeTeam: 'TBD',        awayTeam: 'TBD',        venue: "Levi's Stadium",    city: 'San Francisco',     country: 'USA',    utcDate: '2026-07-06T22:00:00Z' },
  { id: 'R32-16', phase: 'round-of-32', matchNumber: 88,  homeTeam: 'TBD',        awayTeam: 'TBD',        venue: 'Gillette Stadium',  city: 'Boston',            country: 'USA',    utcDate: '2026-07-06T19:00:00Z' },

  // ══════════════════════════════════
  //  OCTAVOS DE FINAL  (89–96)
  // ══════════════════════════════════
  { id: 'R16-1', phase: 'round-of-16', matchNumber: 89, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'MetLife Stadium',   city: 'New Jersey',  country: 'USA',    utcDate: '2026-07-09T22:00:00Z' },
  { id: 'R16-2', phase: 'round-of-16', matchNumber: 90, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'AT&T Stadium',      city: 'Dallas',      country: 'USA',    utcDate: '2026-07-09T19:00:00Z' },
  { id: 'R16-3', phase: 'round-of-16', matchNumber: 91, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami',       country: 'USA',    utcDate: '2026-07-10T22:00:00Z' },
  { id: 'R16-4', phase: 'round-of-16', matchNumber: 92, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'SoFi Stadium',      city: 'Los Ángeles', country: 'USA',    utcDate: '2026-07-10T19:00:00Z' },
  { id: 'R16-5', phase: 'round-of-16', matchNumber: 93, homeTeam: 'TBD', awayTeam: 'TBD', venue: "Levi's Stadium",    city: 'San Francisco', country: 'USA',  utcDate: '2026-07-11T22:00:00Z' },
  { id: 'R16-6', phase: 'round-of-16', matchNumber: 94, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Gillette Stadium',  city: 'Boston',      country: 'USA',    utcDate: '2026-07-11T19:00:00Z' },
  { id: 'R16-7', phase: 'round-of-16', matchNumber: 95, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'BMO Field',         city: 'Toronto',     country: 'Canada', utcDate: '2026-07-12T22:00:00Z' },
  { id: 'R16-8', phase: 'round-of-16', matchNumber: 96, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'BC Place',          city: 'Vancouver',   country: 'Canada', utcDate: '2026-07-12T19:00:00Z' },

  // ══════════════════════════════════
  //  CUARTOS DE FINAL  (97–100)
  // ══════════════════════════════════
  { id: 'QF-1', phase: 'quarter-final', matchNumber: 97,  homeTeam: 'TBD', awayTeam: 'TBD', venue: 'MetLife Stadium',   city: 'New Jersey',  country: 'USA', utcDate: '2026-07-15T22:00:00Z' },
  { id: 'QF-2', phase: 'quarter-final', matchNumber: 98,  homeTeam: 'TBD', awayTeam: 'TBD', venue: 'AT&T Stadium',      city: 'Dallas',      country: 'USA', utcDate: '2026-07-15T19:00:00Z' },
  { id: 'QF-3', phase: 'quarter-final', matchNumber: 99,  homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami',       country: 'USA', utcDate: '2026-07-16T22:00:00Z' },
  { id: 'QF-4', phase: 'quarter-final', matchNumber: 100, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'SoFi Stadium',      city: 'Los Ángeles', country: 'USA', utcDate: '2026-07-16T19:00:00Z' },

  // ══════════════════════════════════
  //  SEMIFINALES  (101–102)
  // ══════════════════════════════════
  { id: 'SF-1', phase: 'semi-final', matchNumber: 101, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'MetLife Stadium', city: 'New Jersey', country: 'USA', utcDate: '2026-07-19T22:00:00Z' },
  { id: 'SF-2', phase: 'semi-final', matchNumber: 102, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'AT&T Stadium',    city: 'Dallas',     country: 'USA', utcDate: '2026-07-20T22:00:00Z' },

  // ══════════════════════════════════
  //  TERCER LUGAR  (103)
  // ══════════════════════════════════
  { id: 'TP', phase: 'third-place', matchNumber: 103, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', utcDate: '2026-07-24T22:00:00Z' },

  // ══════════════════════════════════
  //  GRAN FINAL  (104) — MetLife Stadium, New Jersey
  // ══════════════════════════════════
  {
    id: 'FINAL', phase: 'final', matchNumber: 104,
    homeTeam: 'TBD', awayTeam: 'TBD',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-07-26T20:00:00Z',
  },
];
