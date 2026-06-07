export type Phase =
  | 'group'
  | 'round-of-32'
  | 'round-of-16'
  | 'quarter-final'
  | 'semi-final'
  | 'third-place'
  | 'final';

export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export type MatchStatus = 'upcoming' | 'live' | 'completed';

export interface Match {
  id: string;
  phase: Phase;
  group?: Group;
  matchNumber: number;
  homeTeam: string;
  awayTeam: string;
  homeFlag?: string;   // ISO 3166-1 alpha-2 lowercase, e.g. "mx"
  awayFlag?: string;
  venue: string;
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  utcDate: string;     // ISO 8601 UTC
  status?: MatchStatus;
  homeScore?: number;
  awayScore?: number;
}
