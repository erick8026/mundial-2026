// Próximos partidos de México — timestamps UTC
const PROXIMO_MX = [
  { after_date: '2026-06-11', utc_ts: 1781830800, h: 'México', hf: '🇲🇽', a: 'Corea del Sur', af: '🇰🇷', d: 'Mié 18 jun', v: 'Estadio Akron, Guadalajara' },
  { after_date: '2026-06-18', utc_ts: 1782349200, h: 'Chequia', hf: '🇨🇿', a: 'México', af: '🇲🇽', d: 'Mar 24 jun', v: 'Estadio Azteca, CDMX' },
];
function getNextMx() {
  const today = new Date().toISOString().slice(0, 10);
  return PROXIMO_MX.filter(m => m.after_date >= today).sort((a, b) => a.utc_ts - b.utc_ts)[0] || null;
}


const data     = $input.first().json;
const fixtures = data.response || [];
const sd       = $getWorkflowStaticData('node');
const globalSd = $getWorkflowStaticData('global');
const events   = [];

const FLAGS = {
  'Mexico':'🇲🇽','México':'🇲🇽','South Africa':'🇿🇦','Sudáfrica':'🇿🇦',
  'Spain':'🇪🇸','España':'🇪🇸','Peru':'🇵🇪','Perú':'🇵🇪',
  'Brazil':'🇧🇷','Brasil':'🇧🇷','Argentina':'🇦🇷','Germany':'🇩🇪','Alemania':'🇩🇪',
  'France':'🇫🇷','Francia':'🇫🇷','England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Portugal':'🇵🇹',
  'Netherlands':'🇳🇱','Belgium':'🇧🇪','Bélgica':'🇧🇪',
  'Italy':'🇮🇹','Italia':'🇮🇹','Croatia':'🇭🇷','Croacia':'🇭🇷',
  'Uruguay':'🇺🇾','Colombia':'🇨🇴','Chile':'🇨🇱','Ecuador':'🇪🇨',
  'USA':'🇺🇸','United States':'🇺🇸','Canada':'🇨🇦','Canadá':'🇨🇦',
  'Japan':'🇯🇵','Japón':'🇯🇵','South Korea':'🇰🇷','Korea Republic':'🇰🇷',
  'Morocco':'🇲🇦','Marruecos':'🇲🇦','Senegal':'🇸🇳',
  'Saudi Arabia':'🇸🇦','Arabia Saudita':'🇸🇦',
  'Qatar':'🇶🇦','Iran':'🇮🇷','Australia':'🇦🇺','Poland':'🇵🇱','Polonia':'🇵🇱',
  'Switzerland':'🇨🇭','Suiza':'🇨🇭','Denmark':'🇩🇰','Dinamarca':'🇩🇰',
  'Serbia':'🇷🇸','Ukraine':'🇺🇦','Ucrania':'🇺🇦','Tunisia':'🇹🇳','Túnez':'🇹🇳',
  'Nigeria':'🇳🇬','Ghana':'🇬🇭','Cameroon':'🇨🇲','Camerún':'🇨🇲',
  'Costa Rica':'🇨🇷','Panama':'🇵🇦','Panamá':'🇵🇦','Honduras':'🇭🇳',
  'El Salvador':'🇸🇻','Guatemala':'🇬🇹','Bolivia':'🇧🇴','Paraguay':'🇵🇾',
  'Venezuela':'🇻🇪','Indonesia':'🇮🇩','New Zealand':'🇳🇿',
  'Vanuatu':'🇻🇺','Fiji':'🇫🇯','Philippines':'🇵🇭','Thailand':'🇹🇭',
  'China':'🇨🇳','India':'🇮🇳','UAE':'🇦🇪','Russia':'🇷🇺',
  'Hungary':'🇭🇺','Romania':'🇷🇴','Greece':'🇬🇷','Turkey':'🇹🇷',
  'Scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','Wales':'🏴󠁧󠁢󠁷󠁬󠁳󠁿','Ireland':'🇮🇪','Republic of Ireland':'🇮🇪',
  'Austria':'🇦🇹','Sweden':'🇸🇪','Norway':'🇳🇴','Finland':'🇫🇮',
  'Czech Republic':'🇨🇿','Slovakia':'🇸🇰','Slovenia':'🇸🇮',
  'North Macedonia':'🇲🇰','Albania':'🇦🇱','Montenegro':'🇲🇪',
  'Azerbaijan':'🇦🇿','Georgia':'🇬🇪','Armenia':'🇦🇲','Belarus':'🇧🇾',
  'Kazakhstan':'🇰🇿','Lithuania':'🇱🇹','Latvia':'🇱🇻','Estonia':'🇪🇪',
  'Angola':'🇦🇴','Togo':'🇹🇬','Benin':'🇧🇯','Liberia':'🇱🇷',
  'Congo DR':'🇨🇩','Ethiopia':'🇪🇹','Rwanda':'🇷🇼','Kenya':'🇰🇪',
  'Zimbabwe':'🇿🇼','Zambia':'🇿🇲','Botswana':'🇧🇼',
  'Sierra Leone':'🇸🇱','Mauritania':'🇲🇷','Myanmar':'🇲🇲',
  'Cambodia':'🇰🇭','Hong Kong':'🇭🇰','Syria':'🇸🇾','Iraq':'🇮🇶',
  'Jordan':'🇯🇴','Kuwait':'🇰🇼','Bahrain':'🇧🇭','Oman':'🇴🇲'
};

