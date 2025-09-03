import './index.css'
import * as api from '../utils/api.js'
import { useState, useEffect, createContext } from 'react'
import { motion } from 'motion/react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home'
import WelcomePage from './WelcomePage'
import NewProjectForm from './NewProjectForm'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'
import ProjectsList from './ProjectsList'
import NewContextForm from './NewContextForm'
import Calendar from './Calendar'
import AddToInbox from './AddToInbox'
import NewSomedayMaybeForm from './NewSomedayMaybeForm'
import SomedayMaybeList from './SomedayMaybeList'
import LoginPage from './LoginPage'

export const AppContext = createContext()

export default function App() {

  const navigate = useNavigate()

  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")))
  const [tutorialComplete, setTutorialComplete] = useState(false)
  const [inbox, setInbox] = useState([])
  const [nextActions, setNextActions] = useState([])
  const [nextActionsContexts, setNextActionsContexts] = useState([])
  const [projects, setProjects] = useState([])
  const [somedayMaybe, setSomedayMaybe] = useState([])
  const [menuOpened, setMenuOpened] = useState(false)


  useEffect(() => {
    if (!loggedInUser){
      navigate('/login')
    }
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
  },[loggedInUser])

  api.getTutorialStatus().then(status => setTutorialComplete(status))

  return (
    <>
      { loggedInUser &&
        <AppContext value={{ tutorialComplete, setTutorialComplete }}>
          <WelcomePage></WelcomePage>
        </AppContext>
      }

      <Routes>
        <Route path="/login" element={
          <AppContext value={{ loggedInUser, setLoggedInUser }}>
            <LoginPage />
          </AppContext>
        }></Route>

        <Route path="/home/*" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, inbox, nextActions }}>
            <Home></Home>
          </AppContext>
        }></Route>

        <Route path="/add-inbox" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, setInbox }}>
            <AddToInbox></AddToInbox>
          </AppContext>
        }></Route>

        <Route path="/new-project" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, projects, setProjects }}>
            <NewProjectForm></NewProjectForm>
          </AppContext>
        }></Route>

        <Route path="/projects" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, projects, setProjects }}>
            <ProjectsList></ProjectsList>
          </AppContext>
        }></Route>

        <Route path="/new-next-action" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, setNextActionsContexts, nextActions, setNextActions, projects, setProjects }}>
            <NewNextActionForm></NewNextActionForm>
          </AppContext>
        }></Route>

        <Route path="/next-actions" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, nextActions, setNextActions }}>
            <NextActionsList></NextActionsList>
          </AppContext>
        }></Route>

        <Route path="/next-actions/:context" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, nextActions, setNextActions }}>
            <NextActionsList></NextActionsList>
          </AppContext>
        }></Route>

        <Route path="/someday-maybe" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, somedayMaybe}}>
            <SomedayMaybeList></SomedayMaybeList>
          </AppContext>
        }></Route>

        <Route path="/new-someday-maybe" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, setSomedayMaybe}}>
            <NewSomedayMaybeForm></NewSomedayMaybeForm>
          </AppContext>
        }></Route>

        <Route path="/new-context" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, setNextActionsContexts }}>
            <NewContextForm></NewContextForm>
          </AppContext>
        }></Route>

        <Route path="/calendar" element={
          <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, nextActions, projects, setNextActions, setProjects }}>
            <Calendar></Calendar>
          </AppContext>
        }></Route>
      </Routes>
    </>
  )
}