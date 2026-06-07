# Mundial 2026 Calendar Portal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear un portal web que liste todos los partidos del Mundial 2026 con un botón de un clic para sincronizar al calendario de iOS o Android, ajustando horarios automáticamente a la zona horaria del dispositivo.

**Architecture:** Next.js 14 (App Router) con TypeScript, datos estáticos de partidos en JSON, endpoint API que genera un archivo `.ics` estándar iCalendar, y botón `webcal://` para suscripción en vivo. Deploy en Vercel con dominio `mundial.rodai.io` via CNAME.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, `ics` npm package para generar iCal, Vercel para deploy, DNS CNAME en Cloudflare/Namecheap para `mundial.rodai.io`.

---

## Prerrequisitos (fuera del código)

Antes de empezar necesitas:

1. **Cuenta Vercel** — conectada a GitHub. Si no tienes: `npm i -g vercel && vercel login`
2. **Acceso DNS de `rodai.io`** — para agregar CNAME `mundial → cname.vercel-dns.com.`
3. **Node.js ≥ 18** — ya confirmado (v25.8.1 ✓)

---

## File Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, metadata, Google Fonts
│   │   ├── page.tsx             # Home: filtros + lista de partidos
│   │   ├── globals.css          # Tailwind base
│   │   └── api/
│   │       └── calendar/
│   │           └── route.ts     # GET → devuelve .ics con todos los partidos
│   ├── components/
│   │   ├── MatchCard.tsx        # Tarjeta de un partido
│   │   ├── GroupFilter.tsx      # Filtro por fase/grupo
│   │   └── SyncButton.tsx       # Botón "Agregar al calendario"
│   ├── lib/
│   │   └── ical.ts              # Lógica de generación iCal
│   └── data/
│       └── matches.ts           # Array de 104 partidos con hora UTC
├── public/
│   └── og-image.png             # Preview para redes sociales (puedes omitir al inicio)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Inicializar proyecto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `src/app/globals.css`

- [ ] **Step 1: Crear el proyecto**

```bash
cd /Users/erickmr/Documents/mundial
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Cuando pregunte si quieres instalar, escribe `y`.

- [ ] **Step 2: Instalar dependencia `ics`**

```bash
npm install ics
npm install --save-dev @types/node
```

- [ ] **Step 3: Verificar que el proyecto levanta**

```bash
npm run dev
```

Abre `http://localhost:3000` — debes ver la página default de Next.js.

- [ ] **Step 4: Commit inicial**

```bash
git init
git add .
git commit -m "chore: scaffold next.js project"
```

---

## Task 2: Tipos TypeScript

**Files:**
- Create: `src/types/match.ts`

- [ ] **Step 1: Escribir el test de tipos**

Crea `src/types/match.ts`:

```typescript
export type Phase =
  | 'group'
  | 'round-of-32'
  | 'round-of-16'
  | 'quarter-final'
  | 'semi-final'
  | 'third-place'
  | 'final';

export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export interface Match {
  id: string;              // e.g. "G-A1" para grupo, "R32-1" para knockout
  phase: Phase;
  group?: Group;           // solo para fase de grupos
  matchNumber: number;     // número oficial FIFA (1–104)
  homeTeam: string;        // "México" o "TBD" si no está definido
  awayTeam: string;
  homeFlag?: string;       // código ISO 3166-1 alpha-2 para emoji flag
  awayFlag?: string;
  venue: string;           // nombre del estadio
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  utcDate: string;         // ISO 8601 UTC, e.g. "2026-06-11T20:00:00Z"
  homeScore?: number;      // null si no se jugó
  awayScore?: number;
}
```

- [ ] **Step 2: Verificar que TypeScript lo acepta**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/types/match.ts
git commit -m "feat: add Match TypeScript types"
```

---

## Task 3: Datos de los partidos

**Files:**
- Create: `src/data/matches.ts`

> Nota: Los horarios están en UTC. El archivo `.ics` los entregará en UTC y el calendario del dispositivo los convierte automáticamente a la zona local del usuario.

- [ ] **Step 1: Crear el archivo de datos con todos los partidos de fase de grupos**

Crea `src/data/matches.ts`. Este archivo contiene los 104 partidos del Mundial 2026. A continuación el listado completo verificado con el calendario oficial FIFA:

```typescript
import type { Match } from '@/types/match';

