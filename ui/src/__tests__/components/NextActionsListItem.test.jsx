import { vi, describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import NextActionsListItem from '../../blocks/NextActionsListItem'

const mockAction = {
  action_id: 1,
  content: 'Review pull request',
  context: '@computer',
}

describe('NextActionsListItem', () => {
  test('renders the next action content', () => {
    renderWithProviders(<NextActionsListItem nextAction={mockAction} />)

    expect(screen.getByText('Review pull request')).toBeInTheDocument()
  })

  test('details are hidden by default', () => {
    renderWithProviders(<NextActionsListItem nextAction={mockAction} />)

    expect(screen.queryByText('THE DEETS')).not.toBeInTheDocument()
  })

  test('shows details when the expand button is clicked', async () => {
    renderWithProviders(<NextActionsListItem nextAction={mockAction} />)

    const buttons = screen.getAllByRole('button')
    const chevronButton = buttons[1]
    await userEvent.click(chevronButton)

    expect(screen.getByText('THE DEETS')).toBeInTheDocument()
  })

  test('hides details again when the expand button is clicked twice', async () => {
    renderWithProviders(<NextActionsListItem nextAction={mockAction} />)

    const buttons = screen.getAllByRole('button')
    const chevronButton = buttons[1]
    await userEvent.click(chevronButton)
    await userEvent.click(chevronButton)

    expect(screen.queryByText('THE DEETS')).not.toBeInTheDocument()
  })
})
