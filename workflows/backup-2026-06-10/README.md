# Backup Estable — 2026-06-10

## Estado del sistema

**ESTABLE — listo para demo México vs Sudáfrica (11 jun)**

### ✅ Funcionando
- Portal Next.js en mundial.rodai.io (Vercel)
- WF1 Suscripciones: WhatsApp ALTA/STOP + Telegram ALTA/STOP + Admin stats
- WF2 Alertas v6 (7 tipos): PRE-partido, EVT goles, KO resultado, DAI resumen diario
- Bot Telegram @rodmundial_bot con IA (gpt-4o-mini) + typing indicator
- Bot WhatsApp Kapso con IA (gpt-4o) — extracción de teléfono fix (Kapso v2 payload)
- Google Analytics GA4 en botones del portal
- Anti-duplicados tabla alertas_enviadas
- Error workflow → notifica a Erick por Telegram
- Envío masivo de imagen/media a todos los suscriptores (WA + TG)

### ⏳ Pendiente
- **Pasarela de pago**: Stripe + Payoneer/Wise — bloqueado por aprobación de cuenta
- Templates Meta WhatsApp: 6 templates en revisión
- Página /suscribirse en portal (selector WA/TG + pago)

### Suscriptores activos (snapshot)
- 4 activos, 1 baja (Milton Siguenza — bloqueó el bot)
- 3 WhatsApp, 1 Telegram
- Todos en demo_only=true (gratis hasta que se active pago)

### Workflows n8n
| Archivo | ID | Nodos |
|---------|-----|-------|
| WF1-suscripciones.json | cI5WRRTgnqkInqq0 | 45 |
| WF2-alertas.json | eArw5zghtsxxaoCn | 73 |
| WF3-error.json | EsaoKCXpD3TZMCje | 2 |
