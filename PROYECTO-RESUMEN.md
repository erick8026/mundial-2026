# 🌍 Mundial 2026 — Resumen completo del proyecto

**Última actualización:** 2026-06-10 (sesión 3)  
**Estado general:** 🟢 Sistema operativo — listo para partido inaugural 11 jun

---

## ✅ Estado rápido del sistema

| Componente | Estado | Notas |
|------------|--------|-------|
| Portal mundial.rodai.io | ✅ Live | Botón WA → +503 6088 3037 |
| Bot WhatsApp Kapso | ✅ Activo | Responde preguntas IA gpt-4o |
| Bot Telegram @rodmundial_bot | ✅ Activo | Responde preguntas IA **gpt-4o** |
| WF1 Suscripciones | ✅ Activo | ALTA/STOP WA + TG + Admin |
| WF2 Alertas v6 | ✅ Activo | 7 tipos · AI enrichment · anti-dup |
| Outbound WA (API Kapso) | ✅ Probado | X-API-Key · 7 eventos entregados |
| Outbound TG (Bot API) | ✅ Probado | 7 eventos entregados |
| Base de datos | ✅ Activa | 3 suscriptores activos |
| Stripe | ⏳ Pendiente | Esperar cuenta Payoneer (mañana) |
| Templates Meta | ⏳ Pendiente | 4 templates listos para tramitar |

---

## 1. Portal web — mundial.rodai.io

**Stack:** Next.js · Vercel · TypeScript · Tailwind CSS  
**Repo:** github.com/erick8026/mundial-2026  
**Deploy:** Auto-deploy en push a `main`

**Lo que hace:**
- Muestra todos los **104 partidos** del Mundial 2026 (USA · Canadá · México)
- Filtro por fase: Grupos A–L, Octavos, Cuartos, Semis, Final
- Tarjetas por partido con equipos, hora local, estadio, estado
- Stats en header: total partidos, jugados, en vivo, próximos
- **Botón WhatsApp** → `wa.me/50360883037?text=ALTA%20Mundial%202026` ← número Kapso ✅
- **Botón Telegram** → `t.me/rodmundial_bot?start=alta`
- iCal sync

**Partidos de México (Grupo A):**
| # | Partido | Fecha | Hora CDMX | Estadio |
|---|---------|-------|-----------|---------|
| 1 | México vs Sudáfrica | Jue 11 jun | ~1 PM | Estadio Azteca ← INAUGURAL |
| 28 | México vs Corea del Sur | Jue 18 jun | ~7 PM | Estadio Akron, Guadalajara |
| 53 | Chequia vs México | Mié 24 jun | ~7 PM | Estadio Azteca |

> México City = UTC-6 permanente (sin DST desde oct 2022)

---

## 2. Kapso WhatsApp — Bot IA

**Proyecto:** Mundial  
**Project ID:** `b9506dc1-1d59-4921-9484-c01a763b38ba`  
**WhatsApp Config ID:** `d5241629-c2bc-4e7f-a871-58626a6e1461`  
**Workflow ID:** `a3b53e82-ac4e-448b-92b0-833a1c9e8c61`  
**Estado:** ✅ Active

| Dato | Valor |
|------|-------|
| Número visible | **+503 6088 3037** |
| Phone Number ID | `1365226796664715` |
| API Key (send) | `0a46b374ad7dd08b8b3f0e2713fba33de1724d02879f5fd43c431b8bb621b984` |
| Header de auth | `X-API-Key: <key>` ← NO Bearer |
| Send URL | `https://api.kapso.ai/meta/whatsapp/v24.0/1365226796664715/messages` |
| Modelo IA | `gpt-4o` |

**Body de envío:**
```json
{
  "messaging_product": "whatsapp",
  "to": "<número>",
  "type": "text",
  "text": { "body": "<mensaje>" }
}
```

**⚠️ Regla Meta 24h:** Solo mensajes libres dentro de ventana de 24h (usuario debe haber escrito primero). Fuera de ventana: usar templates aprobados.

**Bugs resueltos:**
1. `bodyTemplate` → bug SDK → usar `body` + `body_schema` via PATCH
2. `provider_model_name` → solo acepta `"gpt-4o"` exacto
3. `max_tokens` → solo gpt-4o lo acepta (no gpt-5-mini)
4. Auth header → `X-API-Key` (no `Authorization: Bearer`)

---

## 3. Telegram Bot — @rodmundial_bot

**Token:** `8228856137:AAFZ2EdaTrv__wgZeowBXsLx-pocmsIUzgM`  
**Credencial n8n:** `yovv0GvglRF0YNLq`  
**Estado:** ✅ Activo, responde preguntas IA ✅

