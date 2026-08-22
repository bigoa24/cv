/* Arka planda yukarı doğru akan, anlamı olmayan sahte kod satırları. */
(function () {
  const COL_SPACING = 320;   /* sütunlar arası hedef mesafe (px) */
  const LINE_HEIGHT = 22;    /* #codeflow line-height ile uyumlu olmalı */

  const idents = [
    'buf', 'ctx', 'node', 'frame', 'chunk', 'token', 'stream', 'cache',
    'packet', 'sector', 'handle', 'cursor', 'offset', 'payload', 'signal',
    'kernel', 'thread', 'socket', 'vector', 'entry', 'region', 'trace'
  ];
  const fns = [
    'resolve', 'flush', 'decode', 'commit', 'spawn', 'mount', 'reduce',
    'align', 'sync', 'emit', 'probe', 'yield', 'unwrap', 'collect', 'render'
  ];
  const props = ['len', 'head', 'state', 'flags', 'depth', 'seed', 'mask', 'ptr'];
  const types = ['u32', 'i64', 'byte', 'void*', 'usize', 'f32'];

  const pick = (a) => a[(Math.random() * a.length) | 0];
  const num = (n) => (Math.random() * n) | 0;
  const hex = (d) => Math.floor(Math.random() * Math.pow(16, d)).toString(16).padStart(d, '0');

  const templates = [
    () => `const ${pick(idents)} = ${pick(fns)}(${pick(idents)}, 0x${hex(4)});`,
    () => `if (${pick(idents)}.${pick(props)} !== null) {`,
    () => `  return ${pick(fns)}(${pick(idents)}.${pick(props)});`,
    () => `}`,
    () => `for (let i = 0; i < ${num(512)}; i++) ${pick(idents)}[i] ^= mask;`,
    () => `await ${pick(idents)}.${pick(fns)}({ ttl: ${num(9000)} });`,
    () => `export function ${pick(fns)}_${pick(idents)}(${pick(idents)}) {`,
    () => `${pick(types)} ${pick(idents)} = 0x${hex(6)};`,
    () => `[ok] ${pick(idents)}/${pick(fns)} linked in ${num(400)}ms`,
    () => `>> map 0x${hex(8)} -> 0x${hex(8)} (${num(64)} pages)`,
    () => `let ${pick(idents)} = ${pick(idents)}.${pick(fns)}().${pick(props)};`,
    () => `// ${pick(fns)} ${pick(idents)} :: ${pick(types)}`,
    () => `  ${pick(idents)}.${pick(props)} += ${num(128)};`,
    () => `assert(${pick(idents)}.${pick(props)} < ${num(2048)});`,
    () => ``
  ];

  function buildLines(count) {
    const out = [];
    for (let i = 0; i < count; i++) out.push(pick(templates)());
    return out.join('\n');
  }

  function build() {
    const host = document.getElementById('codeflow');
    if (!host) return;
    host.textContent = '';

    const cols = Math.max(2, Math.ceil(window.innerWidth / COL_SPACING));
    const perScreen = Math.ceil(window.innerHeight / LINE_HEIGHT) + 6;

    for (let c = 0; c < cols; c++) {
      const col = document.createElement('div');
      col.className = 'codeflow-col';
      /* aynı blok iki kez: -%50 kaydırınca dikişsiz döner */
      const block = buildLines(perScreen);
      col.textContent = block + '\n' + block + '\n';
      col.style.left = ((c + 0.5) / cols * 100).toFixed(2) + '%';
      col.style.animationDuration = (34 + Math.random() * 40).toFixed(1) + 's';
      col.style.animationDelay = '-' + (Math.random() * 40).toFixed(1) + 's';
      col.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      host.appendChild(col);
    }
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const host = document.createElement('div');
    host.id = 'codeflow';
    host.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(host, document.body.firstChild);
    build();

    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(build, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
