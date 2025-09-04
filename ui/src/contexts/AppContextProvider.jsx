import { AppContext } from './AppContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../../utils/api.js'

export function AppContextProvider({ children }){
  const navigate = useNavigate()

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  )
  const [tutorialComplete, setTutorialComplete] = useState(true)
  const [inbox, setInbox] = useState([])
  const [nextActions, setNextActions] = useState([])
  const [nextActionsContexts, setNextActionsContexts] = useState([])
  const [projects, setProjects] = useState([])
  const [somedayMaybe, setSomedayMaybe] = useState([])
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    if (!loggedInUser) {
      api.userLogout() // Call /auth/logout API endpoint to remove session cookie and clear local storage
      navigate('/login')
    }
    else {
      // Set user's login data
      api.getTutorialStatus().then(status => setTutorialComplete(status))
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

      // Get user's content from DB
      api.getInbox().then(inboxData => setInbox(inboxData))
      api.getNextActions().then(nextActionsData => setNextActions(nextActionsData))
      api.getProjects().then(projectsData => setProjects(projectsData))
      api.getSomedayMaybe().then(somedayMaybeData => setSomedayMaybe(somedayMaybeData))
    }
  }, [loggedInUser, navigate])

  const value = {
    loggedInUser,
    setLoggedInUser,
    tutorialComplete,
    setTutorialComplete,
    inbox,
    setInbox,
    nextActions,
    setNextActions,
    nextActionsContexts,
    setNextActionsContexts,
    projects,
    setProjects,
    somedayMaybe,
    setSomedayMaybe,
    menuOpened,
    setMenuOpened
  }

  return (
    <AppContext value={value}>
      {children}
    </AppContext>
  )
}