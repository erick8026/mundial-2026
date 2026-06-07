# Mundial 2026 Calendar Portal — Plan Maestro

> **Estado:** ✅ COMPLETADO Y EN PRODUCCIÓN — https://mundial.rodai.io
> **GitHub:** https://github.com/erick8026/mundial-2026
> **Vercel:** erick-marins-projects/mundial
> **Última actualización:** 2026-06-07

---

## Resumen ejecutivo

Portal web con los 104 partidos del Mundial 2026, banderas reales, horarios en timezone local, marcadores en tiempo real y sincronización de calendario con un clic. Deploy automático en Vercel con dominio `mundial.rodai.io`.

---

## Stack real implementado

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.7 (App Router, Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Calendario | `ics` npm package v3.7.2 |
| Banderas | flagcdn.com CDN (`https://flagcdn.com/w80/{code}.png`) |
| Deploy | Vercel — erick-marins-projects/mundial |
| Dominio | `mundial.rodai.io` (alias en vercel.json) |
| Repo | github.com/erick8026/mundial-2026 |
| Node | v25.8.1 |

---

## Arquitectura

```
src/
├── app/
│   ├── layout.tsx              # Metadata SEO, fuente Inter
│   ├── page.tsx                # Página principal (client component)
│   ├── globals.css             # Tailwind base
│   └── api/
│       └── calendar/
│           └── route.ts        # GET /api/calendar → .ics (force-dynamic)
├── components/
│   ├── MatchCard.tsx           # Tarjeta de partido con banderas y marcador
│   ├── SyncButton.tsx          # Dropdown: Google Cal / iOS / webcal / .ics
│   └── PhaseFilter.tsx         # Filtros de fase (pills de colores)
├── data/
│   └── matches.ts              # 104 partidos + phaseLabels + phaseOrder
├── lib/
│   └── ical.ts                 # matchesToICS() — genera iCal en UTC
└── types/
    └── match.ts                # Match, Phase, Group, MatchStatus
```

---

## Flujo de calendario (cómo funciona el sync)

1. `/api/calendar` genera un archivo iCal con todos los partidos en **UTC**
2. El protocolo `webcal://` le dice al OS que abra el calendario nativo
3. Los calendarios (iOS, Android, Google) convierten UTC → timezone local del dispositivo **automáticamente**
4. Para suscripción viva: `webcal://mundial.rodai.io/api/calendar`
5. Para Google Calendar: `https://calendar.google.com/calendar/render?cid=webcal%3A%2F%2Fmundial.rodai.io%2Fapi%2Fcalendar`

---

## Opciones del botón "Agregar al Calendario"

| Opción | URL | Funciona en |
|--------|-----|------------|
| 📆 Google Calendar | `calendar.google.com/render?cid=webcal://...` | Cualquier dispositivo con cuenta Google |
| 🍎 iOS / macOS | `webcal://mundial.rodai.io/api/calendar` | iPhone, iPad, Mac (Safari) |
| 🔗 Copiar enlace webcal | Copia al portapapeles | Outlook, Thunderbird |
| ⬇️ Descargar .ics | `/api/calendar` (download) | Cualquier calendario |

---

## Datos de los partidos (`src/data/matches.ts`)

### Grupos implementados

| Grupo | Equipos | Partidos |
|-------|---------|----------|
| A | México, Ecuador, Uruguay, Alemania | 6 |
| B | España, Marruecos, Portugal, Croacia | 6 |
| C | Argentina, Canadá, Chile, Perú | 6 |
| D | Francia, Argelia, Bélgica, Senegal | 6 |
| E | Brasil, Países Bajos, Colombia, Paraguay | 6 |
| F | Inglaterra, Nigeria, Australia, Arabia Saudita | 6 |
| G | Estados Unidos, Japón, C. de Marfil, Bolivia | 6 |
| H | Italia, Ghana, Corea del Sur, Ecuador | 6 |
| I | Serbia, Polonia, Turquía, Suiza | 6 |
| J | Países Bajos, Rumania, Ucrania, Hungría | 6 |
| K | Irán, Camerún, Dinamarca, Nueva Zelanda | 6 |
| L | Mozambique, Venezuela, Escocia, Kenia | 6 |
| Ronda de 32 | TBD | 16 |
| Octavos | TBD | 8 |
| Cuartos | TBD | 4 |
| Semifinales | TBD | 2 |
| 3er Lugar | TBD | 1 |
| **Final** | TBD — MetLife Stadium, 26 Jul 2026 | 1 |
| **Total** | | **104** |

### Estructura de un partido

```typescript
interface Match {
  id: string;           // e.g. 'GA1', 'R32-1', 'FINAL'
  phase: Phase;         // 'group' | 'round-of-32' | ... | 'final'
  group?: Group;        // 'A' ... 'L' (solo fase de grupos)
  matchNumber: number;  // 1–104 (número oficial FIFA)
  homeTeam: string;     // nombre en español
  awayTeam: string;
  homeFlag?: string;    // ISO 3166-1 alpha-2 lowercase (ej: 'mx', 'gb-eng')
  awayFlag?: string;
  venue: string;
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  utcDate: string;      // ISO 8601 UTC (ej: '2026-06-11T23:00:00Z')
  status?: 'upcoming' | 'live' | 'completed';
  homeScore?: number;   // undefined = no jugado
  awayScore?: number;
}
```

---

## Cómo actualizar marcadores

Cuando se juegue un partido, editar `src/data/matches.ts`:

```typescript
// Busca el partido por id (ej: 'GA1') y agrega:
{
  id: 'GA1',
  // ... resto de campos igual ...
  status: 'completed',
  homeScore: 2,
  awayScore: 1,
},
```

Luego:
```bash
git add src/data/matches.ts
git commit -m "scores: Partido #1 México 2-1 Ecuador"
git push
# Vercel redeploya en ~30 segundos automáticamente
```

---

## Deploy y configuración

### vercel.json
```json
{
  "alias": ["mundial.rodai.io"]
}
```

### next.config.ts
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
};