function flag(name) { return FLAGS[name] || '⚽'; }

function minStr(e) {
  const extra = e.time?.extra;
  return extra ? `${e.time.elapsed}+${extra}'` : `${e.time?.elapsed || 0}'`;
}

function expandName(fixtureId, name) {
  if (!name) return name;
  const nm = globalSd[`nm_${fixtureId}`] || {};
  return nm[name] || name;
}

// ── Narrativa compacta (1-2 frases) ──────────────────────────────────────────
function buildNarrative(scorer, assist, detail, minute, scoring, home, away, hs, as_) {
  const diff   = Math.abs(hs - as_);
  const isLocal = scoring === home;
  const team   = isLocal ? 'local' : 'visitante';
  let accion;
  if (detail === 'Header')
    accion = assist
      ? `Centro de ${assist} y ${scorer} conecta de cabeza sin dar opción al portero.`
      : `${scorer} se anticipa en el área y convierte de cabeza con instinto goleador.`;
  else if (detail === 'Penalty')
    accion = `${scorer} ejecuta el penal con total frialdad y no falla desde los doce pasos.`;
  else if (detail === 'Free Kick' || detail === 'Freekick')
    accion = `${scorer} cobra el tiro libre con maestría y la pelota se clava en la escuadra.`;
  else if (detail === 'Own Goal')
    accion = `Desafortunado desvío en propia puerta que sentencia la jugada.`;
  else
    accion = assist
      ? `${assist} asiste y ${scorer} define con precisión ante el arquero rival.`
      : `${scorer} recibe, se acomoda y dispara inapelable para el portero.`;

  let contexto;
  if (minute <= 10)           contexto = `El gol tempranero obliga al rival a replantear desde el inicio.`;
  else if (minute >= 86)      contexto = `Golazo sobre la bocina que puede ser definitivo.`;
  else if (hs === as_)        contexto = `El marcador queda igualado y todo se decide en los minutos que restan.`;
  else if (diff === 1 && hs + as_ === 1) contexto = `Se abre el marcador y el partido entra en una nueva dimensión.`;
  else if (minute >= 70 && diff === 1) contexto = `Gol que puede ser el de la victoria en la recta final.`;
  else if (diff >= 3)         contexto = `El dominio del equipo ${team} queda reflejado en el marcador.`;
  else                        contexto = `El equipo ${team} amplía la ventaja y administra el partido.`;
  return `${accion} ${contexto}`;
}

function contextLabel(minute, hs, as_, detail) {
  if (detail === 'Own Goal')  return null;
  if (minute <= 10)           return '🚀 Gol tempranero';
  if (minute >= 86)           return '🔥 Gol sobre la bocina';
  if (hs === as_)             return '🔄 Gol del empate';
  const diff = Math.abs(hs - as_);
  if (diff === 1 && hs + as_ === 1) return '🔓 Se abre el marcador';
  if (minute >= 70 && diff === 1)   return '🏆 Gol decisivo';
  if (diff >= 3)                    return '📈 Goleada en camino';
  return '⚡ El marcador se mueve';
}

