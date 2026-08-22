export const STORAGE_KEY = 'flyrank-settings'

export const defaultSettings = {
  displayName: '',
  email: '',
  theme: 'system',
  notifications: true,
}

export function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

export function applyTheme(theme) {
  if (theme === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = theme
  }
}

export function initSettings() {
  applyTheme(loadSettings().theme)
}
