import { vi, describe, test, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import AddToInbox from '../../AddToInbox'

vi.mock('../../../utils/api.js', () => ({
  addToInbox: vi.fn(),
}))

import { addToInbox } from '../../../utils/api.js'

describe('AddToInbox', () => {
  beforeEach(() => vi.clearAllMocks())

  test('renders the content input and submit button', () => {
    renderWithProviders(<AddToInbox />)

    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  test('calls addToInbox with the typed content on submit', async () => {
    addToInbox.mockResolvedValue({ success: 'true' })
    renderWithProviders(<AddToInbox />)

    await userEvent.type(screen.getByPlaceholderText("What's on your mind?"), 'Call dentist')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(addToInbox).toHaveBeenCalledWith('Call dentist')
  })

  test('resets the form after a successful submission', async () => {
    addToInbox.mockResolvedValue({ success: 'true' })
    renderWithProviders(<AddToInbox />)

    const input = screen.getByPlaceholderText("What's on your mind?")
    await userEvent.type(input, 'Buy groceries')
    await userEvent.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => expect(input).toHaveValue(''))
  })
})