function goalLine(e, fid) {
  const f      = flag(e.team?.name || '');
  const isOG   = e.detail === 'Own Goal';
  const isPen  = e.detail === 'Penalty';
  const player = expandName(fid, e.player?.name) || '?';
  const assist = expandName(fid, e.assist?.name);
  const min    = minStr(e);
  let line = isOG ? `😬 ${player}  ${min}  · OG` : `${f} ${player}  ${min}${isPen ? '  · Pen' : ''}`;
  if (assist) line += `\n🅰 ${assist}`;
  return line;
}

function mvp(goals, fid) {
  const c = {};
  for (const g of goals) {
    if (g.detail === 'Own Goal') continue;
    const p = expandName(fid, g.player?.name), a = expandName(fid, g.assist?.name);
    if (p) c[p] = (c[p] || 0) + 2;
    if (a) c[a] = (c[a] || 0) + 1;
  }
  const s = Object.entries(c).sort((a,b) => b[1] - a[1]);
  return s.length ? s[0][0] : null;
}

const ALLOWED_L = [1, 10];

for (const fix of fixtures) {
  if (!ALLOWED_L.includes(fix.league?.id)) continue;

  const id      = String(fix.fixture.id);
  const status  = fix.fixture.status?.short || '';
  const elapsed = fix.fixture.status?.elapsed || 0;
  const home    = fix.teams?.home?.name  || 'Local';
  const away    = fix.teams?.away?.name  || 'Visitante';
  const fH      = flag(home);
  const fA      = flag(away);
  const prev = sd[id] || {
    hs:0, as_:0, status:'NS',
    kickoffSent:false, lineupSent:false,
    htSent:false, h2Sent:false, ftSent:false
  };
  let holdGoal = false;
  // Si la API trae goles null (transición de estado), usar el último marcador conocido
  const hs      = fix.goals?.home  ?? prev.hs ?? 0;
  const as_     = fix.goals?.away  ?? prev.as_ ?? 0;
  const venue   = fix.fixture?.venue?.name || '';
  const league  = fix.league?.name || 'Internacional';
  const fixEvts = fix.events || [];



  // ── Marcador inline ────────────────────────────────────────────────────────
  const score = `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`;

  // ── 1. KICKOFF ─────────────────────────────────────────────────────────────
  if (status === '1H' && !['1H','2H','HT','ET'].includes(prev.status) && !prev.kickoffSent) {
    const lines = [
      '🟢 ¡PARTIDO INICIADO!',
      '',
      `${fH} ${home}  0 – 0  ${away} ${fA}`,
      '',
      `📅 ${league}`,
      venue ? `🏟 ${venue}` : null,
      '',
      '⏱ En curso  ·  #RODAI Sport'
    ].filter(l => l !== null);
    const msg = lines.join('\n');
    events.push({ partido_id:id, tipo:'kickoff', detalle:`ko_${id}`,
      home, away, venue, elapsed:0, msg_wa:msg, msg_tg:msg });
  }

  // ── 2. ALINEACIONES ────────────────────────────────────────────────────────
  if (status === '1H' && elapsed >= 1 && elapsed <= 5 && !prev.lineupSent) {
    events.push({ partido_id:id, tipo:'lineup', detalle:`lu_${id}`,
      home, away, venue, elapsed,
      msg_wa:'LINEUP_PENDING', msg_tg:'LINEUP_PENDING' });
  }

  // ── 3. GOLES ───────────────────────────────────────────────────────────────
  if ((hs > prev.hs || as_ > prev.as_) && ['1H','2H','ET'].includes(status)) {
    const goalEvts = fixEvts.filter(e => e.type === 'Goal');
    const last     = goalEvts[goalEvts.length - 1] || {};
    const scoring  = last.team?.name || (hs > prev.hs ? home : away);
    const scorer   = expandName(id, last.player?.name) || '?';
    const assist   = expandName(id, last.assist?.name) || null;
    const detail   = last.detail || 'Normal Goal';
    const goalMin  = last.time?.elapsed || elapsed;
    const extra    = last.time?.extra || null;
    const minFull  = extra ? `${goalMin}+${extra}'` : `${goalMin}'`;
    const isOG     = detail === 'Own Goal';
    const isPen    = detail === 'Penalty';
    const narrative = buildNarrative(scorer, assist, detail, goalMin, scoring, home, away, hs, as_);
    const ctxLabel  = contextLabel(goalMin, hs, as_, detail);
    const fScoring  = flag(scoring);

    const lines = [
      `🚨 GOOOL DE ${scoring.toUpperCase()}`,
      '',
      `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`,
      ''
    ];

    if (isOG)      lines.push(`😬 ${scorer}  ${minFull}  · OG`);
    else if (isPen) lines.push(`⚽ ${scorer}  ${minFull}  · Pen`);
    else            lines.push(`⚽ ${scorer}  ${minFull}`);

    if (assist) lines.push(`🅰 ${assist}`);

    lines.push('', narrative);
    if (ctxLabel) lines.push('', ctxLabel);
    lines.push('', `⏱ ${minFull}  ·  #RODAI Sport`);

    const msg = lines.join('\n');
    if (scorer === '?' && (prev.goalRetry || 0) < 2) {
      // El marcador subio pero aun no hay goleador: FLASH inmediato + narracion cuando llegue el nombre
      holdGoal = true;
      if ((prev.goalRetry || 0) === 0) {
        const flashMsg = [
          `🚨 ¡GOOOOL DE ${scoring.toUpperCase()}!`, '',
          `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`, '',
          `⏱ ${minFull} · En segundos te contamos quién anotó ⚽`, '',
          `#RODAI Sport`].join('\n');
        events.push({ partido_id:id, tipo:'goal_flash', detalle:`flash_${id}_${hs}_${as_}`,
          home, away, hs, as_, msg_wa:flashMsg, msg_tg:flashMsg });
      }
    } else {
      events.push({ partido_id:id, tipo:'goal', detalle:`goal_${id}_${hs}_${as_}`,
        home, away, hs, as_, scorer, assist, detail, elapsed: goalMin, narrative,
        msg_wa:msg, msg_tg:msg });
    }
  }

  // ── 3a. CORRECCIÓN VAR: el marcador BAJA (gol anulado tras revisión) ──────
  // Solo es bajada si la API trae un NÚMERO menor que prev (null = transición, NO bajada)
  const rawH = fix.goals?.home;
  const rawA = fix.goals?.away;
  const scoreDropped = (typeof rawH === 'number' && rawH < prev.hs) ||
                       (typeof rawA === 'number' && rawA < prev.as_);
  if (false && scoreDropped && ['1H','2H','ET','HT','BT','P'].includes(status)) { // 3a DESACTIVADO 12jun: falsos positivos por parpadeo de la API. Anulaciones reales van por 3b (evento VAR).
    const mAnul = [
      '🚫 GOL ANULADO', '',
      'El tanto no sube al marcador — revisión del VAR', '',
      `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`, '',
      `⏱ ${elapsed}'  ·  #RODAI Sport`
    ].join('\n');
    events.push({ partido_id:id, tipo:'var_anulado', detalle:`anul_${id}_${hs}_${as_}_${elapsed}`,
      home, away, hs, as_, elapsed, msg_wa:mAnul, msg_tg:mAnul });
    // prev.hs/as_ se actualizan al final via sd[id] = { hs, as_, ... } (holdGoal=false en bajadas)
  }

  // ── 3b. EVENTOS ESPECIALES: expulsiones, VAR, penales ─────────────────────
  const seenEvts = prev.evtSeen || [];
  const curSigs = [];
  for (const ev of fixEvts) {
    const sig = `${ev.type}|${ev.detail}|${ev.time?.elapsed||0}|${(ev.player?.name)||''}`;
    curSigs.push(sig);
    if (seenEvts.includes(sig)) continue;
    if (!['1H','2H','ET','HT','BT','P'].includes(status)) continue;
    const minE = `${ev.time?.elapsed||elapsed}'`;
    const fEv  = flag(ev.team?.name || '');
    const pl   = ev.player?.name || '';
    let tipoE = null, m = null;
    if (ev.type === 'Card' && ev.detail === 'Red Card') {
      tipoE = 'roja';
      m = [`🟥 ¡EXPULSIÓN!`, '', `${fEv} ${ev.team?.name} se queda con uno menos`, '',
           `👤 ${pl || 'Jugador'} ve la roja al ${minE}`, '', score, '', `#RODAI Sport`].join('\n');
    } else if (ev.type === 'Var') {
      const det = (ev.detail || '').toLowerCase();
      if (det.includes('cancelled') || det.includes('disallowed')) {
        tipoE = 'var_anulado';
        m = [`🚫 GOL ANULADO POR EL VAR`, '', `${fEv} ${ev.team?.name}${pl ? ' — el tanto de ' + pl : ''} no sube al marcador (${minE})`, '', score, '', `#RODAI Sport`].join('\n');
      } else if (det.includes('penalty confirmed') || det.includes('penalty awarded')) {
        tipoE = 'var_penal';
        m = [`⚠️ ¡PENAL! Confirmado por el VAR`, '', `${fEv} A favor de ${ev.team?.name} al ${minE}`, '', score, '', `#RODAI Sport`].join('\n');
      }
    } else if (ev.type === 'Goal' && ev.detail === 'Missed Penalty') {
      tipoE = 'penal_fallado';
      m = [`😱 ¡PENAL FALLADO!`, '', `${fEv} ${pl || 'El cobrador'} no pudo convertir al ${minE}`, '', score, '', `#RODAI Sport`].join('\n');
    }
    if (tipoE && m) {
      events.push({ partido_id:id, tipo:tipoE, detalle:('sp_'+id+'_'+sig).slice(0,190),
        home, away, hs, as_, msg_wa:m, msg_tg:m });
    }
  }

  // ── 4. FIN PRIMER TIEMPO ───────────────────────────────────────────────────
  if (status === 'HT' && !prev.htSent) {
    const goalsHT  = fixEvts.filter(e => e.type==='Goal' && (e.time?.elapsed||0) <= 45);
    const lines    = [
      '⏸ DESCANSO',
      '',
      `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`
    ];
    if (goalsHT.length) {
      lines.push('');
      goalsHT.forEach(g => lines.push(goalLine(g, id)));
    }
    lines.push('', `⏱ Fin del primer tiempo  ·  #RODAI Sport`);
    events.push({ partido_id:id, tipo:'halftime', detalle:`ht_${id}_${hs}_${as_}`,
      home, away, msg_wa:lines.join('\n'), msg_tg:lines.join('\n') });
  }

  // ── 5. INICIO 2DO TIEMPO ──────────────────────────────────────────────────
  if (status === '2H' && prev.status === 'HT' && !prev.h2Sent) {
    const msg = [
      '▶️ SEGUNDO TIEMPO',
      '',
      `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`,
      '',
      `⏱ Segunda mitad iniciada  ·  #RODAI Sport`
    ].join('\n');
    events.push({ partido_id:id, tipo:'h2_start', detalle:`h2_${id}`,
      home, away, msg_wa:msg, msg_tg:msg });
  }

  // ── 6. RESULTADO FINAL ────────────────────────────────────────────────────
  if (['FT','AET','PEN'].includes(status) && !prev.ftSent && home !== 'Local' && away !== 'Visitante') {
    const allGoals = fixEvts.filter(e => e.type === 'Goal');
    const allCards = fixEvts.filter(e => e.type === 'Card');
    const winner   = hs > as_ ? home : as_ > hs ? away : null;
    const mvpName  = mvp(allGoals, id);

    const lines = [
      '🏁 RESULTADO FINAL',
      '',
      `${fH} ${home}  ${hs} – ${as_}  ${away} ${fA}`
    ];

    if (allGoals.length) {
      lines.push('');
      allGoals.forEach(g => lines.push(goalLine(g, id)));
    }

    const yellowCards = allCards.filter(c => c.detail === 'Yellow Card');
    const redCards    = allCards.filter(c => c.detail === 'Red Card');
    if (yellowCards.length + redCards.length > 0) {
      lines.push('');
      yellowCards.forEach(c => lines.push(`🟨 ${expandName(id, c.player?.name)}  ${minStr(c)}`));
      redCards.forEach(c => lines.push(`🟥 ${expandName(id, c.player?.name)}  ${minStr(c)}`));
    }

    lines.push('');
    if (mvpName) lines.push(`⭐ MVP: ${mvpName}`);
    lines.push(winner ? `🏆 Ganador: ${winner}` : '🤝 Empate');
    lines.push('');
    lines.push(`📅 ${league}  ·  ⏱ Finalizado`);
    lines.push('#RODAI Sport');

    const nxt = getNextMx();
    if (nxt) {
      lines.push('');
      lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
      lines.push('📅 PRÓXIMO PARTIDO');
      lines.push('');
      lines.push(nxt.hf + ' ' + nxt.h + ' vs ' + nxt.a + ' ' + nxt.af);
      lines.push(nxt.d + ' · {{HORA_PROXIMO}}');
      lines.push('🏟️ ' + nxt.v);
    }
    const ftMsg = lines.join('\n');

    events.push({ partido_id:id, tipo:'fulltime', detalle:`ft_${id}_${hs}_${as_}`,
      home, away,
      next_match_utc_ts: nxt ? nxt.utc_ts : 0,
      msg_wa:ftMsg, msg_tg:ftMsg });
    globalSd['ftdone_' + id] = { ts: Date.now(), home, away, hs, as_ };
  }

  sd[id] = {
    hs: holdGoal ? prev.hs : hs,
    as_: holdGoal ? prev.as_ : as_,
    goalRetry: holdGoal ? (prev.goalRetry || 0) + 1 : 0,
    evtSeen: curSigs,
    home, away, missing: 0,
    status,
    kickoffSent : prev.kickoffSent || (status==='1H' && !['1H','2H','HT','ET'].includes(prev.status)),
    lineupSent  : prev.lineupSent  || (status==='1H' && elapsed>=1 && elapsed<=5),
    htSent      : prev.htSent      || (status==='HT'),
    h2Sent      : prev.h2Sent      || (status==='2H' && prev.status==='HT'),
    ftSent      : prev.ftSent      || ['FT','AET','PEN'].includes(status)
  };
}

