import './index.css'
import { useState, useEffect, createContext } from 'react'
import { motion } from 'motion/react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import NewProjectForm from './NewProjectForm'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'
import ProjectsList from './ProjectsList'
import NewContextForm from './NewContextForm'
import Calendar from './Calendar'
import AddStupf from './AddStupf'
import NewSomedayMaybeForm from './NewSomedayMaybeForm'
import SomedayMaybeList from './SomedayMaybeList'
import LoginPage from './LoginPage'

export const AppContext = createContext()

export default function App() {

  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem("loggedInUser")))
  const [userWelcomed, setUserWelcomed] = useState(false)
  const [stupf, setStupf] = useState([])
  const [nextActions, setNextActions] = useState([])
  const [nextActionsContexts, setNextActionsContexts] = useState([])
  const [projects, setProjects] = useState([])
  const [somedayMaybe, setSomedayMaybe] = useState([])
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    console.log(loggedInUser)
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
  },[loggedInUser])

  if (loggedInUser){
    return (
      <>
        {!userWelcomed &&
          <>
            <motion.h1
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="flex justify-center text-[48pt]"
            >Welcome to <span className="italic font-bold">&nbsp;ClearMinder!</span>
            </motion.h1>

            <motion.h2
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="flex justify-center text-[24pt]"
            >A To-Do app built on GTD principals
            </motion.h2>

            <Link to="/home" className="flex justify-center" element={<Home></Home>}>
              <motion.button
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-[24pt] p-3 mt-3 btn-primary rounded-3xl"
                onClick={() => setUserWelcomed(true)}
              >Get Started
              </motion.button>
            </Link>
          </>
        }

        <Routes>
          <Route path="/home/*" element={
            <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, stupf, nextActions }}>
              <Home></Home>
            </AppContext>
          }></Route>

          <Route path="/add-stupf" element={
            <AppContext value={{ menuOpened, setMenuOpened, nextActionsContexts, setStupf }}>
              <AddStupf></AddStupf>
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
  else{
    return(
      <AppContext value={{ loggedInUser, setLoggedInUser }}>
        <LoginPage />
      </AppContext>
    )
  }
}