---

## 4. Workflow 1 — Suscripciones

**ID:** `cI5WRRTgnqkInqq0`  
**Nombre:** 🌍 Mundial 2026 — Suscripciones  
**Estado:** ✅ Activo

| Webhook | Uso |
|---------|-----|
| `POST /webhook/mundial-alta-whatsapp` | ALTA desde Kapso |
| `POST /webhook/mundial-telegram` | Mensajes Telegram |
| `POST /webhook/stripe-mundial` | Pago completado |
| `GET /webhook/mundial-admin` + `X-Admin-Key: mundial-admin-2026-rodai` | Stats admin |

---

## 5. Workflow 2 — Alertas v6

**ID:** `eArw5zghtsxxaoCn`  
**Nombre:** 🏆 Mundial 2026 — Alertas v6 (7 tipos)  
**Estado:** ✅ Activo  
**Última actualización:** 2026-06-09

### Chains

| Chain | Trigger | Descripción |
|-------|---------|-------------|
| KO (Live) | Cada 2 min | API /fixtures?live=all → kickoff/goles/HT/2H/FT |
| PRE (Pre-match) | Cada 5 min | Partidos en 10-25 min → alerta prepartido |
| DAI (Daily) | 04:00 UTC | Resumen del día → todos los subs |

### 7 Tipos de alerta
| Tipo | Trigger |
|------|---------|
| `prepartido` | 15 min antes |
| `kickoff` | Estado → 1H |
| `lineup` | Minuto 1-5 |
| `goal` | Goles > marcador anterior |
| `halftime` | Estado = HT |
| `h2_start` | Estado → 2H |
| `fulltime` | Estado = FT/AET/PEN |

### AI Enrichment (gpt-4o-mini) — agregado 2026-06-09
- **3 cadenas con IA:** EVT, PRE, DAI
- **Patrón:** `AI Prep → AI Agent (gpt-4o-mini) → AI Post → DB Subs`
- **Credencial OpenAI:** `DNniMXGQP8C9zu5z` (OpenAi account 2)
- **Prompt:** Cronista RODAI Sport · máx 150 palabras · radio deportivo · CERO markdown

### Anti-duplicados
- Tabla `alertas_enviadas` con UNIQUE INDEX `(phone, partido_id, tipo, detalle)`
- CTE INSERT pattern: `ON CONFLICT DO NOTHING RETURNING id → IF id=-1 → skip`

### Router de plataforma
- `platform = 'telegram'` → Telegram node
- `platform != 'telegram'` → Kapso API (`X-API-Key` header)

### Nodos WA (4) — credenciales correctas
| Nodo | URL |
|------|-----|
| WA KO | `https://api.kapso.ai/meta/whatsapp/v24.0/1365226796664715/messages` |
| WA EVT | idem |
| WA PRE | idem |
| WA DAI | idem |

### Bugs corregidos en sesión 2026-06-09
1. CTE INSERT pattern en ins_KO, ins_PRE, ins_DAI (RETURNING id → -1 si conflict)
2. IF New: `number/notEquals -1` en ifn_KO, ifn_PRE, ifn_DAI
3. Router referencias → `$('Recover X').first().json.platform`
4. TG nodes → referencias a `Recover X` para chatId y text
5. Loop-backs faltantes (WA→Loop, TGPhoto→Loop, IFSponsor[1]→Loop, IFNew[1]→Loop)
6. JS Live: eliminado `delete sd['1544368']` debug line
7. API Daily URL: expresión fija con `$now.toFormat('yyyy-MM-dd')`
8. Auth WA: `Authorization: Bearer` → `X-API-Key`

---

## 6. Base de datos

**Credencial n8n:** `lZiJmyplRgdvifzN` (PG Local RODAI)

### Tabla `suscriptores`
```sql
id                BIGINT PRIMARY KEY
phone             TEXT
name              TEXT
subscribed_at     TIMESTAMPTZ
active            BOOLEAN
last_alert_at     TIMESTAMPTZ
alerts_today      INTEGER
created_at        TIMESTAMPTZ
updated_at        TIMESTAMPTZ
platform          VARCHAR(10) DEFAULT 'whatsapp'   -- 'whatsapp' | 'telegram'
telegram_chat_id  BIGINT
paid              BOOLEAN DEFAULT false
paid_at           TIMESTAMPTZ
stripe_session_id VARCHAR(200)
demo_only         BOOLEAN DEFAULT false
```

