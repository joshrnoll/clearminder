import './Home.css'
import { useContext  } from 'react'
import { Link } from 'react-router-dom'
import { ProjectContext, NextActionContext } from './Contexts'
import NewProjectForm from './NewProjectForm'
import ProjectsList from './ProjectsList'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'

function Home() {
  const projects = useContext(ProjectContext)
  const nextActions = useContext(NextActionContext)

  return (
    <>
      <Link to="/new-project">
        <button>New Project</button>
      </Link>
      <Link to="/new-next-action">
        <button>New Next Action</button>
      </Link>

      { projects.length > 0 && <ProjectsList projects={ projects } />}

      { nextActions.length > 0 && <NextActionsList nextActions={ nextActions } />}
    </>
  )
}

export default Home
