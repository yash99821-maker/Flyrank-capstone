import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import SettingsForm from './SettingsForm'
import { SETTINGS_KEY } from '../utils/settings'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('SettingsForm', () => {
  it('saves valid settings to localStorage on submit', async () => {
    const user = userEvent.setup()

    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), 'Alex')
    await user.type(screen.getByLabelText(/^email$/i), 'alex@example.com')
    await user.selectOptions(screen.getByLabelText(/theme/i), 'dark')
    await user.click(screen.getByLabelText(/email notifications/i))
    await user.click(screen.getByRole('button', { name: /^save$/i }))

    await waitFor(() => {
      expect(localStorage.getItem(SETTINGS_KEY)).toBe(
        JSON.stringify({
          displayName: 'Alex',
          email: 'alex@example.com',
          theme: 'dark',
          emailNotifications: true,
        }),
      )
    })
  })

  it('shows an inline error for an invalid email', async () => {
    const user = userEvent.setup()

    render(<SettingsForm />)

    const emailInput = screen.getByLabelText(/^email$/i)
    await user.type(emailInput, 'not-an-email')

    expect(
      await screen.findByText(/please enter a valid email/i),
    ).toBeInTheDocument()
  })

  it('disables the save button while the form is invalid', async () => {
    render(<SettingsForm />)

    expect(screen.getByRole('button', { name: /^save$/i })).toBeDisabled()

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^email$/i), 'alex@example.com')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^save$/i })).toBeEnabled()
    })
  })
})
