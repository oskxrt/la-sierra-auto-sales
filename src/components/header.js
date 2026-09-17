import { dealership } from '../data/dealership.js';

const navItems = [
  ['Inventory', '#inventory'],
  ['Financing', '#financing'],
  ['Sell / Trade', '#sell-trade'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

function renderNavLinks(className = '') {
  return navItems
    .map(([label, href]) => `<a class="${className}" href="${href}">${label}</a>`)
    .join('');
}

function renderThemeControl(className = 'icon-control') {
  return `
    <button class="${className}" type="button" aria-label="Switch to dark mode" title="Switch theme" data-theme-toggle>
      <span class="theme-control__icon" aria-hidden="true" data-theme-icon>☾</span>
      <span class="appearance-option__value" data-theme-label>Dark</span>
    </button>
  `;
}

function renderTextSizeControl(className = 'icon-control icon-control--text') {
  return `
    <button class="${className}" type="button" aria-label="Increase text size" title="Text size" data-text-size-toggle>
      <span class="text-size-control__icon" aria-hidden="true">Aa</span>
      <span class="appearance-option__value" data-text-size-label>Normal</span>
    </button>
  `;
}

export function renderHeader() {
  return `
    <header class="site-header" data-site-header>
      <div class="site-header__inner shell">
        <a class="brand" href="#top" aria-label="${dealership.shortName} home">
          <img src="./assets/la-sierra-logo-clean.webp" alt="LA SIERRA AUTO SALES" width="280" height="160">
        </a>

        <nav class="desktop-nav" aria-label="Primary navigation">
          ${renderNavLinks('desktop-nav__link')}
        </nav>

        <div class="desktop-actions">
          <div class="appearance-tools" aria-label="Display settings">
            ${renderThemeControl()}
            ${renderTextSizeControl()}
          </div>
          <a class="header-phone" href="${dealership.phoneHref}" aria-label="Call us at ${dealership.phoneDisplay}">
            <span class="header-phone__eyebrow">Call us</span>
            <span>${dealership.phoneDisplay}</span>
          </a>
          <a class="button button--red button--compact" href="#financing">Get Pre-Approved</a>
        </div>

        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
          <span></span><span></span><span></span>
        </button>
      </div>

    </header>
  `;
}

export function renderMobileMenu() {
  return `
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
        <button class="mobile-menu__scrim" type="button" aria-label="Close menu" data-menu-scrim></button>
        <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div class="mobile-menu__top">
            <div>
              <span class="mobile-menu__label">La Sierra</span>
              <strong class="mobile-menu__title">Menu</strong>
            </div>
            <button class="mobile-menu__close" type="button" aria-label="Close menu" data-menu-close></button>
          </div>

          <div class="mobile-menu__appearance" aria-label="Display settings">
            ${renderThemeControl('appearance-option')}
            ${renderTextSizeControl('appearance-option')}
          </div>

          <nav class="mobile-nav" aria-label="Mobile navigation">
            ${renderNavLinks('mobile-nav__link')}
          </nav>
          <div class="mobile-menu__actions">
            <a class="button button--red" href="#financing">Get Pre-Approved</a>
            <a class="button button--outline-dark" href="${dealership.phoneHref}" aria-label="Call us">Call Us · ${dealership.phoneDisplay}</a>
          </div>
        </div>
      </div>
  `;
}
