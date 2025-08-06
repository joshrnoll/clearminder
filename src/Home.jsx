import './Home.css'
import { Link } from 'react-router-dom'

function Home() {

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
    </>
  )
}

export default Home
