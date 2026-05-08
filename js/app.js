// CLT Services — Auditoria 5S PWA
// app.js — lógica principal

// ─── Estado da aplicação ───────────────────────────────────
const state = {
  auditor: localStorage.getItem('clt_auditor') || '',
  auditoria: {
    area: '',
    auditor: '',
    data: new Date().toISOString().split('T')[0],
    scores: {},
    observacoes: '',
    recomendacoes: ''
  },
  stepAtual: 0,  // 0..4 → S1..S5
  historico: [],
  filtroArea: ''
};

// ─── Utilitários DOM ───────────────────────────────────────
const $ = id => document.getElementById(id);
const show = id => { const el = $(id); if (el) el.classList.remove('hidden'); };
const hide = id => { const el = $(id); if (el) el.classList.add('hidden'); };

function irPara(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(screenId);
  if (el) { el.classList.add('active'); el.scrollTop = 0; }
}

function mostrarToast(msg, tipo = 'info') {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast toast--' + tipo + ' visible';
  setTimeout(() => t.classList.remove('visible'), 3000);
}

// ─── Setup / Auditor ───────────────────────────────────────
function inicializar() {
  if (state.auditor) {
    $('auditor-nome-home').textContent = state.auditor;
    irPara('screen-home');
    carregarHistorico();
  } else {
    irPara('screen-setup');
  }
}

$('btn-setup-confirmar').addEventListener('click', () => {
  const nome = $('input-auditor-setup').value.trim();
  if (!nome) { mostrarToast('Introduza o seu nome', 'erro'); return; }
  state.auditor = nome;
  localStorage.setItem('clt_auditor', nome);
  $('auditor-nome-home').textContent = nome;
  irPara('screen-home');
  carregarHistorico();
});

$('btn-mudar-auditor').addEventListener('click', () => {
  $('input-auditor-setup').value = state.auditor;
  irPara('screen-setup');
});

// ─── Nova Auditoria ────────────────────────────────────────
$('btn-nova-auditoria').addEventListener('click', () => {
  state.auditoria = {
    area: '',
    auditor: state.auditor,
    data: new Date().toISOString().split('T')[0],
    scores: {},
    observacoes: '',
    recomendacoes: ''
  };
  state.stepAtual = 0;
  $('input-area').value = '';
  $('input-data').value = state.auditoria.data;
  $('input-auditor-display').value = state.auditor;
  irPara('screen-nova');
  sugerirAreas();
});

$('btn-voltar-home').addEventListener('click', () => irPara('screen-home'));
$('btn-voltar-home-2').addEventListener('click', () => irPara('screen-home'));
$('btn-voltar-home-hist').addEventListener('click', () => irPara('screen-home'));
$('btn-voltar-home-evol').addEventListener('click', () => irPara('screen-home'));

function sugerirAreas() {
  const areas = [...new Set(state.historico.map(a => a.area).filter(Boolean))];
  const datalist = $('areas-list');
  datalist.innerHTML = areas.map(a => `<option value="${a}">`).join('');
}

$('btn-iniciar-auditoria').addEventListener('click', () => {
  const area = $('input-area').value.trim();
  const data = $('input-data').value;
  if (!area) { mostrarToast('Indique a área/sector', 'erro'); return; }
  state.auditoria.area = area;
  state.auditoria.data = data;
  state.stepAtual = 0;
  renderizarStepAuditoria();
  irPara('screen-audit');
});

