import { supportedMakes } from '../data/vehicles.js';

function optionList(items) {
  return items.map((item) => `<option value="${item}">${item}</option>`).join('');
}

export function renderHero() {
  return `
    <section class="hero" data-component="hero" aria-labelledby="hero-title">
      <img class="hero__media" src="assets/hero-dealership.webp" alt="" aria-hidden="true">
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="hero__content shell">
        <div class="hero__copy">
          <span class="eyebrow eyebrow--light">Used cars · Las Vegas, NV</span>
          <h1 id="hero-title">Find Your Next Ride.</h1>
          <p>Quality pre-owned vehicles. Flexible financing.</p>
          <div class="hero__actions">
            <a class="button button--red" href="#inventory">View Inventory</a>
            <a class="button button--glass" href="#financing">Get Financed</a>
          </div>
        </div>
      </div>
    </section>

    <div class="quick-search-wrap shell" aria-label="Quick inventory search">
      <form class="quick-search" data-quick-search>
        <div class="quick-search__field">
          <label for="search-make">Make</label>
          <select id="search-make" name="make">
            <option value="">All makes</option>
            ${optionList(supportedMakes)}
          </select>
        </div>
        <div class="quick-search__field">
          <label for="search-price">Max price</label>
          <select id="search-price" name="price">
            <option value="">Any price</option>
            <option value="20000">$20,000</option>
            <option value="25000">$25,000</option>
            <option value="30000">$30,000</option>
            <option value="35000">$35,000</option>
            <option value="40000">$40,000</option>
          </select>
        </div>
        <div class="quick-search__field">
          <label for="search-body">Body style</label>
          <select id="search-body" name="bodyStyle">
            <option value="">All body styles</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
          </select>
        </div>
        <button class="button button--dark quick-search__button" type="submit">
          Search Inventory
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </div>
  `;
}
