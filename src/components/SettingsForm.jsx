import { useEffect, useState } from 'react'
import {
  STORAGE_KEY,
  applyTheme,
  defaultSettings,
  loadSettings,
} from '../utils/settings'
import './SettingsForm.css'

export default function SettingsForm() {
  const [settings, setSettings] = useState(loadSettings)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSavedMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    applyTheme(settings.theme)
    setSavedMessage('Settings saved!')
  }

  function handleReset() {
    setSettings(defaultSettings)
    localStorage.removeItem(STORAGE_KEY)
    applyTheme(defaultSettings.theme)
    setSavedMessage('Settings reset to defaults.')
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="settings-field">
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          type="text"
          value={settings.displayName}
          onChange={(e) => updateField('displayName', e.target.value)}
          placeholder="Your name"
          autoComplete="name"
        />
      </div>

      <div className="settings-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={settings.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="settings-field">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={settings.theme}
          onChange={(e) => updateField('theme', e.target.value)}
        >
          <option value="system">System default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="settings-field settings-field--checkbox">
        <label htmlFor="notifications">
          <input
            id="notifications"
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateField('notifications', e.target.checked)}
          />
          Email notifications
        </label>
      </div>

      <div className="settings-actions">
        <button type="submit" className="settings-btn settings-btn--primary">
          Save settings
        </button>
        <button
          type="button"
          className="settings-btn settings-btn--secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {savedMessage && (
        <p className="settings-message" role="status">
          {savedMessage}
        </p>
      )}
    </form>
  )
}
