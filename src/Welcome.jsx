import { useState, createContext } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import NewProjectForm from './NewProjectForm'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'
import ProjectsList from './ProjectsList'
import NewContextForm from './NewContextForm'
import Calendar from './Calendar'

export const NextActionContext = createContext()

export default function Welcome(){

  const [userWelcomed, setUserWelcomed] = useState(false);
  const [nextActions, setNextActions] = useState([])

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
      <Route path="/new-project" element={<NewProjectForm></NewProjectForm>}></Route>
      <Route path="/projects" element={<ProjectsList></ProjectsList>}></Route>
      <Route path="/new-next-action" element={
        <NextActionContext value={{ nextActions, setNextActions }}>
          <NewNextActionForm></NewNextActionForm>
        </NextActionContext>
        }></Route>
      <Route path="/next-actions" element={
        <NextActionContext value={{ nextActions, setNextActions }}>
          <NextActionsList></NextActionsList>
        </NextActionContext>
        }></Route>
      <Route path="/new-context" element={<NewContextForm></NewContextForm>}></Route>
      <Route path="/calendar" element={<Calendar></Calendar>}></Route>
    </Routes>

    </>
  )
}