#!/usr/bin/env node
/**
 * SIMULADOR DE REGRESIÓN — JS Live de WF2 (Mundial 2026)
 * ──────────────────────────────────────────────────────────
 * Corre el código REAL de producción del nodo "JS Live" contra
 * escenarios de parpadeo/edge-cases de la API-Football, en aislamiento.
 * NO envía nada a nadie — solo observa qué eventos emite la lógica.
 *
 * USO:
 *   1) node scripts/qa/sim-regresion.js            (usa el snapshot guardado)
 *   2) node scripts/qa/sim-regresion.js --fetch    (baja JS Live de producción primero)
 *
 * CUÁNDO CORRERLO: antes de CADA despliegue que toque JS Live, y como
 * simulacro nocturno. Si algún escenario sale ❌, NO desplegar.
 *
 * Para refrescar el snapshot de código:
 *   node scripts/qa/sim-regresion.js --fetch
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SNAPSHOT = path.join(__dirname, 'jslive-snapshot.js');
const N8N = 'https://n8n.95.216.212.187.sslip.io/api/v1';
const WF2 = 'eArw5zghtsxxaoCn';
const KEY = process.env.N8N_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTEzMjZkMC1jYTU3LTQ0MjctYTRkMC01YzY1MDg2MzcwOTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiZjMzNWU3NzItNjc2My00OWJkLTliNDItNTQ1MDg2YjM4NzYxIiwiaWF0IjoxNzgwOTU2NTQzLCJleHAiOjE3ODg2NzQ0MDB9.LTjQcaoqtL9_5CGb-4EYjG76dXL0Yba6yYgZEL8zP0w';

// ── Refrescar snapshot desde producción si se pide ──
if (process.argv.includes('--fetch')) {
  console.log('Bajando JS Live de producción...');
  const raw = execSync(`curl -s -H "X-N8N-API-KEY: ${KEY}" "${N8N}/workflows/${WF2}"`).toString();
  const wf = JSON.parse(raw);
  const node = wf.nodes.find(n => n.name === 'JS Live');
  if (!node) { console.error('No se encontró el nodo JS Live'); process.exit(1); }
  fs.writeFileSync(SNAPSHOT, node.parameters.jsCode);
  console.log(`Snapshot actualizado (${node.parameters.jsCode.length} chars)\n`);
}

if (!fs.existsSync(SNAPSHOT)) {
  console.error('No hay snapshot. Corre con --fetch primero.');
  process.exit(1);
}
const jsLiveCode = fs.readFileSync(SNAPSHOT, 'utf8');
const runner = new Function('$input', '$getWorkflowStaticData', jsLiveCode);

// ── Helpers de simulación ──
function runScenario(name, cycles) {
  const _node = {}, _global = {};
  const ctx = (resp) => runner.call(null,
    { first: () => ({ json: { response: resp } }) },
    (scope) => scope === 'global' ? _global : _node);
  const log = [];
  let all = [], i = 0;
  for (const [label, resp] of cycles) {
    i++;
    let r;
    try { r = ctx(resp); }
    catch (e) { log.push(`  ${i} (${label}): ❌ EXCEPCIÓN ${e.message}`); continue; }
    const evs = (r || []).map(x => x.json).filter(j => j.tipo);
    log.push(`  ${i} (${label}): ${evs.length ? evs.map(e => e.tipo).join(', ') : '—'}`);
    all = all.concat(evs);
  }
  return { all, log, name };
}
const fx = (id, st, h, a, el, ev = []) => ({
  fixture: { id, status: { short: st, elapsed: el }, date: '2026-06-13T01:00:00Z', venue: { name: 'X' } },
  league: { id: 1, name: 'WC' }, teams: { home: { name: 'USA' }, away: { name: 'Paraguay' } },
  goals: { home: h, away: a }, events: ev
});
const G = (t, p, m) => ({ type: 'Goal', detail: 'Normal Goal', time: { elapsed: m }, team: { name: t }, player: { name: p }, assist: { name: null } });
const VAR_CANCEL = (t, m) => ({ type: 'Var', detail: 'Goal cancelled', time: { elapsed: m }, team: { name: t }, player: { name: 'X' } });

// ── Casos de prueba (cada uno: nombre, ciclos, aserción) ──
const ID = 7000000;
const TESTS = [
  {
    sc: () => runScenario('Gol → PARPADEO baja → vuelve (no debe anular)', [
      ['0-0', [fx(ID, '1H', 0, 0, 20)]],
      ['GOL 1-0', [fx(ID, '1H', 1, 0, 25, [G('USA', 'Pulisic', 25)])]],
      ['PARPADEO 0-0', [fx(ID, '1H', 0, 0, 26, [G('USA', 'Pulisic', 25)])]],
      ['vuelve 1-0', [fx(ID, '1H', 1, 0, 27, [G('USA', 'Pulisic', 25)])]],
    ]),
    assert: (a) => a.filter(e => e.tipo === 'var_anulado').length === 0,
    ok: 'sin anulación falsa', fail: 'ANULACIÓN FALSA por parpadeo',
  },
  {
    sc: () => runScenario('Gol → ANULACIÓN REAL por evento VAR (debe anular 1)', [
      ['0-0', [fx(ID + 1, '1H', 0, 0, 30)]],
      ['GOL 1-0', [fx(ID + 1, '1H', 1, 0, 40, [G('USA', 'Pulisic', 40)])]],
      ['VAR anula', [fx(ID + 1, '1H', 0, 0, 42, [G('USA', 'Pulisic', 40), VAR_CANCEL('USA', 42)])]],
    ]),
    assert: (a) => a.filter(e => e.tipo === 'var_anulado').length === 1,
    ok: 'VAR real funciona', fail: 'se perdió la anulación REAL',
  },
  {
    sc: () => runScenario('Desaparece 1 ciclo (NO debe FT)', [
      ['2H 2-1', [fx(ID + 2, '2H', 2, 1, 80)]],
      ['ausente x1', []],
      ['reaparece', [fx(ID + 2, '2H', 2, 1, 82)]],
    ]),
    assert: (a) => a.filter(e => e.tipo === 'fulltime').length === 0,
    ok: 'no se adelantó el FT', fail: 'FT PREMATURO',
  },
  {
    sc: () => runScenario('Desaparece 2 ciclos (SÍ debe FT)', [
      ['2H 2-1', [fx(ID + 3, '2H', 2, 1, 90)]],
      ['ausente x1', []],
      ['ausente x2', []],
    ]),
    assert: (a) => a.filter(e => e.tipo === 'fulltime').length === 1,
    ok: 'FT correcto tras 2 ciclos', fail: 'no disparó el FT real',
  },
  {
    sc: () => runScenario('Dos goles distintos (no deduplicar)', [
      ['0-0', [fx(ID + 4, '1H', 0, 0, 10)]],
      ['GOL 1-0', [fx(ID + 4, '1H', 1, 0, 15, [G('USA', 'A', 15)])]],
      ['GOL 2-0', [fx(ID + 4, '1H', 2, 0, 20, [G('USA', 'A', 15), G('USA', 'B', 20)])]],
    ]),
    assert: (a) => a.filter(e => e.tipo === 'goal' || e.tipo === 'goal_flash').length === 2,
    ok: 'ambos goles emitidos', fail: 'deduplicó goles distintos',
  },
];

// ── Correr todo ──
console.log('═══════════════════════════════════════════════════');
console.log('  SIMULADOR DE REGRESIÓN — JS Live WF2 Mundial 2026');
console.log('═══════════════════════════════════════════════════');
let pass = 0, fail = 0;
for (const t of TESTS) {
  const { all, log, name } = t.sc();
  const ok = t.assert(all);
  console.log(`\n${ok ? '✅' : '❌'} ${name}`);
  log.forEach(l => console.log(l));
  console.log(`   → ${ok ? t.ok : 'FALLA: ' + t.fail}`);
  ok ? pass++ : fail++;
}
console.log('\n═══════════════════════════════════════════════════');
console.log(`  RESULTADO: ${pass} ✅  |  ${fail} ❌`);
console.log('═══════════════════════════════════════════════════');
process.exit(fail > 0 ? 1 : 0);
