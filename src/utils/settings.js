export const SETTINGS_KEY = 'flyrank-settings'

export const defaultSettings = {
  displayName: '',
  email: '',
  theme: 'system',
  emailNotifications: false,
}

export function loadSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch {
    // Ignore corrupt or unreadable saved data.
  }

  return { ...defaultSettings }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function clearSettings() {
  localStorage.removeItem(SETTINGS_KEY)
}