### Suscriptores activos (2026-06-10)
| id | name | telegram_chat_id | phone | platform | demo_only |
|----|------|-----------------|-------|----------|-----------|
| 11 | Milton Siguenza | `876048605` | 50377420802 | telegram | true |
| 12 | Rod Mundi | `8906403472` | 50360883037 | telegram | true |
| 13 | Erick Marin | `675855669` | 50377420672 | telegram | true |

> Telegram usa `telegram_chat_id` como identificador único. `phone` es opcional (nullable).

### Tabla `alertas_enviadas`
```sql
id SERIAL PRIMARY KEY, phone VARCHAR(50), partido_id VARCHAR(50),
tipo VARCHAR(30), detalle VARCHAR(200), enviado_at TIMESTAMPTZ
UNIQUE INDEX: (phone, partido_id, tipo, detalle)
```

### Tabla `sponsors`
```sql
id SERIAL, match_id VARCHAR(50), brand VARCHAR(100),
image_url TEXT, promo_text TEXT, active BOOLEAN, created_at TIMESTAMPTZ
```
Sponsor de prueba: Corona Extra → match_id='1' (México vs Sudáfrica)

---

## 7. Pruebas completadas (2026-06-09)

### Simulación partido completa ✅
7 eventos enviados: kickoff → gol 1-0 → gol 1-1 → descanso → 2do tiempo → gol 2-1 → resultado final

| Canal | Estado | Detalle |
|-------|--------|---------|
| Telegram @675855669 | ✅ | msg_id 70-83 |
| Telegram @8906403472 | ✅ | msg_id 71-83 |
| WhatsApp 50377420672 | ✅ | 7 wamid confirmados vía Kapso API |

### Bot IA WhatsApp ✅
- Inbound: usuario escribe al +503 6088 3037 → Kapso responde con gpt-4o
- Outbound: API Kapso → mensaje entregado en WhatsApp
- Auth correcta: `X-API-Key` header ✅
- Sistema prompt: sin datos hardcodeados, usa conocimiento IA para cualquier selección

### Bot IA Telegram ✅
- @rodmundial_bot responde preguntas del Mundial con **gpt-4o** (upgrade desde gpt-4o-mini el 2026-06-09)
- Sistema prompt: conocimiento general IA para cualquier selección (sin datos hardcodeados)
- Responde igual que WA sobre jugadores, dorsales, estadísticas de cualquier equipo

### Identificador Telegram — solo chat_id ✅ (2026-06-10 sesión 3)
- **Telegram NO requiere teléfono** — el identificador único es `telegram_chat_id`
- DB: columna `phone` ahora nullable para usuarios Telegram; nuevo UNIQUE constraint en `telegram_chat_id`
- WF1 INSERT usa `ON CONFLICT (telegram_chat_id)` — sin número falso `tg_XXXXX`
- **Eliminado**: bloque de verificación/solicitud de teléfono del flujo de preguntas (causaba que el bot mostrara botón de contacto en vez de responder con IA)
- Flujo actual: ALTA → registra chat_id → confirma. Cualquier pregunta → IA directo.

### Error workflow — texto corregido ✅ (2026-06-10 sesión 3)
- El mensaje de error llegaba con `{{ $json.workflow.name }}` sin evaluar (texto plano)
- Fix: campo `text` ahora usa modo expresión `={{ \`...\${var}...\` }}` con template literals JS

---

## 8. Templates Meta WhatsApp

**Estado:** 🟡 En revisión (enviadas 2026-06-09)  
**Aprobación estimada:** 24–72 horas

| # | Nombre | Uso | Variables | Estado |
|---|--------|-----|-----------|--------|
| 1 | `alerta_pre_partido` | 30 min antes del partido | equipo1, equipo2, estadio, hora | 🟡 En revisión |
| 2 | `alerta_gol` | Cada gol anotado | jugador, equipo, marcador, minuto, descripción IA | 🟡 En revisión |
| 3 | `resultado_final` | Al terminar el partido | equipos, marcador, resumen IA | 🟡 En revisión |
| 4 | `resumen_dia` | 10 PM CDMX cada día | resumen completo del día | 🟡 En revisión |
| 5 | `alerta_evento` | Kickoff, halftime, 2do tiempo | equipos, evento, descripción IA | 🟡 En revisión |
| 6 | `alineacion_partido` | Alineaciones antes del partido | equipo1, equipo2, jugadores | 🟡 En revisión |

