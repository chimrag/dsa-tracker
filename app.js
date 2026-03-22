// ─── STATE ────────────────────────────────────────────────────────────────────
const STATE_KEY = 'dsa_tracker_v2';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); } catch { return {}; }
}
function saveState(s) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(s)); } catch {}
}

let state = loadState();

function getQ(topicId, qName) {
  return (state[topicId] && state[topicId][qName]) || 'none';
}
function setQ(topicId, qName, val) {
  if (!state[topicId]) state[topicId] = {};
  state[topicId][qName] = val;
  saveState(state);
}

// ─── SCORING ─────────────────────────────────────────────────────────────────
function calcScore(topic) {
  let total = 0, points = 0;
  topic.sections.forEach(s => s.questions.forEach(q => {
    const w = q.tag === 'hard' ? 3 : q.tag === 'medium' ? 2 : 1;
    const st = getQ(topic.id, q.name);
    total += w;
    if (st === 'solved') points += w;
    else if (st === 'attempted') points += w * 0.4;
  }));
  return total === 0 ? 0 : Math.round((points / total) * 100);
}

function totalQuestions(topic) {
  return topic.sections.reduce((a, s) => a + s.questions.length, 0);
}

function solvedCount(topic) {
  let n = 0;
  topic.sections.forEach(s => s.questions.forEach(q => {
    if (getQ(topic.id, q.name) === 'solved') n++;
  }));
  return n;
}

function verdict(score) {
  if (score >= 80) return {
    cls: 'v-ready', label: 'Ready to move on',
    msg: "Strong command of this topic. Move forward — revisiting hard problems after covering more ground is far more effective than grinding the same concept."
  };
  if (score >= 50) return {
    cls: 'v-almost', label: 'Getting there',
    msg: "Core mechanics are forming. Push through the unsolved mediums — those are the real interview staples. Don't let perfect block progress."
  };
  return {
    cls: 'v-notyet', label: 'Keep going',
    msg: "Start with easy problems: read the concept hint, code it, then mark solved or attempted. Two problems a day with genuine understanding beats ten rushed ones."
  };
}

