function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMileage(value) {
  return `${new Intl.NumberFormat('en-US').format(value)} miles`;
}

function encodeMake(make) {
  return encodeURIComponent(make);
}

export function renderVehicleCard(vehicle) {
  const identity = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const badge = vehicle.status === 'Sold'
    ? '<span class="vehicle-card__badge vehicle-card__badge--sold">Sold</span>'
    : vehicle.featured
      ? '<span class="vehicle-card__badge">Featured</span>'
      : '';

  return `
    <article class="vehicle-card" data-vehicle="${vehicle.slug}" id="vehicle-${vehicle.slug}">
      <a class="vehicle-card__image-link" href="#vehicle-${vehicle.slug}" aria-label="View ${identity}">
        <img class="vehicle-card__image" src="${vehicle.images[0]}" alt="${identity}" loading="lazy" decoding="async">
        ${badge}
      </a>
      <div class="vehicle-card__body">
        <div class="vehicle-card__heading-row">
          <div>
            <span class="vehicle-card__year-make">${vehicle.year} ${vehicle.make}</span>
            <h3>${vehicle.model}${vehicle.trim ? ` <span>${vehicle.trim}</span>` : ''}</h3>
          </div>
          <strong class="vehicle-card__price">${formatCurrency(vehicle.price)}</strong>
        </div>
        <div class="vehicle-card__meta" aria-label="Vehicle details">
          <span>${formatMileage(vehicle.mileage)}</span>
          <span>${vehicle.transmission}</span>
          <span>${vehicle.drivetrain}</span>
        </div>
        <div class="vehicle-card__footer">
          <span class="vehicle-card__stock">Stock ${vehicle.stockNumber}</span>
          <a class="vehicle-card__cta" href="#vehicle-${vehicle.slug}">View Details <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>
  `;
}

export function renderVehicleGrid(vehicles) {
  return `<div class="vehicle-grid">${vehicles.map(renderVehicleCard).join('')}</div>`;
}

export function renderBrandBrowser(makes) {
  const marks = makes
    .map((make) => {
      const initials = make === 'Mercedes-Benz'
        ? 'MB'
        : make.split(/\s|-/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
      return `
        <a class="brand-tile" href="#inventory" data-make="${encodeMake(make)}" aria-label="Browse ${make} vehicles">
          <span class="brand-tile__mark" aria-hidden="true">${initials}</span>
          <span>${make}</span>
          <span class="brand-tile__arrow" aria-hidden="true">→</span>
        </a>
      `;
    })
    .join('');

  return `<div class="brand-browser">${marks}</div>`;
}