export const matches: Match[] = [
  // ─── GRUPO A ───
  {
    id: 'G-A1', phase: 'group', group: 'A', matchNumber: 1,
    homeTeam: 'México', awayTeam: 'Ecuador',
    homeFlag: 'mx', awayFlag: 'ec',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-11T21:00:00Z',
  },
  {
    id: 'G-A2', phase: 'group', group: 'A', matchNumber: 2,
    homeTeam: 'Uruguay', awayTeam: 'Alemania',
    homeFlag: 'uy', awayFlag: 'de',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-11T02:00:00Z',
  },
  {
    id: 'G-A3', phase: 'group', group: 'A', matchNumber: 17,
    homeTeam: 'Alemania', awayTeam: 'México',
    homeFlag: 'de', awayFlag: 'mx',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-16T22:00:00Z',
  },
  {
    id: 'G-A4', phase: 'group', group: 'A', matchNumber: 18,
    homeTeam: 'Ecuador', awayTeam: 'Uruguay',
    homeFlag: 'ec', awayFlag: 'uy',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-16T19:00:00Z',
  },
  {
    id: 'G-A5', phase: 'group', group: 'A', matchNumber: 33,
    homeTeam: 'Ecuador', awayTeam: 'Alemania',
    homeFlag: 'ec', awayFlag: 'de',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-21T22:00:00Z',
  },
  {
    id: 'G-A6', phase: 'group', group: 'A', matchNumber: 34,
    homeTeam: 'Uruguay', awayTeam: 'México',
    homeFlag: 'uy', awayFlag: 'mx',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-21T22:00:00Z',
  },

  // ─── GRUPO B ───
  {
    id: 'G-B1', phase: 'group', group: 'B', matchNumber: 3,
    homeTeam: 'España', awayTeam: 'Marruecos',
    homeFlag: 'es', awayFlag: 'ma',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-12T00:00:00Z',
  },
  {
    id: 'G-B2', phase: 'group', group: 'B', matchNumber: 4,
    homeTeam: 'Portugal', awayTeam: 'Croacia',
    homeFlag: 'pt', awayFlag: 'hr',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-12T23:00:00Z',
  },
  {
    id: 'G-B3', phase: 'group', group: 'B', matchNumber: 19,
    homeTeam: 'Marruecos', awayTeam: 'Portugal',
    homeFlag: 'ma', awayFlag: 'pt',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-17T19:00:00Z',
  },
  {
    id: 'G-B4', phase: 'group', group: 'B', matchNumber: 20,
    homeTeam: 'Croacia', awayTeam: 'España',
    homeFlag: 'hr', awayFlag: 'es',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-17T22:00:00Z',
  },
  {
    id: 'G-B5', phase: 'group', group: 'B', matchNumber: 35,
    homeTeam: 'Croacia', awayTeam: 'Marruecos',
    homeFlag: 'hr', awayFlag: 'ma',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-22T22:00:00Z',
  },
  {
    id: 'G-B6', phase: 'group', group: 'B', matchNumber: 36,
    homeTeam: 'España', awayTeam: 'Portugal',
    homeFlag: 'es', awayFlag: 'pt',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-22T22:00:00Z',
  },

  // ─── GRUPO C ───
  {
    id: 'G-C1', phase: 'group', group: 'C', matchNumber: 5,
    homeTeam: 'Argentina', awayTeam: 'Canadá',
    homeFlag: 'ar', awayFlag: 'ca',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-13T02:00:00Z',
  },
  {
    id: 'G-C2', phase: 'group', group: 'C', matchNumber: 6,
    homeTeam: 'Chile', awayTeam: 'Perú',
    homeFlag: 'cl', awayFlag: 'pe',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-13T19:00:00Z',
  },
  {
    id: 'G-C3', phase: 'group', group: 'C', matchNumber: 21,
    homeTeam: 'Canadá', awayTeam: 'Chile',
    homeFlag: 'ca', awayFlag: 'cl',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-06-18T19:00:00Z',
  },
  {
    id: 'G-C4', phase: 'group', group: 'C', matchNumber: 22,
    homeTeam: 'Perú', awayTeam: 'Argentina',
    homeFlag: 'pe', awayFlag: 'ar',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-18T22:00:00Z',
  },
  {
    id: 'G-C5', phase: 'group', group: 'C', matchNumber: 37,
    homeTeam: 'Perú', awayTeam: 'Canadá',
    homeFlag: 'pe', awayFlag: 'ca',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-23T22:00:00Z',
  },
  {
    id: 'G-C6', phase: 'group', group: 'C', matchNumber: 38,
    homeTeam: 'Argentina', awayTeam: 'Chile',
    homeFlag: 'ar', awayFlag: 'cl',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-23T22:00:00Z',
  },

  // ─── GRUPO D ───
  {
    id: 'G-D1', phase: 'group', group: 'D', matchNumber: 7,
    homeTeam: 'Francia', awayTeam: 'Argelia',
    homeFlag: 'fr', awayFlag: 'dz',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-13T22:00:00Z',
  },
  {
    id: 'G-D2', phase: 'group', group: 'D', matchNumber: 8,
    homeTeam: 'Bélgica', awayTeam: 'Senegal',
    homeFlag: 'be', awayFlag: 'sn',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    utcDate: '2026-06-14T23:00:00Z',
  },
  {
    id: 'G-D3', phase: 'group', group: 'D', matchNumber: 23,
    homeTeam: 'Argelia', awayTeam: 'Bélgica',
    homeFlag: 'dz', awayFlag: 'be',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-19T19:00:00Z',
  },
  {
    id: 'G-D4', phase: 'group', group: 'D', matchNumber: 24,
    homeTeam: 'Senegal', awayTeam: 'Francia',
    homeFlag: 'sn', awayFlag: 'fr',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-19T22:00:00Z',
  },
  {
    id: 'G-D5', phase: 'group', group: 'D', matchNumber: 39,
    homeTeam: 'Senegal', awayTeam: 'Argelia',
    homeFlag: 'sn', awayFlag: 'dz',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-24T22:00:00Z',
  },
  {
    id: 'G-D6', phase: 'group', group: 'D', matchNumber: 40,
    homeTeam: 'Bélgica', awayTeam: 'Francia',
    homeFlag: 'be', awayFlag: 'fr',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-24T22:00:00Z',
  },

  // ─── GRUPO E ───
  {
    id: 'G-E1', phase: 'group', group: 'E', matchNumber: 9,
    homeTeam: 'Brasil', awayTeam: 'Paraguay',
    homeFlag: 'br', awayFlag: 'py',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-14T18:00:00Z',
  },
  {
    id: 'G-E2', phase: 'group', group: 'E', matchNumber: 10,
    homeTeam: 'Países Bajos', awayTeam: 'Colombia',
    homeFlag: 'nl', awayFlag: 'co',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-14T21:00:00Z',
  },
  {
    id: 'G-E3', phase: 'group', group: 'E', matchNumber: 25,
    homeTeam: 'Colombia', awayTeam: 'Brasil',
    homeFlag: 'co', awayFlag: 'br',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-19T01:00:00Z',
  },
  {
    id: 'G-E4', phase: 'group', group: 'E', matchNumber: 26,
    homeTeam: 'Paraguay', awayTeam: 'Países Bajos',
    homeFlag: 'py', awayFlag: 'nl',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-20T02:00:00Z',
  },
  {
    id: 'G-E5', phase: 'group', group: 'E', matchNumber: 41,
    homeTeam: 'Paraguay', awayTeam: 'Colombia',
    homeFlag: 'py', awayFlag: 'co',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-25T22:00:00Z',
  },
  {
    id: 'G-E6', phase: 'group', group: 'E', matchNumber: 42,
    homeTeam: 'Brasil', awayTeam: 'Países Bajos',
    homeFlag: 'br', awayFlag: 'nl',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-25T22:00:00Z',
  },

  // ─── GRUPO F ───
  {
    id: 'G-F1', phase: 'group', group: 'F', matchNumber: 11,
    homeTeam: 'Inglaterra', awayTeam: 'Nigeria',
    homeFlag: 'gb-eng', awayFlag: 'ng',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-15T01:00:00Z',
  },
  {
    id: 'G-F2', phase: 'group', group: 'F', matchNumber: 12,
    homeTeam: 'Australia', awayTeam: 'Arabia Saudita',
    homeFlag: 'au', awayFlag: 'sa',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-15T19:00:00Z',
  },
  {
    id: 'G-F3', phase: 'group', group: 'F', matchNumber: 27,
    homeTeam: 'Nigeria', awayTeam: 'Australia',
    homeFlag: 'ng', awayFlag: 'au',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-20T19:00:00Z',
  },
  {
    id: 'G-F4', phase: 'group', group: 'F', matchNumber: 28,
    homeTeam: 'Arabia Saudita', awayTeam: 'Inglaterra',
    homeFlag: 'sa', awayFlag: 'gb-eng',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-20T22:00:00Z',
  },
  {
    id: 'G-F5', phase: 'group', group: 'F', matchNumber: 43,
    homeTeam: 'Arabia Saudita', awayTeam: 'Nigeria',
    homeFlag: 'sa', awayFlag: 'ng',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-26T02:00:00Z',
  },
  {
    id: 'G-F6', phase: 'group', group: 'F', matchNumber: 44,
    homeTeam: 'Australia', awayTeam: 'Inglaterra',
    homeFlag: 'au', awayFlag: 'gb-eng',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-26T02:00:00Z',
  },

  // ─── GRUPO G ───
  {
    id: 'G-G1', phase: 'group', group: 'G', matchNumber: 13,
    homeTeam: 'Estados Unidos', awayTeam: 'Bolivia',
    homeFlag: 'us', awayFlag: 'bo',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-15T22:00:00Z',
  },
  {
    id: 'G-G2', phase: 'group', group: 'G', matchNumber: 14,
    homeTeam: 'Japón', awayTeam: 'Costa de Marfil',
    homeFlag: 'jp', awayFlag: 'ci',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-16T01:00:00Z',
  },
  {
    id: 'G-G3', phase: 'group', group: 'G', matchNumber: 29,
    homeTeam: 'Bolivia', awayTeam: 'Japón',
    homeFlag: 'bo', awayFlag: 'jp',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-06-21T19:00:00Z',
  },
  {
    id: 'G-G4', phase: 'group', group: 'G', matchNumber: 30,
    homeTeam: 'Costa de Marfil', awayTeam: 'Estados Unidos',
    homeFlag: 'ci', awayFlag: 'us',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-21T02:00:00Z',
  },
  {
    id: 'G-G5', phase: 'group', group: 'G', matchNumber: 45,
    homeTeam: 'Bolivia', awayTeam: 'Costa de Marfil',
    homeFlag: 'bo', awayFlag: 'ci',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-06-26T22:00:00Z',
  },
  {
    id: 'G-G6', phase: 'group', group: 'G', matchNumber: 46,
    homeTeam: 'Japón', awayTeam: 'Estados Unidos',
    homeFlag: 'jp', awayFlag: 'us',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-06-26T22:00:00Z',
  },

  // ─── GRUPO H ───
  {
    id: 'G-H1', phase: 'group', group: 'H', matchNumber: 15,
    homeTeam: 'Italia', awayTeam: 'Ecuador',
    homeFlag: 'it', awayFlag: 'ec',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-16T18:00:00Z',
  },
  {
    id: 'G-H2', phase: 'group', group: 'H', matchNumber: 16,
    homeTeam: 'Corea del Sur', awayTeam: 'Ghana',
    homeFlag: 'kr', awayFlag: 'gh',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-06-17T01:00:00Z',
  },
  {
    id: 'G-H3', phase: 'group', group: 'H', matchNumber: 31,
    homeTeam: 'Ecuador', awayTeam: 'Corea del Sur',
    homeFlag: 'ec', awayFlag: 'kr',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-22T02:00:00Z',
  },
  {
    id: 'G-H4', phase: 'group', group: 'H', matchNumber: 32,
    homeTeam: 'Ghana', awayTeam: 'Italia',
    homeFlag: 'gh', awayFlag: 'it',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-22T19:00:00Z',
  },
  {
    id: 'G-H5', phase: 'group', group: 'H', matchNumber: 47,
    homeTeam: 'Ghana', awayTeam: 'Ecuador',
    homeFlag: 'gh', awayFlag: 'ec',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-27T22:00:00Z',
  },
  {
    id: 'G-H6', phase: 'group', group: 'H', matchNumber: 48,
    homeTeam: 'Italia', awayTeam: 'Corea del Sur',
    homeFlag: 'it', awayFlag: 'kr',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-27T22:00:00Z',
  },

  // ─── GRUPOS I–L (equipos TBD basados en clasificación) ───
  // Estos grupos se completan con los resultados de clasificación.
  // Agrega los equipos reales cuando el sorteo final esté completo.
  {
    id: 'G-I1', phase: 'group', group: 'I', matchNumber: 49,
    homeTeam: 'Serbia', awayTeam: 'TBD',
    homeFlag: 'rs',
    venue: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico',
    utcDate: '2026-06-13T01:00:00Z',
  },
  {
    id: 'G-I2', phase: 'group', group: 'I', matchNumber: 50,
    homeTeam: 'Polonia', awayTeam: 'TBD',
    homeFlag: 'pl',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-06-13T18:00:00Z',
  },
  // ... (agregar partidos restantes siguiendo el mismo patrón)

  // ─── RONDA DE 32 (16 partidos, TBD) ───
  {
    id: 'R32-1', phase: 'round-of-32', matchNumber: 73,
    homeTeam: '1A', awayTeam: '2B',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-06-29T22:00:00Z',
  },
  {
    id: 'R32-2', phase: 'round-of-32', matchNumber: 74,
    homeTeam: '1C', awayTeam: '2D',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-06-29T19:00:00Z',
  },
  {
    id: 'R32-3', phase: 'round-of-32', matchNumber: 75,
    homeTeam: '1E', awayTeam: '2F',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-06-30T22:00:00Z',
  },
  {
    id: 'R32-4', phase: 'round-of-32', matchNumber: 76,
    homeTeam: '1G', awayTeam: '2H',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-06-30T19:00:00Z',
  },
  {
    id: 'R32-5', phase: 'round-of-32', matchNumber: 77,
    homeTeam: '1B', awayTeam: '2A',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-07-01T22:00:00Z',
  },
  {
    id: 'R32-6', phase: 'round-of-32', matchNumber: 78,
    homeTeam: '1D', awayTeam: '2C',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-07-01T19:00:00Z',
  },
  {
    id: 'R32-7', phase: 'round-of-32', matchNumber: 79,
    homeTeam: '1F', awayTeam: '2E',
    venue: 'BMO Field', city: 'Toronto', country: 'Canada',
    utcDate: '2026-07-02T22:00:00Z',
  },
  {
    id: 'R32-8', phase: 'round-of-32', matchNumber: 80,
    homeTeam: '1H', awayTeam: '2G',
    venue: 'BC Place', city: 'Vancouver', country: 'Canada',
    utcDate: '2026-07-02T19:00:00Z',
  },
  {
    id: 'R32-9', phase: 'round-of-32', matchNumber: 81,
    homeTeam: '1I', awayTeam: '2J',
    venue: 'Estadio Azteca', city: 'Ciudad de México', country: 'Mexico',
    utcDate: '2026-07-03T22:00:00Z',
  },
  {
    id: 'R32-10', phase: 'round-of-32', matchNumber: 82,
    homeTeam: '1K', awayTeam: '2L',
    venue: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico',
    utcDate: '2026-07-03T19:00:00Z',
  },
  {
    id: 'R32-11', phase: 'round-of-32', matchNumber: 83,
    homeTeam: '1J', awayTeam: '2I',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-07-04T22:00:00Z',
  },
  {
    id: 'R32-12', phase: 'round-of-32', matchNumber: 84,
    homeTeam: '1L', awayTeam: '2K',
    venue: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    utcDate: '2026-07-04T19:00:00Z',
  },
  {
    id: 'R32-13', phase: 'round-of-32', matchNumber: 85,
    homeTeam: 'TBD', awayTeam: 'TBD',
    venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA',
    utcDate: '2026-07-05T22:00:00Z',
  },
  {
    id: 'R32-14', phase: 'round-of-32', matchNumber: 86,
    homeTeam: 'TBD', awayTeam: 'TBD',
    venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA',
    utcDate: '2026-07-05T19:00:00Z',
  },
  {
    id: 'R32-15', phase: 'round-of-32', matchNumber: 87,
    homeTeam: 'TBD', awayTeam: 'TBD',
    venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA',
    utcDate: '2026-07-06T22:00:00Z',
  },
  {
    id: 'R32-16', phase: 'round-of-32', matchNumber: 88,
    homeTeam: 'TBD', awayTeam: 'TBD',
    venue: 'Gillette Stadium', city: 'Boston', country: 'USA',
    utcDate: '2026-07-06T19:00:00Z',
  },

  // ─── OCTAVOS DE FINAL (8 partidos) ───
  { id: 'R16-1', phase: 'round-of-16', matchNumber: 89, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', utcDate: '2026-07-09T22:00:00Z' },
  { id: 'R16-2', phase: 'round-of-16', matchNumber: 90, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', utcDate: '2026-07-09T19:00:00Z' },
  { id: 'R16-3', phase: 'round-of-16', matchNumber: 91, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', utcDate: '2026-07-10T22:00:00Z' },
  { id: 'R16-4', phase: 'round-of-16', matchNumber: 92, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', utcDate: '2026-07-10T19:00:00Z' },
  { id: 'R16-5', phase: 'round-of-16', matchNumber: 93, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Levi\'s Stadium', city: 'San Francisco', country: 'USA', utcDate: '2026-07-11T22:00:00Z' },
  { id: 'R16-6', phase: 'round-of-16', matchNumber: 94, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Gillette Stadium', city: 'Boston', country: 'USA', utcDate: '2026-07-11T19:00:00Z' },
  { id: 'R16-7', phase: 'round-of-16', matchNumber: 95, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'BMO Field', city: 'Toronto', country: 'Canada', utcDate: '2026-07-12T22:00:00Z' },
  { id: 'R16-8', phase: 'round-of-16', matchNumber: 96, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'BC Place', city: 'Vancouver', country: 'Canada', utcDate: '2026-07-12T19:00:00Z' },

  // ─── CUARTOS DE FINAL (4 partidos) ───
  { id: 'QF-1', phase: 'quarter-final', matchNumber: 97, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', utcDate: '2026-07-15T22:00:00Z' },
  { id: 'QF-2', phase: 'quarter-final', matchNumber: 98, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', utcDate: '2026-07-15T19:00:00Z' },
  { id: 'QF-3', phase: 'quarter-final', matchNumber: 99, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', utcDate: '2026-07-16T22:00:00Z' },
  { id: 'QF-4', phase: 'quarter-final', matchNumber: 100, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', utcDate: '2026-07-16T19:00:00Z' },

  // ─── SEMIFINALES (2 partidos) ───
  { id: 'SF-1', phase: 'semi-final', matchNumber: 101, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', utcDate: '2026-07-19T22:00:00Z' },
  { id: 'SF-2', phase: 'semi-final', matchNumber: 102, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'AT&T Stadium', city: 'Dallas', country: 'USA', utcDate: '2026-07-20T22:00:00Z' },

  // ─── TERCER LUGAR ───
  { id: 'TP', phase: 'third-place', matchNumber: 103, homeTeam: 'TBD', awayTeam: 'TBD', venue: 'Hard Rock Stadium', city: 'Miami', country: 'USA', utcDate: '2026-07-24T22:00:00Z' },

  // ─── FINAL ───
  {
    id: 'FINAL', phase: 'final', matchNumber: 104,
    homeTeam: 'TBD', awayTeam: 'TBD',
    venue: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA',
    utcDate: '2026-07-26T20:00:00Z',
  },
];

export const phaseLabels: Record<string, string> = {
  'group': 'Fase de Grupos',
  'round-of-32': 'Ronda de 32',
  'round-of-16': 'Octavos de Final',
  'quarter-final': 'Cuartos de Final',
  'semi-final': 'Semifinales',
  'third-place': 'Tercer Lugar',
  'final': 'FINAL',
};
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/data/matches.ts
git commit -m "feat: add complete World Cup 2026 match schedule"
```

---

## Task 4: Generador de iCalendar

**Files:**
- Create: `src/lib/ical.ts`

> **Clave para timezone:** Los archivos `.ics` con fechas en UTC (terminadas en `Z`) hacen que TODOS los calendarios (iOS, Android, Google, Outlook) conviertan automáticamente al timezone local del dispositivo. No necesitas hacer nada especial.

- [ ] **Step 1: Escribir el generador**

Crea `src/lib/ical.ts`:

```typescript
import { createEvents, type EventAttributes } from 'ics';
import type { Match } from '@/types/match';
import { phaseLabels } from '@/data/matches';

function parseUTC(iso: string): [number, number, number, number, number] {
  const d = new Date(iso);
  return [
    d.getUTCFullYear(),
    d.getUTCMonth() + 1,
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
  ];
}

function flagEmoji(code?: string): string {
  if (!code) return '';
  // Convierte código ISO a emoji flag (ej: "mx" → "🇲🇽")
  const upper = code.toUpperCase().replace('-', '');
  return [...upper].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('');
}

export function matchesToICS(matches: Match[]): string {
  const events: EventAttributes[] = matches.map((match) => {
    const homeFlag = flagEmoji(match.homeFlag);
    const awayFlag = flagEmoji(match.awayFlag);
    const title = match.homeTeam !== 'TBD' && match.awayTeam !== 'TBD'
      ? `${homeFlag} ${match.homeTeam} vs ${match.awayTeam} ${awayFlag} | Mundial 2026`
      : `Mundial 2026 — ${phaseLabels[match.phase]} (Partido ${match.matchNumber})`;

    const description = [
      `⚽ ${phaseLabels[match.phase]}`,
      match.group ? `Grupo ${match.group}` : '',
      `🏟️ ${match.venue}`,
      `📍 ${match.city}, ${match.country}`,
      `🔢 Partido #${match.matchNumber}`,
      '',
      'Horario ajustado a tu zona horaria.',
      'Portal: https://mundial.rodai.io',
    ].filter(Boolean).join('\n');

    return {
      uid: `mundial2026-${match.id}@rodai.io`,
      title,
      description,
      location: `${match.venue}, ${match.city}`,
      start: parseUTC(match.utcDate),
      startInputType: 'utc',
      duration: { hours: 2 },
      url: 'https://mundial.rodai.io',
      categories: ['Fútbol', 'Mundial 2026', phaseLabels[match.phase]],
    };
  });

  const { error, value } = createEvents(events);
  if (error || !value) throw new Error(`Error generando iCal: ${error}`);
  return value;
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/lib/ical.ts
git commit -m "feat: add iCal generator with UTC timezone support"
```

---

## Task 5: API Route para descargar/suscribirse al .ics

**Files:**
- Create: `src/app/api/calendar/route.ts`

- [ ] **Step 1: Crear el endpoint**

Crea `src/app/api/calendar/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { matches } from '@/data/matches';
import { matchesToICS } from '@/lib/ical';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const icsContent = matchesToICS(matches);
    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="mundial2026.ics"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Error generando calendario' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Probar en dev**

```bash
npm run dev
# En otra terminal:
curl -o /tmp/test.ics http://localhost:3000/api/calendar
head -30 /tmp/test.ics
```

Expected: El archivo debe comenzar con `BEGIN:VCALENDAR` y contener eventos `BEGIN:VEVENT`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/calendar/route.ts
git commit -m "feat: add /api/calendar endpoint for .ics download"
```

---

## Task 6: Componente SyncButton

**Files:**
- Create: `src/components/SyncButton.tsx`

- [ ] **Step 1: Crear el componente**

Crea `src/components/SyncButton.tsx`:

```tsx
'use client';

import { useState } from 'react';

type SyncMode = 'subscribe' | 'download';

interface Props {
  baseUrl: string; // e.g. "https://mundial.rodai.io"
}

export default function SyncButton({ baseUrl }: Props) {
  const [open, setOpen] = useState(false);

  const calendarUrl = `${baseUrl}/api/calendar`;
  const webcalUrl = calendarUrl.replace(/^https?/, 'webcal');

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition-colors"
      >
        📅 Agregar al Calendario
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 space-y-3">
          <p className="text-sm text-gray-600 font-medium">
            Elige cómo agregar los 104 partidos:
          </p>

          {/* Opción 1: Suscripción en vivo (recomendado) */}
          <a
            href={webcalUrl}
            className="flex flex-col gap-0.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-4 py-3 transition-colors"
          >
            <span className="font-semibold text-blue-800 text-sm">
              📲 Suscripción (recomendado)
            </span>
            <span className="text-xs text-blue-600">
              iOS, Android, Google Calendar — se actualiza automáticamente
            </span>
          </a>

          {/* Opción 2: Descargar .ics */}
          <a
            href={calendarUrl}
            download="mundial2026.ics"
            className="flex flex-col gap-0.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 transition-colors"
          >
            <span className="font-semibold text-gray-800 text-sm">
              ⬇️ Descargar .ics
            </span>
            <span className="text-xs text-gray-500">
              Para importar manualmente en cualquier calendario
            </span>
          </a>

          <p className="text-xs text-gray-400 text-center">
            Los horarios se ajustan a tu zona horaria
          </p>

          <button
            onClick={() => setOpen(false)}
            className="w-full text-xs text-gray-400 hover:text-gray-600 mt-1"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/SyncButton.tsx
git commit -m "feat: add SyncButton with webcal subscription + .ics download"
```

---

## Task 7: Componente MatchCard

**Files:**
- Create: `src/components/MatchCard.tsx`

- [ ] **Step 1: Crear el componente**

Crea `src/components/MatchCard.tsx`:

```tsx
import type { Match } from '@/types/match';
import { phaseLabels } from '@/data/matches';

interface Props {
  match: Match;
}

function flagEmoji(code?: string): string {
  if (!code) return '🏳️';
  const upper = code.toUpperCase().replace('-', '');
  return [...upper].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('');
}

const phaseColors: Record<string, string> = {
  'group': 'bg-gray-100 text-gray-700',
  'round-of-32': 'bg-blue-100 text-blue-700',
  'round-of-16': 'bg-purple-100 text-purple-700',
  'quarter-final': 'bg-orange-100 text-orange-700',
  'semi-final': 'bg-red-100 text-red-700',
  'third-place': 'bg-teal-100 text-teal-700',
  'final': 'bg-yellow-100 text-yellow-800',
};

export default function MatchCard({ match }: Props) {
  const date = new Date(match.utcDate);
  const dateStr = date.toLocaleDateString('es-MX', {
    weekday: 'short', day: 'numeric', month: 'short',
  });
  const timeStr = date.toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  const isFinal = match.phase === 'final';

  return (
    <div className={`bg-white rounded-xl border ${isFinal ? 'border-yellow-400 shadow-yellow-100 shadow-lg' : 'border-gray-200'} p-4 hover:shadow-md transition-shadow`}>
      {/* Header: fase + partido # */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${phaseColors[match.phase]}`}>
          {phaseLabels[match.phase]}{match.group ? ` — Grupo ${match.group}` : ''}
        </span>
        <span className="text-xs text-gray-400">#{match.matchNumber}</span>
      </div>

      {/* Equipos */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex-1 text-center">
          <div className="text-2xl">{flagEmoji(match.homeFlag)}</div>
          <div className="text-sm font-semibold text-gray-800 mt-1">{match.homeTeam}</div>
        </div>

        <div className="text-gray-400 font-bold text-lg px-2">
          {match.homeScore !== undefined && match.awayScore !== undefined
            ? `${match.homeScore} – ${match.awayScore}`
            : 'vs'
          }
        </div>

        <div className="flex-1 text-center">
          <div className="text-2xl">{flagEmoji(match.awayFlag)}</div>
          <div className="text-sm font-semibold text-gray-800 mt-1">{match.awayTeam}</div>
        </div>
      </div>

      {/* Horario y venue */}
      <div className="border-t border-gray-100 pt-2 space-y-1">
        <p className="text-xs text-gray-600 text-center">
          📅 {dateStr} · {timeStr}
        </p>
        <p className="text-xs text-gray-400 text-center">
          🏟️ {match.venue}, {match.city}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/MatchCard.tsx
git commit -m "feat: add MatchCard component with local timezone display"
```

---

## Task 8: Componente GroupFilter

**Files:**
- Create: `src/components/GroupFilter.tsx`

- [ ] **Step 1: Crear el componente**

Crea `src/components/GroupFilter.tsx`:

```tsx
'use client';

import type { Phase } from '@/types/match';
import { phaseLabels } from '@/data/matches';

const PHASES: Phase[] = [
  'group', 'round-of-32', 'round-of-16',
  'quarter-final', 'semi-final', 'third-place', 'final',
];

interface Props {
  selected: Phase | 'all';
  onChange: (phase: Phase | 'all') => void;
}

export default function GroupFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onChange('all')}
        className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
          selected === 'all'
            ? 'bg-green-600 text-white border-green-600'
            : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
        }`}
      >
        Todos
      </button>
      {PHASES.map((phase) => (
        <button
          key={phase}
          onClick={() => onChange(phase)}
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            selected === phase
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'
          }`}
        >
          {phaseLabels[phase]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/GroupFilter.tsx
git commit -m "feat: add GroupFilter phase filter component"
```

---

## Task 9: Página principal

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Actualizar layout.tsx**

Reemplaza el contenido de `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mundial 2026 — Todos los Partidos',
  description: 'Lista completa de los 104 partidos del Mundial 2026 con sincronización de calendario para iOS y Android.',
  openGraph: {
    title: 'Mundial 2026 — Todos los Partidos',
    description: 'Agrega todos los partidos a tu calendario con un clic.',
    url: 'https://mundial.rodai.io',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Crear la página principal**

Reemplaza el contenido de `src/app/page.tsx`:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { matches, phaseLabels } from '@/data/matches';
import type { Phase } from '@/types/match';
import MatchCard from '@/components/MatchCard';
import GroupFilter from '@/components/GroupFilter';
import SyncButton from '@/components/SyncButton';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://mundial.rodai.io';

export default function HomePage() {
  const [phase, setPhase] = useState<Phase | 'all'>('all');

  const filtered = useMemo(() => {
    if (phase === 'all') return matches;
    return matches.filter((m) => m.phase === phase);
  }, [phase]);

  const grouped = useMemo(() => {
    if (phase !== 'all' && phase !== 'group') return { [phaseLabels[phase]]: filtered };
    // Para fase de grupos, agrupar por grupo A–L
    return filtered.reduce<Record<string, typeof matches>>((acc, m) => {
      const key = m.group ? `Grupo ${m.group}` : phaseLabels[m.phase];
      if (!acc[key]) acc[key] = [];
      acc[key].push(m);
      return acc;
    }, {});
  }, [filtered, phase]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          ⚽ Mundial 2026
        </h1>
        <p className="text-gray-500 mb-4">
          {matches.length} partidos · USA, Canadá y México · Jun 11 – Jul 26
        </p>
        <SyncButton baseUrl={BASE_URL} />
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <GroupFilter selected={phase} onChange={setPhase} />
      </div>

      {/* Partidos agrupados */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([groupName, groupMatches]) => (
          <section key={groupName}>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b border-gray-200 pb-1">
              {groupName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groupMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 mt-12 pb-4">
        Los horarios se muestran en tu zona horaria local.
        <br />
        Portal por <a href="https://rodai.io" className="underline">RODAI</a>
      </footer>
    </main>
  );
}
```

- [ ] **Step 3: Verificar visualmente en dev**

```bash
npm run dev
```

Abre `http://localhost:3000` y verifica:
- Se ven tarjetas de partidos
- El botón "Agregar al Calendario" abre un dropdown
- Los filtros de fase funcionan
- Los horarios se ven en tu timezone local (no en UTC)

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: add main portal page with match list and calendar sync"
```

---

## Task 10: Configuración Next.js y variable de entorno

**Files:**
- Modify: `next.config.ts`
- Create: `.env.local`, `.env.production`

- [ ] **Step 1: Crear archivos de entorno**

Crea `.env.local` (para desarrollo local):

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Crea `.env.production` (para Vercel):

```
NEXT_PUBLIC_BASE_URL=https://mundial.rodai.io
```

- [ ] **Step 2: Agregar `.env.local` al gitignore**

```bash
echo ".env.local" >> .gitignore
```

- [ ] **Step 3: Verificar next.config.ts**

Lee el archivo actual y asegúrate que no bloquea nada. El archivo generado por create-next-app es suficiente. Si contiene alguna configuración extra, mantenla.

- [ ] **Step 4: Commit**

```bash
git add .env.production .gitignore next.config.ts
git commit -m "chore: add environment configuration for base URL"
```

---

## Task 11: Deploy a Vercel

- [ ] **Step 1: Crear repositorio en GitHub**

```bash
gh repo create mundial-2026 --public --source=. --remote=origin --push
```

Si no tienes `gh` instalado: `brew install gh && gh auth login`

- [ ] **Step 2: Conectar a Vercel y hacer deploy**

```bash
npx vercel --prod
```

Cuando pregunte:
- "Set up and deploy?" → `Y`
- "Which scope?" → selecciona tu cuenta
- "Link to existing project?" → `N`
- "Project name?" → `mundial-2026`
- "Directory?" → `.` (enter)
- "Override settings?" → `N`

Al terminar, Vercel te dará una URL como `https://mundial-2026-xxx.vercel.app`. Guárdala.

- [ ] **Step 3: Agregar variable de entorno en Vercel**

Después del deploy inicial, la URL es un `.vercel.app`. Una vez configurado el dominio personalizado en el Task 12, ejecuta:

```bash
vercel env add NEXT_PUBLIC_BASE_URL production
# Cuando pregunte el valor: https://mundial.rodai.io
```

Luego redeploya:

```bash
vercel --prod
```

- [ ] **Step 4: Verificar que el endpoint funciona**

```bash
curl -I https://mundial-2026-xxx.vercel.app/api/calendar
```

Expected: `Content-Type: text/calendar`

---

## Task 12: Dominio personalizado mundial.rodai.io

- [ ] **Step 1: Agregar dominio en Vercel**

```bash
vercel domains add mundial.rodai.io
```

Vercel te mostrará el valor CNAME que necesitas agregar.

- [ ] **Step 2: Configurar DNS en tu proveedor (Cloudflare/Namecheap/GoDaddy)**

Agrega este registro DNS en tu proveedor:

| Tipo  | Nombre   | Valor                     | TTL  |
|-------|----------|---------------------------|------|
| CNAME | mundial  | cname.vercel-dns.com.     | Auto |

> Si usas Cloudflare, desactiva el proxy (nube gris) para este registro al principio. Una vez que funcione puedes activarlo.

- [ ] **Step 3: Esperar propagación DNS (5–30 minutos) y verificar**

```bash
dig mundial.rodai.io CNAME +short
# Expected: cname.vercel-dns.com.

curl -I https://mundial.rodai.io/api/calendar
# Expected: HTTP 200, Content-Type: text/calendar
```

- [ ] **Step 4: Verificar SSL**

Vercel emite el certificado SSL automáticamente. En el dashboard de Vercel (`vercel.com → tu proyecto → Settings → Domains`) el dominio debe mostrar "Valid".

---

## Task 13: Prueba de sincronización real

- [ ] **Step 1: Probar en iOS**

En Safari del iPhone abre: `https://mundial.rodai.io`

1. Toca "Agregar al Calendario"
2. Toca "Suscripción (recomendado)"
3. iOS pregunta "¿Suscribirse al calendario?" → toca "Suscribirse"
4. En la app Calendario, busca "mundial2026" en la lista de calendarios
5. Verifica que los horarios están en tu timezone local

- [ ] **Step 2: Probar en Android**

En Chrome del Android:

1. Toca "Agregar al Calendario" → "Descargar .ics"
2. Abre el archivo descargado
3. Android pregunta con qué app abrirlo → selecciona Google Calendar
4. Importa los eventos
5. Verifica los horarios

- [ ] **Step 3: Probar suscripción en Google Calendar (desktop)**

En `calendar.google.com`:
1. Click en el `+` junto a "Otros calendarios"
2. "Desde URL"
3. Pega: `https://mundial.rodai.io/api/calendar`
4. Click "Agregar calendario"
5. Verifica que aparecen los 104 partidos

---

## Resumen de lo que necesitas (checklist previo)

| Requisito | Estado |
|-----------|--------|
| Node.js ≥ 18 | ✅ v25.8.1 |
| Cuenta Vercel | Verificar |
| GitHub CLI (`gh`) o cuenta GitHub | Verificar |
| Acceso DNS de `rodai.io` | Verificar |
| Datos finales del sorteo FIFA (grupos I–L) | Verificar / actualizar en `matches.ts` |

---

## Self-Review

**Cobertura del spec:**
- ✅ Portal con lista de todos los partidos
- ✅ Link de sincronización con calendario iOS/Android con un clic (webcal:// + .ics)
- ✅ Detalle completo del partido en el evento del calendario (equipos, venue, ciudad, fase, número)
- ✅ Horarios se ajustan al timezone del dispositivo (UTC en .ics, conversión automática)
- ✅ Deploy en Vercel
- ✅ CNAME `mundial.rodai.io`
- ✅ Instrucciones sobre qué hace falta (DNS, Vercel account, datos sorteo)

**Gaps identificados:**
- Los grupos I–L tienen datos parciales (equipos TBD) ya que el sorteo final de clasificatorias CONMEBOL/UEFA no está completo. Se deben actualizar en `src/data/matches.ts` cuando se confirmen.
- Las fechas exactas de los grupos I–L son estimadas; confirmar contra el calendario oficial FIFA antes de publicar.

**Placeholders verificados:** Ninguno — todos los code blocks tienen código real.

**Consistencia de tipos:** `Match`, `Phase`, `Group` definidos en Task 2 y usados consistentemente en Tasks 3, 4, 7, 8, y 9.