// ─── Ecrã de auditoria (Steps S1→S5) ──────────────────────
function renderizarStepAuditoria() {
  const s = CINCO_S[state.stepAtual];

  // Header
  $('audit-s-nome').textContent = s.nome + ' — ' + s.subtitulo;
  $('audit-s-descricao').textContent = s.descricao;
  $('audit-s-step').textContent = `${state.stepAtual + 1} / 5`;
  $('audit-header').style.borderColor = s.cor;
  $('audit-s-badge').style.background = s.cor;
  $('audit-s-badge').textContent = s.emoji;

  // Progress bar
  const pct = ((state.stepAtual) / 5) * 100;
  $('audit-progress-bar').style.width = pct + '%';
  $('audit-progress-bar').style.background = s.cor;

  // Critérios
  const container = $('criterios-container');
  container.innerHTML = '';
  s.criterios.forEach((c, idx) => {
    const score = state.auditoria.scores[c.id] || 0;
    const card = document.createElement('div');
    card.className = 'criterio-card';
    card.id = 'card-' + c.id;
    card.innerHTML = `
      <div class="criterio-header">
        <span class="criterio-num">${state.stepAtual + 1}.${idx + 1}</span>
        <span class="criterio-nome">${c.nome}</span>
      </div>
      <div class="score-selector" id="sel-${c.id}">
        ${[1,2,3,4,5].map(n => `
          <button class="score-btn ${score === n ? 'active' : ''}"
                  data-cid="${c.id}" data-score="${n}" data-idx="${idx}"
                  onclick="selecionarScore('${c.id}', ${n}, this)">
            ${n}
          </button>`).join('')}
      </div>
      <div class="descritor-box hidden" id="desc-${c.id}">
        <p class="descritor-texto" id="desc-texto-${c.id}"></p>
      </div>
    `;
    container.appendChild(card);
  });

  // Botão próximo/finalizar
  const btnNext = $('btn-proximo-s');
  if (state.stepAtual < 4) {
    btnNext.textContent = 'Próximo: ' + CINCO_S[state.stepAtual + 1].nome + ' →';
  } else {
    btnNext.textContent = 'Observações e Conclusão →';
  }
}