// ─── OVERALL STATS ────────────────────────────────────────────────────────────
function overallStats() {
  let totalQ = 0, solved = 0, attempted = 0, mastered = 0;
  TOPICS.forEach(t => {
    totalQ += totalQuestions(t);
    t.sections.forEach(s => s.questions.forEach(q => {
      const st = getQ(t.id, q.name);
      if (st === 'solved') solved++;
      else if (st === 'attempted') attempted++;
    }));
    if (calcScore(t) >= 80) mastered++;
  });
  return { totalQ, solved, attempted, mastered };
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function renderSidebar() {
  const stats = overallStats();
  const pct = Math.round((stats.solved / stats.totalQ) * 100);

  // Ring
  const circumference = 2 * Math.PI * 19;
  const fill = document.getElementById('ring-fill');
  fill.style.strokeDasharray = `${(pct / 100) * circumference} ${circumference}`;
  document.getElementById('ring-pct').textContent = pct + '%';

  // Quick stats
  document.getElementById('quick-stats').innerHTML = `
    <div class="qs-row"><span class="qs-dot solved-dot"></span><span>${stats.solved} solved</span></div>
    <div class="qs-row"><span class="qs-dot attempted-dot"></span><span>${stats.attempted} attempted</span></div>
    <div class="qs-row"><span class="qs-dot mastered-dot"></span><span>${stats.mastered}/${TOPICS.length} topics mastered</span></div>
  `;

  // Nav items
  const nav = document.getElementById('topic-nav');
  nav.innerHTML = TOPICS.map((t, i) => {
    const sc = calcScore(t);
    const isMastered = sc >= 80;
    const isActive = currentTopicId === t.id;
    const solved = solvedCount(t);
    const total = totalQuestions(t);
    return `
      <button class="nav-item ${isActive ? 'active' : ''} ${isMastered ? 'mastered' : ''}"
              onclick="showTopic('${t.id}')">
        <span class="nav-icon">${t.icon}</span>
        <span class="nav-label">
          <span class="nav-name">${t.name}</span>
          <span class="nav-meta">${solved}/${total} solved</span>
        </span>
        <span class="nav-score ${isMastered ? 'score-green' : sc > 0 ? 'score-amber' : ''}">${sc > 0 ? sc + '%' : ''}</span>
        ${isMastered ? '<span class="nav-check">✓</span>' : ''}
      </button>
    `;
  }).join('');
}

// ─── HOME VIEW ────────────────────────────────────────────────────────────────
function renderHome() {
  const stats = overallStats();
  const view = document.getElementById('home-view');

  const topicsHTML = TOPICS.map((t, i) => {
    const sc = calcScore(t);
    const isMastered = sc >= 80;
    const solved = solvedCount(t);
    const total = totalQuestions(t);
    const barColor = isMastered ? 'var(--c-green)' : sc > 0 ? 'var(--c-amber)' : 'var(--c-border)';
    return `
      <div class="topic-card ${isMastered ? 'card-mastered' : ''}" onclick="showTopic('${t.id}')">
        <div class="tc-top">
          <div class="tc-icon">${t.icon}</div>
          <div class="tc-info">
            <div class="tc-name">${t.name}</div>
            <div class="tc-meta">${total} problems</div>
          </div>
          ${isMastered ? '<div class="tc-badge">Mastered</div>' : ''}
        </div>
        <div class="tc-bar-track">
          <div class="tc-bar-fill" style="width:${sc}%;background:${barColor}"></div>
        </div>
        <div class="tc-footer">
          <span class="tc-solved">${solved} solved</span>
          <span class="tc-pct" style="color:${isMastered ? 'var(--c-green)' : sc > 0 ? 'var(--c-amber)' : 'var(--c-text-muted)'}">${sc}%</span>
        </div>
      </div>
    `;
  }).join('');

  view.innerHTML = `
    <div class="home-content">
      <header class="home-header">
        <div class="home-title-row">
          <h1>Your DSA Roadmap</h1>
          <p class="home-subtitle">Know exactly when you're ready to move on.</p>
        </div>
        <div class="hero-stats">
          <div class="hs-card">
            <div class="hs-num">${stats.solved}</div>
            <div class="hs-label">Problems solved</div>
          </div>
          <div class="hs-card">
            <div class="hs-num">${stats.mastered}</div>
            <div class="hs-label">Topics mastered</div>
          </div>
          <div class="hs-card">
            <div class="hs-num">${TOPICS.length - stats.mastered}</div>
            <div class="hs-label">Topics remaining</div>
          </div>
        </div>
      </header>

      <div class="how-it-works">
        <div class="hiw-title">How readiness works</div>
        <div class="hiw-cards">
          <div class="hiw-card">
            <div class="hiw-icon" style="background:var(--c-green-bg);color:var(--c-green)">✓</div>
            <div><strong>Solved</strong> = full weight</div>
          </div>
          <div class="hiw-card">
            <div class="hiw-icon" style="background:var(--c-amber-bg);color:var(--c-amber)">~</div>
            <div><strong>Attempted</strong> = 40% weight</div>
          </div>
          <div class="hiw-card">
            <div class="hiw-icon" style="background:var(--c-red-bg);color:var(--c-red)">!</div>
            <div>Hard problems = 3× weight</div>
          </div>
          <div class="hiw-card">
            <div class="hiw-icon" style="background:var(--c-blue-bg);color:var(--c-blue)">80</div>
            <div><strong>80%+</strong> = move on</div>
          </div>
        </div>
      </div>

      <div class="topics-grid">${topicsHTML}</div>
    </div>
  `;
}

// ─── TOPIC VIEW ───────────────────────────────────────────────────────────────
let currentTopicId = null;
let openCards = {};

function showTopic(topicId) {
  currentTopicId = topicId;
  document.getElementById('home-view').classList.remove('active');
  document.getElementById('topic-view').classList.add('active');
  // close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  renderTopicView();
  renderSidebar();
  window.scrollTo(0, 0);
}

function showHome() {
  currentTopicId = null;
  document.getElementById('topic-view').classList.remove('active');
  document.getElementById('home-view').classList.add('active');
  renderHome();
  renderSidebar();
}

function renderTopicView() {
  const topic = TOPICS.find(t => t.id === currentTopicId);
  if (!topic) return;

  const sc = calcScore(topic);
  const v = verdict(sc);
  const idx = TOPICS.findIndex(t => t.id === topic.id);
  const prev = TOPICS[idx - 1];
  const next = TOPICS[idx + 1];
  const barColor = sc >= 80 ? 'var(--c-green)' : sc >= 50 ? 'var(--c-amber)' : 'var(--c-red)';

  const sectionsHTML = topic.sections.map((sec, si) => `
    <div class="sec-block">
      <div class="sec-header">
        <div class="sec-title">${sec.title}</div>
        <div class="sec-prog">${sec.questions.filter(q => getQ(topic.id, q.name) === 'solved').length}/${sec.questions.length} solved</div>
      </div>
      ${sec.questions.map((q, qi) => {
        const st = getQ(topic.id, q.name);
        const cardKey = `${si}-${qi}`;
        const isOpen = !!openCards[currentTopicId + cardKey];
        return `
          <div class="q-card ${st}" data-key="${cardKey}" onclick="toggleCard('${cardKey}')">
            <div class="q-row">
              <div class="q-dot ${st}"></div>
              <div class="q-name">${q.name}</div>
              <span class="q-tag t-${q.tag}">${q.tag}</span>
              <span class="q-chevron ${isOpen ? 'open' : ''}">›</span>
            </div>
            <div class="q-body ${isOpen ? 'open' : ''}">
              <div class="q-concept">${q.concept}</div>
              <div class="q-actions">
                <button class="qa-btn qa-solve ${st === 'solved' ? 'active' : ''}"
                  onclick="event.stopPropagation();markQ('${topic.id}','${q.name.replace(/'/g,"\\'")}','solved')">
                  Mark solved
                </button>
                <button class="qa-btn qa-attempt ${st === 'attempted' ? 'active' : ''}"
                  onclick="event.stopPropagation();markQ('${topic.id}','${q.name.replace(/'/g,"\\'")}','attempted')">
                  Attempted
                </button>
                <button class="qa-btn qa-reset"
                  onclick="event.stopPropagation();markQ('${topic.id}','${q.name.replace(/'/g,"\\'")}','none')">
                  Reset
                </button>
                <a class="qa-btn qa-lc" href="${q.leetcode}" target="_blank" rel="noopener"
                  onclick="event.stopPropagation()">
                  LeetCode ↗
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `).join('');

  document.getElementById('topic-view').innerHTML = `
    <div class="topic-content">
      <div class="topic-nav-row">
        <button class="back-btn" onclick="showHome()">← All topics</button>
        <div class="topic-pager">
          ${prev ? `<button class="pager-btn" onclick="showTopic('${prev.id}')">← ${prev.name}</button>` : ''}
          ${next ? `<button class="pager-btn" onclick="showTopic('${next.id}')">${next.name} →</button>` : ''}
        </div>
      </div>

      <div class="topic-hero">
        <div class="th-left">
          <div class="th-icon">${topic.icon}</div>
          <div>
            <h1 class="th-title">${topic.name}</h1>
            <p class="th-why">${topic.why}</p>
          </div>
        </div>
        <div class="th-score-block">
          <div class="th-pct" style="color:${barColor}">${sc}%</div>
          <div class="th-pct-label">readiness</div>
        </div>
      </div>

      <div class="score-bar-wrap">
        <div class="score-bar-track">
          <div class="score-bar-fill" style="width:${sc}%;background:${barColor}"></div>
        </div>
      </div>

      <div class="verdict-box ${v.cls}">
        <div class="vb-label">${v.label}</div>
        <div class="vb-msg">${v.msg}</div>
      </div>

      <div class="sections">${sectionsHTML}</div>

      <div class="bottom-nav">
        ${prev ? `<button class="pager-btn pager-lg" onclick="showTopic('${prev.id}')">← ${prev.name}</button>` : '<div></div>'}
        ${next ? `<button class="pager-btn pager-lg" onclick="showTopic('${next.id}')">${next.name} →</button>` : '<div></div>'}
      </div>
    </div>
  `;
}

window.toggleCard = function(key) {
  const ck = currentTopicId + key;
  openCards[ck] = !openCards[ck];
  renderTopicView();
};

window.markQ = function(topicId, qName, val) {
  setQ(topicId, qName, val);
  renderTopicView();
  renderSidebar();
};

// ─── RESET ────────────────────────────────────────────────────────────────────
document.getElementById('reset-all-btn').addEventListener('click', () => {
  if (confirm('Reset all progress? This cannot be undone.')) {
    state = {};
    saveState(state);
    openCards = {};
    currentTopicId ? renderTopicView() : renderHome();
    renderSidebar();
  }
});

// ─── HAMBURGER ────────────────────────────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
renderSidebar();
renderHome();