export default nextConfig;
```
> ⚠️ No agregar `turbopack.root` con ruta local — rompe el deploy en Vercel.

### Comandos de deploy
```bash
# Deploy manual (normalmente no necesario — git push lo activa)
npx vercel --prod --yes --scope erick-marins-projects

# Ver estado de deploys
npx vercel ls --scope erick-marins-projects mundial

# Revisar producción
curl -I https://mundial.rodai.io/api/calendar
```

### Variables de entorno
- No se requieren variables de entorno para funcionar
- `NEXT_PUBLIC_BASE_URL` no es necesaria — el componente usa `window.location.origin` automáticamente

---

## Credenciales y accesos

| Servicio | Cuenta | Detalle |
|---------|--------|---------|
| GitHub | erick8026 | repo: mundial-2026 (público) |
| Vercel | erick-4974 | scope: erick-marins-projects |
| Dominio | rodai.io | CNAME configurado en vercel.json |

---

## Problemas resueltos en la implementación

| Problema | Causa | Solución |
|---------|-------|---------|
| `ics` not found en build | No estaba en `dependencies` de package.json | Agregarlo manualmente y `npm install` |
| Flags no cargaban en producción | `turbopack.root` con ruta local en next.config.ts | Remover esa sección |
| `webcal://` no abría en Chrome desktop | Chrome no maneja protocolo webcal | Agregar opción Google Calendar direct link |
| "2 jugados" en contador | Se dejaron 2 partidos demo con `status: 'completed'` | Limpiar, todos en `status: 'upcoming'` |
| Build queue congestionado | Múltiples `vercel --prod` en paralelo | Usar `vercel remove` para cancelar los extra |
| Puerto 3000 ocupado | Servidor anterior corriendo | `lsof -ti:3000 | xargs kill -9` |

---

## Comandos de desarrollo local

```bash
cd /Users/erickmr/Documents/mundial

# Iniciar servidor local
npx next dev --port 3001
# → http://localhost:3001

# Verificar API de calendario
curl http://localhost:3001/api/calendar | head -10

# Build de producción local
npm run build
npm start
```

---

## Calendario de partidos clave

| Fecha | Evento |
|-------|--------|
| 11 Jun 2026 | ⚽ Primer partido — México vs Ecuador, Estadio Azteca |
| 12 Jun 2026 | España vs Marruecos, Portugal vs Croacia |
| 13 Jun 2026 | Argentina vs Canadá, Chile vs Perú |
| 21–26 Jun 2026 | Última jornada fase de grupos |
| 29 Jun–6 Jul 2026 | Ronda de 32 |
| 9–12 Jul 2026 | Octavos de final |
| 15–16 Jul 2026 | Cuartos de final |
| 19–20 Jul 2026 | Semifinales |
| 24 Jul 2026 | Tercer lugar |
| **26 Jul 2026** | 🏆 **GRAN FINAL — MetLife Stadium, New Jersey** |
