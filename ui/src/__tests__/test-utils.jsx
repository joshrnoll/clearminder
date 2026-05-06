import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

const defaultContextValue = {
  loggedInUser: { user_id: 1, first_name: 'Test', last_name: 'User' },
  setLoggedInUser: () => {},
  inbox: [],
  setInbox: () => {},
  nextActions: [],
  setNextActions: () => {},
  nextActionsContexts: [],
  setNextActionsContexts: () => {},
  projects: [],
  setProjects: () => {},
  somedayMaybe: [],
  setSomedayMaybe: () => {},
  tutorialComplete: true,
  setTutorialComplete: () => {},
  menuOpened: false,
  setMenuOpened: () => {},
}

export function renderWithProviders(ui, {
  initialRoute = '/',
  contextValue = {},
} = {}) {
  const value = { ...defaultContextValue, ...contextValue }

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppContext value={value}>
        {ui}
      </AppContext>
    </MemoryRouter>
  )
}
