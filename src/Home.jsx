import './Home.css'
import { useContext } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { ProjectContext, NextActionContext } from './Contexts'
import NewProjectForm from './NewProjectForm'
import ProjectsList from './ProjectsList'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'
import Calendar from './Calendar'

function Home() {
  const projects = useContext(ProjectContext)
  const nextActions = useContext(NextActionContext)

  return (
    <>
      <h1>Stupf</h1>
      <h2>A To-Do app built on GTD Principals</h2>

      <div className="flex gap-15 mt-5">
        <div className="flex flex-col gap-3 mt-5">
          <Link to="/new-project">
            <button>New Project</button>
          </Link>

          <Link to="/new-next-action">
            <button>New Next Action</button>
          </Link>

        </div>

        <div className="flex flex-col gap-3 mt-5">
          <Link to="/next-actions">
            <button>View Next Actions</button>
          </Link>

          <Link to="/projects">
            <button>View Projects</button>
          </Link>

          <Link to="/calendar">
            <button>View Calendar</button>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="projects/*" element={<ProjectsList projects={ projects }></ProjectsList>}></Route>

      </Routes>
    </>
  )
}

export default Home
