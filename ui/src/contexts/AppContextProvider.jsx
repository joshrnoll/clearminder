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
      api.userLogout()
      navigate('/login')
    }
    else {
      api.getTutorialStatus().then(status => setTutorialComplete(status))
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
      api.getInbox().then(inboxData => setInbox(inboxData))
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