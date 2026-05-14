const fs = require("fs");
const path = require("path");

const sourcePath =
  "C:/Users/ihsan/OneDrive - Universiti Tenaga Nasional/trimester 2 2526/SOFTSEC CCSB5113/SLIDE/focus_subtopic.md";
const outPath = path.join(process.cwd(), "index.html");

const markdown = fs.readFileSync(sourcePath, "utf8");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Software Security | Interactive Study Notes</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;500;600;700&display=swap');

  :root {
    --bg: #070b12;
    --bg2: #0d1421;
    --bg3: #121d2e;
    --card: #101827;
    --border: #22314a;
    --accent: #00d4ff;
    --accent2: #ff7043;
    --accent3: #8b5cf6;
    --green: #12c48b;
    --yellow: #f6b73c;
    --red: #ff5d6c;
    --text: #e7edf7;
    --muted: #91a1b7;
    --sidebar-w: 292px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Sora', system-ui, sans-serif;
    background:
      radial-gradient(circle at 82% 10%, rgba(0, 212, 255, .11), transparent 26rem),
      linear-gradient(180deg, #070b12 0%, #0a101b 44%, #070b12 100%);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  #hamburger {
    display: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 200;
    width: 42px;
    height: 38px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--bg2);
    color: var(--text);
    font-size: 19px;
    cursor: pointer;
  }

  #sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: var(--sidebar-w);
    background: rgba(13, 20, 33, .97);
    border-right: 1px solid var(--border);
    overflow-y: auto;
    z-index: 100;
    transition: transform .28s ease;
  }

  .sidebar-header {
    position: sticky;
    top: 0;
    z-index: 2;
    padding: 20px 16px 14px;
    background: rgba(13, 20, 33, .98);
    border-bottom: 1px solid var(--border);
  }

  .sidebar-header h1 {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    letter-spacing: 1.6px;
    color: var(--accent);
    text-transform: uppercase;
  }

  .sidebar-header p {
    margin-top: 4px;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.45;
  }

  #search-bar {
    width: 100%;
    margin-top: 12px;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--bg3);
    color: var(--text);
    font: 13px 'Sora', sans-serif;
    outline: none;
  }

  #search-bar:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0, 212, 255, .08); }
  .nav-group { padding: 9px 0; }
  .nav-group-title {
    padding: 8px 16px 4px;
    color: var(--muted);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 16px;
    border-left: 2px solid transparent;
    color: var(--muted);
    text-decoration: none;
    font-size: 12.5px;
    line-height: 1.35;
    cursor: pointer;
    transition: background .15s, color .15s, border-color .15s;
  }

  .nav-item:hover, .nav-item.active {
    color: var(--text);
    background: var(--bg3);
    border-left-color: var(--accent);
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    flex: 0 0 auto;
  }
  .dot.vc { background: var(--red); }
  .dot.imp { background: var(--yellow); }
  .dot.bas { background: var(--green); }

  #main {
    margin-left: var(--sidebar-w);
    min-height: 100vh;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 90;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    padding: 12px 32px;
    background: rgba(7, 11, 18, .92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }

  .filter-label { font-size: 12px; color: var(--muted); }
  .filter-btn, .print-btn, .expand-btn {
    border: 1px solid var(--border);
    border-radius: 999px;
    background: transparent;
    color: var(--muted);
    padding: 6px 13px;
    font: 12px 'Sora', sans-serif;
    cursor: pointer;
    transition: all .15s;
  }

  .filter-btn:hover, .expand-btn:hover { border-color: var(--accent); color: var(--accent); }
  .filter-btn.active-filter {
    border-color: var(--accent);
    background: var(--accent);
    color: #00121a;
    font-weight: 700;
  }
  .print-btn {
    margin-left: auto;
    border-radius: 7px;
    border-color: var(--accent);
    color: var(--accent);
  }
  .print-btn:hover { background: var(--accent); color: #00121a; }

  #content {
    max-width: 1120px;
    padding: 32px;
  }

  .hero {
    position: relative;
    min-height: 300px;
    display: grid;
    align-content: end;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
    background:
      linear-gradient(rgba(7, 11, 18, .18), rgba(7, 11, 18, .9)),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500" viewBox="0 0 1200 500"><rect width="1200" height="500" fill="%23070b12"/><g opacity=".33" stroke="%2300d4ff" stroke-width="1"><path d="M0 110H1200M0 210H1200M0 310H1200M0 410H1200M100 0V500M250 0V500M400 0V500M550 0V500M700 0V500M850 0V500M1000 0V500"/></g><g fill="none" stroke="%23ff7043" stroke-width="3" opacity=".7"><path d="M80 360 C230 260 330 380 470 280 S790 150 1040 240"/><circle cx="470" cy="280" r="8"/><circle cx="790" cy="190" r="8"/><circle cx="1040" cy="240" r="8"/></g><g fill="%238b5cf6" opacity=".58"><rect x="120" y="120" width="120" height="26" rx="4"/><rect x="830" y="330" width="170" height="26" rx="4"/><rect x="560" y="88" width="130" height="26" rx="4"/></g></svg>') center/cover;
    padding: 36px 32px;
  }

  .hero-inner { max-width: 920px; position: relative; z-index: 1; }
  .hero h1 {
    font-family: 'Space Mono', monospace;
    color: var(--accent);
    font-size: clamp(26px, 4vw, 46px);
    line-height: 1.08;
    margin-bottom: 10px;
  }
  .hero p { max-width: 720px; color: #c5d2e4; font-size: 14px; line-height: 1.7; }
  .hero-stats {
    display: flex;
    gap: 22px;
    flex-wrap: wrap;
    margin-top: 22px;
  }
  .hero-stat { min-width: 82px; }
  .hero-stat .num {
    display: block;
    font-family: 'Space Mono', monospace;
    color: var(--accent2);
    font-size: 23px;
  }
  .hero-stat .lbl {
    color: var(--muted);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .section {
    margin-bottom: 42px;
    scroll-margin-top: 70px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .section-num {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    background: rgba(0, 212, 255, .1);
    border: 1px solid rgba(0, 212, 255, .16);
    border-radius: 5px;
    padding: 4px 8px;
    flex: 0 0 auto;
  }
  .section h2 { font-size: 22px; line-height: 1.25; }
  .importance-tag {
    margin-left: auto;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .6px;
  }
  .tag-vc { background: rgba(255, 93, 108, .12); color: var(--red); border: 1px solid rgba(255, 93, 108, .28); }
  .tag-imp { background: rgba(246, 183, 60, .12); color: var(--yellow); border: 1px solid rgba(246, 183, 60, .28); }
  .tag-bas { background: rgba(18, 196, 139, .12); color: var(--green); border: 1px solid rgba(18, 196, 139, .28); }

  .card, .collapsible {
    background: rgba(16, 24, 39, .92);
    border: 1px solid var(--border);
    border-radius: 8px;
    margin-bottom: 14px;
    overflow: hidden;
  }
  .card { padding: 18px; }
  .card h3, .content-block h3 { color: var(--accent); font-size: 15px; margin: 14px 0 10px; }
  .card h4, .content-block h4 { color: var(--yellow); font-size: 13px; margin: 14px 0 7px; }
  .content-block h5 { color: var(--green); font-size: 12px; margin: 12px 0 6px; }
  p, li { color: var(--text); font-size: 13.5px; line-height: 1.75; }
  p { margin: 8px 0; }
  ul, ol { margin: 8px 0 10px 21px; }
  li { margin-bottom: 3px; }
  strong { color: #ffffff; }
  a { color: var(--accent); }
  code {
    font-family: 'Space Mono', monospace;
    color: var(--accent);
    background: var(--bg3);
    border: 1px solid rgba(255,255,255,.04);
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 12px;
  }
  pre {
    margin: 12px 0;
    padding: 15px;
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #0a111d;
    color: var(--accent);
    font: 12px/1.6 'Space Mono', monospace;
  }
  pre code { border: 0; background: transparent; padding: 0; color: inherit; }
  blockquote {
    margin: 12px 0;
    padding: 12px 15px;
    border-left: 3px solid var(--accent);
    border-radius: 7px;
    background: rgba(0, 212, 255, .07);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 13px;
  }
  th {
    color: var(--accent);
    background: var(--bg3);
    text-align: left;
    font-size: 12px;
    font-weight: 700;
  }
  th, td {
    border: 1px solid var(--border);
    padding: 9px 11px;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: rgba(255,255,255,.025); }
  hr { border: 0; border-top: 1px solid var(--border); margin: 18px 0; }

  .collapsible-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    padding: 13px 16px;
    border: 0;
    background: var(--bg3);
    color: var(--text);
    font: 700 13.5px 'Sora', sans-serif;
    text-align: left;
    cursor: pointer;
  }
  .collapsible-header:hover { background: #18243a; }
  .collapsible-header .arrow { color: var(--muted); transition: transform .2s; }
  .collapsible.open .collapsible-header .arrow { transform: rotate(180deg); }
  .collapsible-body {
    display: none;
    padding: 15px 16px 16px;
    border-top: 1px solid var(--border);
  }
  .collapsible.open .collapsible-body { display: block; }

  .checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid var(--border);
  }
  .checklist-item:last-child { border-bottom: 0; }
  .checklist-item input {
    width: 16px;
    height: 16px;
    margin-top: 3px;
    accent-color: var(--accent);
    flex: 0 0 auto;
  }
  .checklist-item label {
    color: var(--text);
    font-size: 13.2px;
    line-height: 1.55;
    cursor: pointer;
  }
  .checklist-item input:checked + label { color: var(--muted); text-decoration: line-through; }

  .cheat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
  }
  .cheat-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg3);
    padding: 14px;
  }
  .cheat-card h4 {
    font-family: 'Space Mono', monospace;
    color: var(--accent2);
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 8px;
    padding-bottom: 7px;
    border-bottom: 1px solid var(--border);
  }

  .hidden { display: none !important; }
  mark {
    color: inherit;
    background: rgba(0, 212, 255, .24);
    border-radius: 3px;
    padding: 0 2px;
  }

  @media (max-width: 820px) {
    #sidebar { transform: translateX(-100%); }
    #sidebar.open { transform: translateX(0); box-shadow: 24px 0 44px rgba(0,0,0,.36); }
    #main { margin-left: 0; }
    #hamburger { display: block; }
    .topbar { padding-left: 62px; padding-right: 16px; }
    #content { padding: 20px 16px 28px; }
    .hero { padding: 74px 18px 26px; min-height: 360px; }
    .section-header { align-items: flex-start; }
    .importance-tag { margin-left: 0; }
    table { display: block; overflow-x: auto; white-space: nowrap; }
  }

  @media print {
    body { background: white; color: #111; }
    #sidebar, #hamburger, .topbar { display: none !important; }
    #main { margin-left: 0; }
    #content { max-width: none; padding: 0; }
    .hero { color: #111; background: white; min-height: 0; padding: 0 0 18px; }
    .hero h1, h2, h3, h4, p, li, td, th { color: #111 !important; }
    .card, .collapsible, blockquote, pre { background: white; border-color: #bbb; }
    .collapsible-body { display: block !important; }
    .section { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<button id="hamburger" aria-label="Open navigation">☰</button>
<nav id="sidebar">
  <div class="sidebar-header">
    <h1>CCSB5133</h1>
    <p>Software Security interactive focus notes</p>
    <input id="search-bar" type="search" placeholder="Search topics...">
  </div>
  <div id="nav"></div>
</nav>
<main id="main">
  <div class="topbar">
    <span class="filter-label">Filter:</span>
    <button class="filter-btn active-filter" data-filter="all">All Topics</button>
    <button class="filter-btn" data-filter="vc">Very Critical</button>
    <button class="filter-btn" data-filter="imp">Important</button>
    <button class="filter-btn" data-filter="bas">Basic</button>
    <button class="expand-btn" id="expand-all">Expand All</button>
    <button class="print-btn" id="print-page">Print / PDF</button>
  </div>
  <section class="hero" id="hero">
    <div class="hero-inner">
      <h1>Software Security</h1>
      <p>Interactive study dashboard recreated from your focus_subtopic.md. Use the sidebar, search, progress checklist, filters, collapsible topics, and print mode to revise faster.</p>
      <div class="hero-stats" id="hero-stats"></div>
    </div>
  </section>
  <div id="content"></div>
</main>
<script id="source-md" type="text/plain">${escapeScript(markdown)}</script>
<script>
const rawMarkdown = document.getElementById('source-md').textContent;
const content = document.getElementById('content');
const nav = document.getElementById('nav');
const searchInput = document.getElementById('search-bar');
let sections = [];
let activeFilter = 'all';

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, '')
    .trim()
    .replace(/\\s+/g, '-')
    .slice(0, 70) || 'section';
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function inlineMd(value) {
  let s = escapeHtml(value);
  s = s.replace(/\\\`([^\\\`]+)\\\`/g, '<code>$1</code>');
  s = s.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
  s = s.replace(/\\*([^*]+)\\*/g, '<em>$1</em>');
  s = s.replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2">$1</a>');
  return s;
}

function sectionImportance(title, body) {
  const text = (title + ' ' + body).toLowerCase();
  if (/deep focus|golden rules|quick reference|cheat sheet|broken authentication|sql injection|xss|lfi|rfi|buffer overflow|static analysis|risk|threat modeling|access control|owasp/.test(text)) return 'vc';
  if (/important|framework|sdlc|secure|testing|tools|techniques|authentication|authorization|logging|debugging/.test(text)) return 'imp';
  return 'bas';
}

function importanceLabel(level) {
  if (level === 'vc') return 'VERY CRITICAL';
  if (level === 'imp') return 'IMPORTANT';
  return 'BASIC';
}

function parseSections(md) {
  const lines = md.replace(/\\r\\n/g, '\\n').split('\\n');
  const out = [];
  let current = null;
  for (const line of lines) {
    const m = line.match(/^(#{1,2})\\s+(.+)$/);
    if (m && !/^###/.test(line)) {
      if (current) out.push(current);
      current = { title: m[2].trim(), level: m[1].length, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) out.push(current);
  return out.map((s, index) => {
    const id = slugify(s.title) + '-' + index;
    const body = s.lines.join('\\n');
    return { ...s, id, importance: sectionImportance(s.title, body), index: index + 1 };
  });
}

function renderMarkdown(lines) {
  let html = '';
  let inCode = false;
  let code = [];
  let paragraph = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html += '<p>' + inlineMd(paragraph.join(' ')) + '</p>';
      paragraph = [];
    }
  };
  const closeList = () => {
    if (listType) {
      html += '</' + listType + '>';
      listType = null;
    }
  };
  const flushCode = () => {
    html += '<pre><code>' + escapeHtml(code.join('\\n')) + '</code></pre>';
    code = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith(String.fromCharCode(96, 96, 96))) {
      flushParagraph();
      closeList();
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    if (/^\\s*---+\\s*$/.test(line)) {
      flushParagraph();
      closeList();
      html += '<hr>';
      continue;
    }

    if (/^\\|.+\\|$/.test(line) && i + 1 < lines.length && /^\\|?\\s*:?-{3,}:?/.test(lines[i + 1])) {
      flushParagraph();
      closeList();
      const rows = [];
      rows.push(line);
      i += 2;
      while (i < lines.length && /^\\|.+\\|$/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      i--;
      html += renderTable(rows);
      continue;
    }

    const heading = line.match(/^(#{3,6})\\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = Math.min(6, heading[1].length + 1);
      html += '<h' + level + '>' + inlineMd(heading[2].trim()) + '</h' + level + '>';
      continue;
    }

    if (/^>\\s?/.test(line)) {
      flushParagraph();
      closeList();
      const quoteLines = [line.replace(/^>\\s?/, '')];
      while (i + 1 < lines.length && /^>\\s?/.test(lines[i + 1])) {
        i++;
        quoteLines.push(lines[i].replace(/^>\\s?/, ''));
      }
      html += '<blockquote>' + quoteLines.map(inlineMd).join('<br>') + '</blockquote>';
      continue;
    }

    const bullet = line.match(/^\\s*[-*]\\s+(.+)$/);
    const ordered = line.match(/^\\s*\\d+\\.\\s+(.+)$/);
    if (bullet || ordered) {
      flushParagraph();
      const nextType = bullet ? 'ul' : 'ol';
      if (listType !== nextType) {
        closeList();
        listType = nextType;
        html += '<' + listType + '>';
      }
      html += '<li>' + inlineMd((bullet || ordered)[1].trim()) + '</li>';
      continue;
    }

    paragraph.push(line.trim());
  }
  flushParagraph();
  closeList();
  if (inCode) flushCode();
  return html;
}

function renderTable(rows) {
  const parsed = rows.map(row => row.trim().replace(/^\\|/, '').replace(/\\|$/, '').split('|').map(cell => cell.trim()));
  const head = parsed[0] || [];
  const body = parsed.slice(1);
  return '<table><thead><tr>' + head.map(c => '<th>' + inlineMd(c) + '</th>').join('') + '</tr></thead><tbody>' +
    body.map(row => '<tr>' + row.map(c => '<td>' + inlineMd(c) + '</td>').join('') + '</tr>').join('') +
    '</tbody></table>';
}

function buildSection(section) {
  const tagClass = section.importance === 'vc' ? 'tag-vc' : section.importance === 'imp' ? 'tag-imp' : 'tag-bas';
  const bodyHtml = renderMarkdown(section.lines);
  const sectionEl = document.createElement('section');
  sectionEl.className = 'section';
  sectionEl.id = section.id;
  sectionEl.dataset.importance = section.importance;
  sectionEl.innerHTML = \`
    <div class="section-header">
      <span class="section-num">\${String(section.index).padStart(2, '0')}</span>
      <h2>\${inlineMd(section.title)}</h2>
      <span class="importance-tag \${tagClass}">\${importanceLabel(section.importance)}</span>
    </div>
    <div class="card content-block">\${bodyHtml}</div>
  \`;
  return sectionEl;
}

function makeSubtopicsCollapsible() {
  document.querySelectorAll('.content-block').forEach(block => {
    const nodes = Array.from(block.childNodes);
    const newNodes = [];
    let current = null;
    nodes.forEach(node => {
      if (node.nodeType === 1 && node.tagName === 'H4') {
        current = document.createElement('div');
        current.className = 'collapsible';
        current.innerHTML = '<button class="collapsible-header" type="button"><span>' + node.innerHTML + '</span><span class="arrow">▾</span></button><div class="collapsible-body"></div>';
        newNodes.push(current);
      } else if (current) {
        current.querySelector('.collapsible-body').appendChild(node);
      } else {
        newNodes.push(node);
      }
    });
    block.replaceChildren(...newNodes);
  });
}

function buildChecklist() {
  const topics = sections.filter(s => s.title && !/abbreviation/i.test(s.title)).slice(0, 28);
  const el = document.createElement('section');
  el.className = 'section';
  el.id = 'study-checklist';
  el.dataset.importance = 'bas';
  el.innerHTML = \`
    <div class="section-header">
      <span class="section-num">✓</span>
      <h2>Study Progress Checklist</h2>
      <span class="importance-tag tag-bas">BASIC</span>
    </div>
    <div class="card">
      \${topics.map((s, i) => \`
        <div class="checklist-item">
          <input type="checkbox" id="check-\${i}">
          <label for="check-\${i}">\${inlineMd(s.title)}</label>
        </div>\`).join('')}
    </div>\`;
  return el;
}

function buildQuickCards() {
  const attack = rawMarkdown.match(/# QUICK REFERENCE:[\\s\\S]*?# GOLDEN RULES/)?.[0] || '';
  const rows = [...attack.matchAll(/^\\| \\*\\*(.+?)\\*\\* \\| (.+?) \\| (.+?) \\|$/gm)];
  if (!rows.length) return null;
  const el = document.createElement('section');
  el.className = 'section';
  el.id = 'attack-fix-cards';
  el.dataset.importance = 'vc';
  el.innerHTML = \`
    <div class="section-header">
      <span class="section-num">⚡</span>
      <h2>Attack vs Fix Cards</h2>
      <span class="importance-tag tag-vc">VERY CRITICAL</span>
    </div>
    <div class="cheat-grid">
      \${rows.map(r => \`
        <div class="cheat-card">
          <h4>\${inlineMd(r[1])}</h4>
          <p><strong>Attack:</strong> \${inlineMd(r[2])}</p>
          <p><strong>Fix:</strong> \${inlineMd(r[3])}</p>
        </div>\`).join('')}
    </div>\`;
  return el;
}

function renderNav() {
  const groups = [
    ['Overview', [{ id: 'hero', title: 'Dashboard', importance: 'bas' }, { id: 'study-checklist', title: 'Study Checklist', importance: 'bas' }, { id: 'attack-fix-cards', title: 'Attack vs Fix Cards', importance: 'vc' }]],
    ['Study Notes', sections]
  ];
  nav.innerHTML = groups.map(([title, items]) => \`
    <div class="nav-group">
      <div class="nav-group-title">\${title}</div>
      \${items.map(item => \`<a class="nav-item" href="#\${item.id}"><span class="dot \${item.importance}"></span>\${inlineMd(item.title)}</a>\`).join('')}
    </div>\`).join('');
}

function updateHeroStats() {
  const tableCount = (rawMarkdown.match(/^\\|.+\\|$/gm) || []).length;
  const stats = [
    [sections.length, 'Sections'],
    [(rawMarkdown.match(/^#{2,6}\\s+/gm) || []).length, 'Topics'],
    [tableCount, 'Table Rows'],
    ['1', 'HTML File'],
    ['PDF', 'Ready']
  ];
  document.getElementById('hero-stats').innerHTML = stats.map(([num, label]) =>
    '<div class="hero-stat"><span class="num">' + num + '</span><span class="lbl">' + label + '</span></div>'
  ).join('');
}

function applyVisibility() {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.section').forEach(s => {
    const filterMatch = activeFilter === 'all' || s.dataset.importance === activeFilter;
    const searchMatch = !q || s.innerText.toLowerCase().includes(q);
    s.classList.toggle('hidden', !(filterMatch && searchMatch));
  });
}

function setupInteractions() {
  document.getElementById('hamburger').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
  nav.addEventListener('click', event => {
    const link = event.target.closest('.nav-item');
    if (!link) return;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    link.classList.add('active');
    if (window.innerWidth <= 820) document.getElementById('sidebar').classList.remove('open');
  });
  document.body.addEventListener('click', event => {
    const header = event.target.closest('.collapsible-header');
    if (header) header.parentElement.classList.toggle('open');
  });
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
      button.classList.add('active-filter');
      activeFilter = button.dataset.filter;
      applyVisibility();
    });
  });
  searchInput.addEventListener('input', applyVisibility);
  document.getElementById('print-page').addEventListener('click', () => window.print());
  document.getElementById('expand-all').addEventListener('click', event => {
    const shouldOpen = event.currentTarget.textContent === 'Expand All';
    document.querySelectorAll('.collapsible').forEach(c => c.classList.toggle('open', shouldOpen));
    event.currentTarget.textContent = shouldOpen ? 'Collapse All' : 'Expand All';
  });
  document.querySelectorAll('.checklist-item input').forEach(input => {
    const key = 'softsec-' + input.id;
    input.checked = localStorage.getItem(key) === '1';
    input.addEventListener('change', () => localStorage.setItem(key, input.checked ? '1' : '0'));
  });
  window.addEventListener('beforeprint', () => document.querySelectorAll('.collapsible').forEach(c => c.classList.add('open')));
}

function init() {
  sections = parseSections(rawMarkdown);
  renderNav();
  updateHeroStats();
  content.appendChild(buildChecklist());
  sections.forEach(section => content.appendChild(buildSection(section)));
  const quick = buildQuickCards();
  if (quick) content.appendChild(quick);
  makeSubtopicsCollapsible();
  setupInteractions();
  applyVisibility();
  document.querySelector('.nav-item')?.classList.add('active');
}

init();
</script>
</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");
console.log(outPath);

function escapeScript(value) {
  return value.replace(/<\/script/gi, "<\\/script");
}
