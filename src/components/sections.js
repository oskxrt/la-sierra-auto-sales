import { dealership } from '../data/dealership.js';

export function renderFinancing() {
  return `
    <section class="financing-section section" id="financing" aria-labelledby="financing-title">
      <div class="shell financing-card">
        <div class="financing-card__copy">
          <span class="eyebrow eyebrow--light">Simple. Flexible. Fast.</span>
          <h2 id="financing-title">Financing Made Simple.</h2>
          <p>Start from home, explore flexible options, and spend less time on paperwork when you visit the dealership.</p>
          <div class="financing-card__actions">
            <a class="button button--white" href="#contact">Get Pre-Approved</a>
            <a class="text-link text-link--light" href="${dealership.phoneHref}">Talk to our team <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div class="financing-card__steps" aria-label="Financing steps">
          <div><span>01</span><strong>Choose a vehicle</strong><small>Browse our current selection.</small></div>
          <div><span>02</span><strong>Tell us about you</strong><small>Start your financing request.</small></div>
          <div><span>03</span><strong>Drive home</strong><small>Finish the details at La Sierra.</small></div>
        </div>
      </div>
    </section>
  `;
}

export function renderTrust() {
  const items = [
    ['01', 'Quality Used Vehicles', 'A focused selection of pre-owned cars, SUVs, trucks, and EVs.'],
    ['02', 'Flexible Financing', 'Options for different budgets and credit situations.'],
    ['03', 'Straightforward Shopping', 'Clear vehicle details and direct ways to contact our team.'],
    ['04', 'Local Las Vegas Dealer', 'Visit us on N Pecos Rd and see the inventory in person.'],
  ];

  return `
    <section class="trust-section section" id="about" aria-labelledby="trust-title">
      <div class="shell">
        <div class="section-heading section-heading--split">
          <div>
            <span class="eyebrow">Why La Sierra</span>
            <h2 id="trust-title">A better way to shop used.</h2>
          </div>
          <p>Modern selection, personal service, and an easier path from browsing to driving.</p>
        </div>
        <div class="trust-grid">
          ${items.map(([num, title, copy]) => `
            <article class="trust-card">
              <span class="trust-card__number">${num}</span>
              <h3>${title}</h3>
              <p>${copy}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderVisitUs() {
  return `
    <section class="visit-section section" id="contact" aria-labelledby="visit-title">
      <div class="shell visit-grid">
        <div class="visit-media">
          <img src="assets/dealership-exterior.webp" alt="Exterior of La Sierra Auto Sales in Las Vegas" loading="lazy" decoding="async">
          <div class="visit-media__tag">Las Vegas, Nevada</div>
        </div>
        <div class="visit-copy">
          <span class="eyebrow">Visit the dealership</span>
          <h2 id="visit-title">Visit La Sierra.</h2>
          <p class="visit-copy__lead">See the vehicles in person, talk financing, and find the right fit with our team.</p>
          <dl class="contact-list">
            <div>
              <dt>Address</dt>
              <dd>${dealership.address}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href="${dealership.phoneHref}">${dealership.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>${dealership.hours}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="${dealership.emailHref}">${dealership.email}</a></dd>
            </div>
            <div>
              <dt>Fax</dt>
              <dd>${dealership.faxDisplay}</dd>
            </div>
          </dl>
          <div class="visit-actions">
            <a class="button button--red" href="${dealership.phoneHref}">Call ${dealership.phoneDisplay}</a>
            <a class="button button--outline-dark" href="${dealership.directionsHref}" target="_blank" rel="noreferrer">Get Directions</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderSellTrade() {
  return `
    <section class="sell-trade section section--tight" id="sell-trade" aria-labelledby="sell-trade-title">
      <div class="shell sell-trade__inner">
        <div>
          <span class="eyebrow">Have a vehicle?</span>
          <h2 id="sell-trade-title">Sell or trade it with La Sierra.</h2>
        </div>
        <p>Bring us your current vehicle and talk with our team about trade-in options.</p>
        <a class="button button--dark" href="#contact">Contact Us</a>
      </div>
    </section>
  `;
}

export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="shell site-footer__top">
        <div class="site-footer__brand">
          <img src="assets/la-sierra-logo.webp" alt="LA SIERRA AUTO SALES" width="220" height="126">
          <p>Quality pre-owned vehicles and flexible financing in Las Vegas, Nevada.</p>
        </div>
        <div class="site-footer__column">
          <h2>Shop</h2>
          <a href="#inventory">Inventory</a>
          <a href="#brands">Shop by Brand</a>
          <a href="#sell-trade">Sell / Trade</a>
        </div>
        <div class="site-footer__column">
          <h2>Finance</h2>
          <a href="#financing">Get Pre-Approved</a>
          <a href="${dealership.phoneHref}">Call Our Team</a>
        </div>
        <div class="site-footer__column site-footer__contact">
          <h2>LA SIERRA AUTO SALES</h2>
          <p>${dealership.address}</p>
          <a href="${dealership.phoneHref}">${dealership.phoneDisplay}</a>
          <a href="${dealership.emailHref}">${dealership.email}</a>
          <p>${dealership.hours}</p>
          <a href="${dealership.directionsHref}" target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </div>
      <div class="shell site-footer__bottom">
        <span>© 2026 La Sierra Auto Sales.</span>
        <span>Phase 1 frontend preview.</span>
      </div>
    </footer>
  `;
}
