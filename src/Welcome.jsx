import { useState, createContext } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import NewProjectForm from './NewProjectForm'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'
import ProjectsList from './ProjectsList'
import NewContextForm from './NewContextForm'
import Calendar from './Calendar'

export const NextActionsContext = createContext()
export const ProjectsContext = createContext()
export const CalendarContext = createContext()

export default function Welcome(){

  const [userWelcomed, setUserWelcomed] = useState(false)
  const [nextActions, setNextActions] = useState([])
  const [nextActionsContexts, setNextActionsContexts] = useState([])
  const [projects, setProjects] = useState([])

  return(
    <>
      {!userWelcomed &&
        <>
          <h1>Welcome to Stupf!</h1>
          <h2>A To-Do app built on GTD principals</h2>
          <Link to="/home" element={<Home></Home>}>
            <button onClick={() => setUserWelcomed(true)}>Get Started</button>
          </Link>
        </>
      }

    <Routes>
      <Route path="/home/*" element={<Home></Home>}></Route>
      <Route path="/new-project" element={
        <ProjectsContext value={{ projects, setProjects}}>
          <NewProjectForm></NewProjectForm>
        </ProjectsContext>
        }></Route>

      <Route path="/projects" element={
        <ProjectsContext value={{ projects, setProjects}}>
          <ProjectsList></ProjectsList>
        </ProjectsContext>
        }></Route>

      <Route path="/new-next-action" element={
        <NextActionsContext value={{ nextActions, setNextActions, nextActionsContexts, setNextActionsContexts, projects, setProjects }}>
          <NewNextActionForm></NewNextActionForm>
        </NextActionsContext>
        }></Route>

      <Route path="/next-actions" element={
        <NextActionsContext value={{ nextActions, setNextActions }}>
          <NextActionsList></NextActionsList>
        </NextActionsContext>
        }></Route>

      <Route path="/new-context" element={
        <NextActionsContext value={{ nextActionsContexts, setNextActionsContexts }}>
          <NewContextForm></NewContextForm>
        </NextActionsContext>
        }></Route>

      <Route path="/calendar" element={
        <CalendarContext value={{ nextActions, projects, setNextActions, setProjects }}>
          <Calendar></Calendar>
        </CalendarContext>
        }></Route>
    </Routes>

    </>
  )
}