window.selecionarScore = function(cid, score, btnEl) {
  state.auditoria.scores[cid] = score;

  // Update buttons
  const sel = btnEl.closest('.score-selector');
  sel.querySelectorAll('.score-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Mostrar descritor
  const sIdx = state.stepAtual;
  const s = CINCO_S[sIdx];
  const c = s.criterios.find(c => c.id === cid);
  const descBox = $('desc-' + cid);
  const descTexto = $('desc-texto-' + cid);
  if (c && descBox && descTexto) {
    descTexto.textContent = score + ' — ' + c.descritores[score - 1];
    descBox.classList.remove('hidden');
    // Cor do descritor de acordo com o S
    descBox.style.borderColor = CINCO_S[sIdx].cor;
  }
};

$('btn-proximo-s').addEventListener('click', () => {
  // Verificar se todos os critérios estão preenchidos
  const s = CINCO_S[state.stepAtual];
  const naoPreenchidos = s.criterios.filter(c => !state.auditoria.scores[c.id]);
  if (naoPreenchidos.length > 0) {
    mostrarToast(`Faltam ${naoPreenchidos.length} critério(s) por avaliar`, 'erro');
    // Highlight cards sem score
    naoPreenchidos.forEach(c => {
      const card = $('card-' + c.id);
      if (card) { card.classList.add('card-erro'); setTimeout(() => card.classList.remove('card-erro'), 2000); }
    });
    return;
  }

  if (state.stepAtual < 4) {
    state.stepAtual++;
    renderizarStepAuditoria();
    $('screen-audit').scrollTop = 0;
  } else {
    irPara('screen-obs');
    $('input-obs').value = state.auditoria.observacoes || '';
    $('input-rec').value = state.auditoria.recomendacoes || '';
  }
});

$('btn-voltar-step').addEventListener('click', () => {
  if (state.stepAtual > 0) {
    state.stepAtual--;
    renderizarStepAuditoria();
  } else {
    irPara('screen-nova');
  }
});

// ─── Observações ───────────────────────────────────────────
$('btn-ver-resultado').addEventListener('click', () => {
  state.auditoria.observacoes = $('input-obs').value;
  state.auditoria.recomendacoes = $('input-rec').value;
  renderizarResultado();
  irPara('screen-resultado');
});

$('btn-voltar-obs').addEventListener('click', () => {
  state.stepAtual = 4;
  renderizarStepAuditoria();
  irPara('screen-audit');
});

// ─── Resultado ─────────────────────────────────────────────
let radarChart = null;

function renderizarResultado() {
  const res = calcularResultados(state.auditoria.scores);
  const sem = getSemaforo(res.geral.pct);

  // Score geral
  $('res-score-pct').textContent = res.geral.pct + '%';
  $('res-score-total').textContent = res.geral.total + ' / ' + res.geral.max + ' pontos';
  $('res-semaforo').textContent = sem.icone + ' ' + sem.label;
  $('res-semaforo').style.color = sem.cor;
  $('res-score-card').style.borderColor = sem.cor;

  // Área e data
  $('res-area').textContent = state.auditoria.area;
  $('res-data').textContent = formatarData(state.auditoria.data);
  $('res-auditor').textContent = state.auditoria.auditor;

  // Scores por S
  const listS = $('res-lista-s');
  listS.innerHTML = '';
  CINCO_S.forEach(s => {
    const r = res[s.id];
    const semS = getSemaforo(r.pct);
    listS.innerHTML += `
      <div class="res-s-item">
        <div class="res-s-header">
          <span class="res-s-badge" style="background:${s.cor}">${s.emoji} ${s.nome}</span>
          <span class="res-s-pct" style="color:${s.cor}">${r.pct}%</span>
        </div>
        <div class="res-s-bar-bg">
          <div class="res-s-bar-fill" style="width:${r.pct}%;background:${s.cor}"></div>
        </div>
        <span class="res-s-total">${r.total}/${r.max} — ${semS.label}</span>
      </div>`;
  });

  // Radar chart
  const ctx = $('radar-chart').getContext('2d');
  if (radarChart) radarChart.destroy();
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: CINCO_S.map(s => s.nome),
      datasets: [{
        label: state.auditoria.area,
        data: CINCO_S.map(s => res[s.id].pct),
        backgroundColor: 'rgba(0, 180, 216, 0.15)',
        borderColor: '#00B4D8',
        borderWidth: 2,
        pointBackgroundColor: CINCO_S.map(s => s.cor),
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 20, color: '#888', font: { size: 10 } },
          grid: { color: 'rgba(255,255,255,0.1)' },
          pointLabels: { color: '#ccc', font: { size: 11, family: 'Barlow' } }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

$('btn-guardar').addEventListener('click', guardarAuditoria);
$('btn-guardar-2').addEventListener('click', guardarAuditoria);

async function guardarAuditoria() {
  const res = calcularResultados(state.auditoria.scores);
  const doc = {
    ...state.auditoria,
    resultados: res,
    criadoEm: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    $('btn-guardar').disabled = true;
    $('btn-guardar').textContent = 'A guardar...';
    await db.collection('auditorias').add(doc);
    mostrarToast('Auditoria guardada com sucesso!', 'sucesso');
    await carregarHistorico();
    setTimeout(() => irPara('screen-home'), 1500);
  } catch (err) {
    console.error(err);
    mostrarToast('Erro ao guardar. Verifique a configuração Firebase.', 'erro');
  } finally {
    $('btn-guardar').disabled = false;
    $('btn-guardar').textContent = '💾 Guardar Auditoria';
  }
}

$('btn-voltar-obs-2').addEventListener('click', () => irPara('screen-obs'));

// ─── Histórico ─────────────────────────────────────────────
async function carregarHistorico() {
  try {
    const snap = await db.collection('auditorias').orderBy('data', 'desc').limit(200).get();
    state.historico = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderizarHistorico();
    renderizarHomeDashboard();
    actualizarFiltroAreas();
  } catch (err) {
    console.error('Erro ao carregar histórico:', err);
  }
}

function actualizarFiltroAreas() {
  const areas = [...new Set(state.historico.map(a => a.area).filter(Boolean))].sort();
  const sel = $('filtro-area');
  const atual = sel.value;
  sel.innerHTML = '<option value="">Todas as áreas</option>';
  areas.forEach(a => { sel.innerHTML += `<option value="${a}" ${a===atual?'selected':''}>${a}</option>`; });
}

function renderizarHistorico() {
  const lista = $('historico-lista');
  let dados = state.historico;
  if (state.filtroArea) dados = dados.filter(a => a.area === state.filtroArea);
  if (!dados.length) {
    lista.innerHTML = '<p class="vazio">Sem auditorias registadas.</p>';
    return;
  }
  lista.innerHTML = dados.map(a => {
    const res = a.resultados?.geral || { pct: 0 };
    const sem = getSemaforo(res.pct);
    return `
      <div class="hist-card" onclick="verAuditoria('${a.id}')">
        <div class="hist-header">
          <span class="hist-area">${a.area}</span>
          <span class="hist-pct" style="color:${sem.cor}">${res.pct}% ${sem.icone}</span>
        </div>
        <div class="hist-meta">
          <span>📅 ${formatarData(a.data)}</span>
          <span>👤 ${a.auditor}</span>
        </div>
        <div class="hist-bars">
          ${CINCO_S.map(s => `<div class="hist-bar-mini" title="${s.nome}: ${a.resultados?.[s.id]?.pct||0}%">
            <div style="width:${a.resultados?.[s.id]?.pct||0}%;background:${s.cor}"></div>
          </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}

$('filtro-area').addEventListener('change', e => {
  state.filtroArea = e.target.value;
  renderizarHistorico();
});

$('btn-historico').addEventListener('click', () => {
  irPara('screen-historico');
  renderizarHistorico();
  actualizarFiltroAreas();
});

// ─── Ver Auditoria (detalhe do histórico) ─────────────────
window.verAuditoria = function(id) {
  const a = state.historico.find(x => x.id === id);
  if (!a) return;
  // Restaurar state para mostrar resultado
  state.auditoria = { ...a };
  renderizarResultado();
  irPara('screen-resultado');
  // Esconder botão guardar (já está guardada)
  $('btn-guardar').style.display = 'none';
  $('btn-guardar-2').style.display = 'none';
};

// Repor botões guardar ao iniciar nova auditoria
$('btn-nova-auditoria').addEventListener('click', () => {
  $('btn-guardar').style.display = '';
  $('btn-guardar-2').style.display = '';
}, true);

// ─── Dashboard Home ────────────────────────────────────────
function renderizarHomeDashboard() {
  const total = state.historico.length;
  $('stat-total').textContent = total;

  const areas = new Set(state.historico.map(a => a.area).filter(Boolean));
  $('stat-areas').textContent = areas.size;

  if (total > 0) {
    const ultimo = state.historico[0];
    const res = ultimo.resultados?.geral || { pct: 0 };
    const sem = getSemaforo(res.pct);
    $('ultima-area').textContent = ultimo.area;
    $('ultima-data').textContent = formatarData(ultimo.data);
    $('ultima-pct').textContent = res.pct + '%';
    $('ultima-pct').style.color = sem.cor;
    $('ultima-label').textContent = sem.icone + ' ' + sem.label;
    show('card-ultima');
  } else {
    hide('card-ultima');
  }
}

// ─── Evolução ──────────────────────────────────────────────
let evolucaoChart = null;

$('btn-evolucao').addEventListener('click', () => {
  irPara('screen-evolucao');
  actualizarFiltroAreasEvol();
  renderizarEvolucao();
});

function actualizarFiltroAreasEvol() {
  const areas = [...new Set(state.historico.map(a => a.area).filter(Boolean))].sort();
  const sel = $('filtro-area-evol');
  sel.innerHTML = '<option value="">Todas as áreas</option>';
  areas.forEach(a => { sel.innerHTML += `<option value="${a}">${a}</option>`; });
}

$('filtro-area-evol').addEventListener('change', renderizarEvolucao);

function renderizarEvolucao() {
  const filtroArea = $('filtro-area-evol').value;
  let dados = [...state.historico].reverse(); // cronológico
  if (filtroArea) dados = dados.filter(a => a.area === filtroArea);

  if (!dados.length) {
    if (evolucaoChart) { evolucaoChart.destroy(); evolucaoChart = null; }
    $('evol-vazio').classList.remove('hidden');
    return;
  }
  $('evol-vazio').classList.add('hidden');

  const labels = dados.map(a => formatarDataCurta(a.data));

  const datasets = CINCO_S.map(s => ({
    label: s.nome,
    data: dados.map(a => a.resultados?.[s.id]?.pct || 0),
    borderColor: s.cor,
    backgroundColor: s.cor + '22',
    tension: 0.3,
    borderWidth: 2,
    pointRadius: 4,
    pointBackgroundColor: s.cor
  }));

  // Score geral
  datasets.push({
    label: 'Score Geral',
    data: dados.map(a => a.resultados?.geral?.pct || 0),
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderDash: [6, 3],
    tension: 0.3,
    pointRadius: 5,
    pointBackgroundColor: '#ffffff'
  });

  const ctx = $('evolucao-chart').getContext('2d');
  if (evolucaoChart) evolucaoChart.destroy();
  evolucaoChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0, max: 100,
          ticks: { callback: v => v + '%', color: '#aaa', stepSize: 20 },
          grid: { color: 'rgba(255,255,255,0.08)' }
        },
        x: {
          ticks: { color: '#aaa', maxRotation: 45 },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#ddd', font: { size: 11, family: 'Barlow' }, boxWidth: 16 }
        },
        tooltip: {
          callbacks: { label: ctx => ctx.dataset.label + ': ' + ctx.raw + '%' }
        }
      }
    }
  });
}

// ─── Utilitários de data ────────────────────────────────────
function formatarData(d) {
  if (!d) return '';
  const [y, m, dia] = d.split('-');
  return `${dia}/${m}/${y}`;
}
function formatarDataCurta(d) {
  if (!d) return '';
  const [y, m, dia] = d.split('-');
  return `${dia}/${m}/${y.slice(2)}`;
}

// ─── Arrancar ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', inicializar);
