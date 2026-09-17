(function attachPreferences(global) {
  const themes = new Set(['light', 'dark']);
  const textSizes = ['normal', 'large', 'xlarge'];

  function normalizeTheme(value) {
    return themes.has(value) ? value : 'light';
  }

  function normalizeTextSize(value) {
    return textSizes.includes(value) ? value : 'normal';
  }

  function nextTextSize(value) {
    const current = normalizeTextSize(value);
    const index = textSizes.indexOf(current);
    return textSizes[(index + 1) % textSizes.length];
  }

  global.LaSierraPreferences = Object.freeze({
    normalizeTheme,
    normalizeTextSize,
    nextTextSize,
  });
})(globalThis);
