/* Arka planda yukarı doğru akan, anlamı olmayan sahte kod satırları. */
(function () {
  const COL_SPACING = 320;   /* sütunlar arası hedef mesafe (px) */
  const LINE_HEIGHT = 22;    /* #codeflow line-height ile uyumlu olmalı */

  /* Havuzlar ve şablonlar sitedeki yetenek/proje etiketlerinden türetildi:
     React / Next.js, React Native + Expo + Zustand, Node + Express +
     Socket.IO, SAP ABAP + SQL, Python ML, Unity / C#. Satırlar yine
     rastgele kurulur, çalışan bir kod değildir. */

  const idents = [
    'match', 'roster', 'player', 'period', 'stats', 'lobby', 'deck',
    'card', 'session', 'event', 'score', 'shot', 'assist', 'rebound',
    'payload', 'socket', 'entry', 'frame', 'record', 'timeline'
  ];
  const fns = [
    'sync', 'resolve', 'fetch', 'commit', 'render', 'reduce', 'emit',
    'persist', 'hydrate', 'validate', 'serialize', 'dispatch', 'collect'
  ];
  const props = ['id', 'state', 'total', 'points', 'index', 'status', 'count'];
  const hooks = ['useEffect', 'useMemo', 'useCallback'];   /* hepsi bağımlılık dizisi alır */
  const routes = ['matches', 'players', 'roster', 'lobby', 'stats', 'events'];
  const models = ['clf', 'model', 'net', 'pipeline'];
  const abap = ['player', 'match', 'stats', 'roster', 'period'];

  const pick = (a) => a[(Math.random() * a.length) | 0];
  const num = (n) => (Math.random() * n) | 0;
  const hex = (d) => Math.floor(Math.random() * Math.pow(16, d)).toString(16).padStart(d, '0');
  const cap = (w) => w[0].toUpperCase() + w.slice(1);

  const templates = [
    /* React / Next.js */
    () => { const v = pick(idents); return `const [${v}, set${cap(v)}] = useState(null);`; },
    () => { const v = pick(idents); return `${pick(hooks)}(() => ${pick(fns)}${cap(v)}(), [${v}Id]);`; },
    () => `export default function ${cap(pick(routes))}Page({ ${pick(idents)} }) {`,
    () => `  return <${cap(pick(idents))}Card ${pick(props)}={${pick(idents)}.${pick(props)}} />;`,
    () => `}`,

    /* Node / Express / Socket.IO */
    () => `app.get('/api/${pick(routes)}/:id', ${pick(fns)}${cap(pick(idents))});`,
    () => `io.on('connection', (socket) => {`,
    () => `  socket.emit('${pick(idents)}:update', { ${pick(props)}: ${num(240)} });`,
    () => `await ${pick(idents)}.${pick(fns)}({ retry: ${num(5)} });`,

    /* React Native / Expo / Zustand */
    () => `await AsyncStorage.setItem('${pick(idents)}:${num(99)}', json);`,
    () => `const use${cap(pick(idents))}Store = create((set) => ({`,

    /* SAP ABAP */
    () => { const t = pick(abap); return `SELECT * FROM z${t} INTO TABLE lt_${t}.`; },
    () => `LOOP AT lt_${pick(abap)} INTO ls_${pick(abap)}.`,
    () => { const t = pick(abap); return `  ls_${t}-${pick(props)} = ls_${t}-${pick(props)} + ${num(50)}.`; },
    () => `ENDLOOP.`,
    () => `WRITE: / ls_${pick(abap)}-${pick(props)}.`,

    /* SQL */
    () => `SELECT ${pick(props)}, SUM(${pick(props)}) FROM ${pick(routes)} GROUP BY 1;`,

    /* Python / ML */
    () => `df = pd.read_csv('${pick(routes)}.csv').dropna()`,
    () => `${pick(models)}.fit(X_train, y_train, epochs=${num(64)})`,
    () => `print(f"acc: {${pick(models)}.score(X_test, y_test):.3f}")`,

    /* Unity / C# */
    () => `transform.position += velocity * Time.deltaTime;`,

    /* araç çıktısı */
    () => `[ok] ${pick(routes)}/${pick(fns)} compiled in ${20 + num(380)}ms`,
    () => `>> build ${hex(7)} · ${num(60)} modules · ${num(900)}kB`,
    () => `// TODO: ${pick(fns)} ${pick(idents)} before ${pick(routes)}`,
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
    /* Sayfa arka plan sekmesinde kurulursa innerHeight 0 gelebiliyor;
       alt sınır olmazsa sütun birkaç satıra düşüp tekrara giriyor. */
    const viewport = Math.max(window.innerHeight || 0, 900);
    const perScreen = Math.ceil(viewport / LINE_HEIGHT) + 6;

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