**Notas importantes:**
- Meta las clasificó como Marketing (no Utilidad) — funciona igual, diferencia de costo es mínima
- Anti-duplicados: tabla `alertas_enviadas` con UNIQUE `(phone, partido_id, tipo, detalle)` — nunca se repite el mismo gol
- Goles múltiples: cada gol tiene marcador único como `detalle` → no hay duplicados aunque haya 10 goles
- Meta no limita mensajes por partido — el límite es diario por tier de cuenta
- **Pendiente:** cuando Meta apruebe → conectar cada template en WF2

---

## 9. Pendiente — en orden de prioridad

### 🔴 Antes del 11 de junio

1. **Conectar templates en WF2** (cuando Meta los apruebe)
   - Actualizar nodos WA KO, WA EVT, WA PRE, WA DAI con los template IDs

2. **Abrir ventana 24h con subs WA**
   - `50388888001` necesita escribirle al +503 6088 3037 primero
   - `50377420672` ventana abierta ✅

### 🟡 Stripe + Payoneer

3. **Stripe Payment Link live**
   - Esperar cuenta Payoneer lista
   - Webhook URL lista: `https://n8n.95.216.212.187.sslip.io/webhook/mundial-stripe`
   - Tiempo estimado una vez con cuenta: ~20 min para conectar en n8n

### 🟢 Mejoras opcionales

4. **Parallel loops (300 clientes)** — Split TG/WA en loops separados para escala
5. **Portal /suscribirse** — página Next.js con selector WA/TG + Stripe Payment Link
6. **Sponsors con imagen TG** — usar sendPhoto con image_url
7. **Más sponsors** — agregar en tabla `sponsors` por match_id

---

## 9. Credenciales consolidadas

### n8n
| Dato | Valor |
|------|-------|
| URL | `https://n8n.95.216.212.187.sslip.io` |
| API Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTEzMjZkMC1jYTU3LTQ0MjctYTRkMC01YzY1MDg2MzcwOTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiZjMzNWU3NzItNjc2My00OWJkLTliNDItNTQ1MDg2YjM4NzYxIiwiaWF0IjoxNzgwOTU2NTQzLCJleHAiOjE3ODg2NzQ0MDB9.LTjQcaoqtL9_5CGb-4EYjG76dXL0Yba6yYgZEL8zP0w` |
| Header | `X-N8N-API-KEY` |
| Expira | ~julio 2026 |

### Kapso (ACTUALIZADAS 2026-06-09)
| Dato | Valor |
|------|-------|
| Número WhatsApp | **+503 6088 3037** |
| Phone Number ID | `1365226796664715` |
| API Key | `0a46b374ad7dd08b8b3f0e2713fba33de1724d02879f5fd43c431b8bb621b984` |
| Project ID | `b9506dc1-1d59-4921-9484-c01a763b38ba` |
| Send URL | `https://api.kapso.ai/meta/whatsapp/v24.0/1365226796664715/messages` |
| Auth header | `X-API-Key: <key>` |

### Telegram
| Dato | Valor |
|------|-------|
| Bot | @rodmundial_bot |
| Token | `8228856137:AAFZ2EdaTrv__wgZeowBXsLx-pocmsIUzgM` |
| Credencial n8n | `yovv0GvglRF0YNLq` |

### Stripe (TEST — pendiente live)
| Dato | Valor |
|------|-------|
| Webhook URL n8n | `https://n8n.95.216.212.187.sslip.io/webhook/mundial-stripe` |
| Webhook secret | `whsec_hbh2vfuhIG0Ezrl7v4YsEJXxZC0RvEKH` |
| Precio TEST | `price_1TgEHoPwZoszHi1PG5xtCj84` |
| Payment Link TEST | `https://buy.stripe.com/test_dRmeVfd8ufeR3pY7uW9EI00` |

### PostgreSQL
| Dato | Valor |
|------|-------|
| Credencial n8n | `lZiJmyplRgdvifzN` (PG Local RODAI) |

### Admin
| Dato | Valor |
|------|-------|
| URL | `GET https://n8n.95.216.212.187.sslip.io/webhook/mundial-admin` |
| Header | `X-Admin-Key: mundial-admin-2026-rodai` |

---

## 10. URLs rápidas

| Recurso | URL |
|---------|-----|
| Portal | https://mundial.rodai.io |
| n8n | https://n8n.95.216.212.187.sslip.io |
| Repo | https://github.com/erick8026/mundial-2026 |
| Kapso | https://app.kapso.ai |
| Admin API | https://n8n.95.216.212.187.sslip.io/webhook/mundial-admin |
| Logic API | https://n8n.95.216.212.187.sslip.io/webhook/mundial-logic |
