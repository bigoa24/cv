(function () {
  const STORAGE_KEY = 'cv-lang';
  const DEFAULT_LANG = 'tr';

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach((el) => {
      if (el.getAttribute('data-lang') === lang) {
        el.classList.add('active-lang');
      } else {
        el.classList.remove('active-lang');
      }
    });
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function init() {
    let lang = DEFAULT_LANG;
    try { lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) {}
    applyLang(lang);

    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.addEventListener('click', () => applyLang(btn.dataset.setLang));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
