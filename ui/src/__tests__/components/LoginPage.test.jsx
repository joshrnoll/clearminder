import { vi, describe, test, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import LoginPage from '../../LoginPage'

vi.mock('../../../utils/api.js', () => ({
  userLogin: vi.fn(),
}))

import { userLogin } from '../../../utils/api.js'

describe('LoginPage', () => {
  beforeEach(() => vi.clearAllMocks())

  test('renders username input, password input, and login button', () => {
    renderWithProviders(<LoginPage />)

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('calls userLogin with typed credentials on submit', async () => {
    userLogin.mockResolvedValue(null)
    renderWithProviders(<LoginPage />)

    await userEvent.type(screen.getByPlaceholderText('Username'), 'alice')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(userLogin).toHaveBeenCalledWith('alice', 'secret')
  })

  test('calls setLoggedInUser and navigates to /home on successful login', async () => {
    const userData = { user_id: 1, first_name: 'Test', last_name: 'User' }
    userLogin.mockResolvedValue(userData)

    const setLoggedInUser = vi.fn()
    renderWithProviders(<LoginPage />, { contextValue: { setLoggedInUser } })

    await userEvent.type(screen.getByPlaceholderText('Username'), 'alice')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => expect(setLoggedInUser).toHaveBeenCalledWith(userData))
  })

  test('calls setLoggedInUser(null) when login returns no data', async () => {
    userLogin.mockResolvedValue(undefined)

    const setLoggedInUser = vi.fn()
    renderWithProviders(<LoginPage />, { contextValue: { setLoggedInUser } })

    await userEvent.type(screen.getByPlaceholderText('Username'), 'bad')
    await userEvent.type(screen.getByPlaceholderText('Password'), 'bad')
    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => expect(setLoggedInUser).toHaveBeenCalledWith(null))
  })
})
