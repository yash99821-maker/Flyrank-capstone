import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  clearSettings,
  defaultSettings,
  loadSettings,
  saveSettings,
} from '../utils/settings'
import './SettingsForm.css'

const settingsSchema = z.object({
  displayName: z.string(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  theme: z.enum(['system', 'light', 'dark']),
  emailNotifications: z.boolean(),
})

function SettingsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: loadSettings(),
    mode: 'onChange',
  })

  function onSubmit(data) {
    saveSettings(data)
  }

  function onReset() {
    clearSettings()
    reset(defaultSettings)
  }

  return (
    <section className="settings-form">
      <h2>Settings</h2>
      <p>Manage your profile and preferences.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="settings-field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            {...register('displayName')}
          />
          {errors.displayName && (
            <p className="settings-error" role="alert">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div className="settings-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="settings-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="settings-field">
          <label htmlFor="theme">Theme</label>
          <select id="theme" {...register('theme')}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          {errors.theme && (
            <p className="settings-error" role="alert">
              {errors.theme.message}
            </p>
          )}
        </div>

        <div className="settings-field settings-field--checkbox">
          <input
            id="emailNotifications"
            type="checkbox"
            {...register('emailNotifications')}
          />
          <label htmlFor="emailNotifications">Email notifications</label>
          {errors.emailNotifications && (
            <p className="settings-error" role="alert">
              {errors.emailNotifications.message}
            </p>
          )}
        </div>

        <div className="settings-actions">
          <button type="submit" className="settings-button" disabled={!isValid}>
            Save
          </button>
          <button
            type="button"
            className="settings-button settings-button--secondary"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default SettingsForm
