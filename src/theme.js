// Small shared helper for persisting/applying the light/dark theme across every page.
const STORAGE_KEY = 'theme';

export function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
}

export function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Call once on every page load so the saved preference is applied immediately.
export function initTheme() {
    applyTheme(getTheme());
}

export function toggleTheme() {
    const newTheme = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
    return newTheme;
}
