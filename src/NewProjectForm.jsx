import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { ProjectContext } from './Contexts'
import { Project } from './classes'

export default function NewProjectForm(){

  const projects = useContext(ProjectContext);

  let name;
  let goal;
  let dueDate;
  let startDate;
  let endDate;

  return(
    <>
      <h1 className="m-3">New Project</h1>

      <div id="newProjectForm" className="flex flex-col content-center flex-wrap gap-2">
        <input placeholder="Name" onBlur={(event) => name = event.target.value }>
        </input>

        <input placeholder="Goal" onBlur={(event) => goal = event.target.value }>
        </input>

        <input placeholder="Due Date" onBlur={(event) => dueDate = event.target.value }>
        </input>

        <input placeholder="Start Date" onBlur={(event) => startDate = event.target.value }>
        </input>

        <input placeholder="End Date" onBlur={(event) => endDate = event.target.value }>
        </input>

      </div>

      <button id="newProjectSubmitButton" onClick={() => {
        let newProject = new Project(name, goal, dueDate, startDate, endDate)
        projects.push(newProject)
        alert("Project added!")
      }}>Submit</button>

      <Link to="/home">
        <button>Go Back</button>
      </Link>
    </>
  )
}