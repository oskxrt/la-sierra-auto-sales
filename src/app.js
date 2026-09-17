import { renderHeader, renderMobileMenu } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderVehicleGrid, renderBrandBrowser } from './components/inventory.js';
import { renderFinancing, renderTrust, renderVisitUs, renderSellTrade, renderFooter } from './components/sections.js';
import { featuredVehicles, supportedMakes } from './data/vehicles.js';

function renderInventorySection() {
  return `
    <section class="inventory-section section" id="inventory" aria-labelledby="featured-title">
      <div class="shell">
        <div class="section-heading section-heading--split">
          <div>
            <span class="eyebrow">Fresh on the lot</span>
            <h2 id="featured-title">Featured Vehicles</h2>
          </div>
          <div class="section-heading__aside">
            <p>Explore a hand-picked preview of the inventory. Real stock management comes in the next phase.</p>
            <a class="text-link" href="#brands">Browse by brand <span aria-hidden="true">→</span></a>
          </div>
        </div>
        ${renderVehicleGrid(featuredVehicles)}
        <div class="section-cta">
          <a class="button button--outline-dark" href="#inventory">View All Inventory</a>
        </div>
      </div>
    </section>
  `;
}

function renderBrandSection() {
  return `
    <section class="brands-section section section--soft" id="brands" aria-labelledby="brands-title">
      <div class="shell">
        <div class="section-heading">
          <span class="eyebrow">Find your favorite</span>
          <h2 id="brands-title">Shop by Brand</h2>
          <p>From daily drivers to luxury and electric, browse the makes La Sierra regularly carries.</p>
        </div>
        ${renderBrandBrowser(supportedMakes)}
      </div>
    </section>
  `;
}

export function renderHome() {
  return `
    ${renderHeader()}
    ${renderMobileMenu()}
    <main id="top">
      ${renderHero()}
      ${renderInventorySection()}
      ${renderBrandSection()}
      ${renderFinancing()}
      ${renderSellTrade()}
      ${renderTrust()}
      ${renderVisitUs()}
    </main>
    ${renderFooter()}
  `;
}