// ── FT POR DESAPARICIÓN: el partido salió de live=all sin pasar por FT visible ──
const liveIds = new Set(fixtures.filter(f => ALLOWED_L.includes(f.league?.id)).map(f => String(f.fixture.id)));
for (const sid of Object.keys(sd)) {
  const st = sd[sid];
  if (!st || st.ftSent) continue;
  if (!['1H','2H','HT','ET','BT','P'].includes(st.status)) continue;
  if (liveIds.has(sid)) continue;
  st.missing = (st.missing || 0) + 1;
  if (st.missing < 2) continue; // confirmar 2 ciclos para evitar parpadeos de la API
  // GUARDIA: nunca enviar sin nombres reales de equipos
  if (!st.home || !st.away) { st.ftSent = true; continue; }
  const fH2 = flag(st.home); const fA2 = flag(st.away);
  const winner = st.hs > st.as_ ? st.home : (st.as_ > st.hs ? st.away : null);
  const lines = [
    '🏆 ¡FINAL DEL PARTIDO!', '',
    `${fH2} ${st.home}  ${st.hs} – ${st.as_}  ${st.away} ${fA2}`, '',
    winner ? `🏆 Ganador: ${winner}` : '🤝 Empate', '',
    '📊 ¿Qué te parecieron las alertas de hoy? Califícanos del 1 al 5 — responde solo con el número ⭐', '',
    '#RODAI Sport'];
  const nxt2 = getNextMx();
  if (nxt2) {
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('📅 PRÓXIMO PARTIDO');
    lines.push('');
    lines.push(nxt2.hf + ' ' + nxt2.h + ' vs ' + nxt2.a + ' ' + nxt2.af);
    lines.push(nxt2.d + ' · {{HORA_PROXIMO}}');
    lines.push('🏟️ ' + nxt2.v);
  }
  const m = lines.join('\n');
  events.push({ partido_id:sid, tipo:'fulltime', detalle:`ft_${sid}_${st.hs}_${st.as_}`,
    home: st.home || '', away: st.away || '', hs: st.hs, as_: st.as_,
    next_match_utc_ts: nxt2 ? nxt2.utc_ts : 0,
    msg_wa:m, msg_tg:m });
  globalSd['ftdone_' + sid] = { ts: Date.now(), home: st.home, away: st.away, hs: st.hs, as_: st.as_ };
  st.ftSent = true;
}

if (!events.length) return [{ json:{ events_count:0 } }];
return events.map(e => ({ json:{ ...e, events_count: events.length } }));
