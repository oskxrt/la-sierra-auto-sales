function buildInventoryHash(filters) {
  const params = new URLSearchParams();
  for (const key of ['make', 'price', 'bodyStyle']) {
    const value = filters[key];
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `#inventory?${query}` : '#inventory';
}

function readPreference(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writePreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Local file/privacy mode can deny storage. The preference still works for this visit.
  }
}

function initAppearance() {
  const prefs = globalThis.LaSierraPreferences;
  if (!prefs) return;

  const root = document.documentElement;
  const storedTheme = readPreference('la-sierra-theme');
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  let theme = prefs.normalizeTheme(storedTheme || (systemDark ? 'dark' : 'light'));
  let textSize = prefs.normalizeTextSize(readPreference('la-sierra-text-size'));

  const syncControls = () => {
    root.dataset.theme = theme;
    root.dataset.textSize = textSize;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute('content', theme === 'dark' ? '#0c0f13' : '#ffffff');

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
      button.setAttribute('title', `Switch to ${nextTheme} mode`);
      const icon = button.querySelector('[data-theme-icon]');
      const label = button.querySelector('[data-theme-label]');
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
      if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    });

    const textLabels = { normal: 'Normal', large: 'Large', xlarge: 'Extra large' };
    document.querySelectorAll('[data-text-size-toggle]').forEach((button) => {
      const next = prefs.nextTextSize(textSize);
      button.setAttribute('aria-label', next === 'normal' ? 'Reset text size' : 'Increase text size');
      const label = button.querySelector('[data-text-size-label]');
      if (label) label.textContent = textLabels[textSize];
    });
  };

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      writePreference('la-sierra-theme', theme);
      syncControls();
    });
  });

  document.querySelectorAll('[data-text-size-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      textSize = prefs.nextTextSize(textSize);
      writePreference('la-sierra-text-size', textSize);
      syncControls();
    });
  });

  syncControls();
}

function initHeader() {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const closeButton = document.querySelector('[data-menu-close]');
  const scrim = document.querySelector('[data-menu-scrim]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!header || !toggle || !menu) return;

  const focusableSelector = 'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled])';
  let previousFocus = null;

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('nav-open', open);
    header.classList.toggle('menu-open', open);

    if (open) {
      previousFocus = document.activeElement;
      closeButton?.focus();
    } else if (previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  closeButton?.addEventListener('click', () => setMenu(false));
  scrim?.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (!open) return;

    if (event.key === 'Escape') {
      setMenu(false);
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll(focusableSelector)].filter((element) => element instanceof HTMLElement && !element.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const syncScrollState = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  syncScrollState();
  window.addEventListener('scroll', syncScrollState, { passive: true });
}

function initQuickSearch() {
  const form = document.querySelector('[data-quick-search]');
  if (!(form instanceof HTMLFormElement)) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const filters = {
      make: String(data.get('make') || ''),
      price: String(data.get('price') || ''),
      bodyStyle: String(data.get('bodyStyle') || ''),
    };
    window.location.hash = buildInventoryHash(filters).slice(1);
    document.querySelector('#inventory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initBrandLinks() {
  document.querySelectorAll('[data-make]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const make = decodeURIComponent(link.getAttribute('data-make') || '');
      window.location.hash = buildInventoryHash({ make, price: '', bodyStyle: '' }).slice(1);
      document.querySelector('#inventory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const targetId = href.split('?')[0];
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, '', href);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initClient() {
  initAppearance();
  initHeader();
  initQuickSearch();
  initBrandLinks();
  initSmoothAnchors();
}

initClient();
