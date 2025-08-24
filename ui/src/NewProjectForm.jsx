import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './App'
import { Project } from './classes'
import MenuBar from './MenuBar'
import Form from './blocks/Form'

export default function NewProjectForm(){

  const { setProjects } = useContext(AppContext);

  let name;
  let goal;
  let dueDate;

  const handleSubmit = () => {
    let newProject = new Project(name, goal, dueDate)
    console.log(newProject)
    setProjects((prevData) => [...prevData, newProject])
  }

  const newProjectForm = (
    <div id="newProjectForm" className="flex flex-col gap-2">
      <input placeholder="Name" onInput={(event) => name = event.target.value } />

      <input placeholder="Goal" onInput={(event) => goal = event.target.value } />

      <label htmlFor="dueDate">Due Date</label>
      <input className="mb-5" id="dueDate" type="date" onInput={(event) => dueDate = event.target.value } />

      <Link to="/projects">
        <button
          id="newProjectSubmitButton"
          className="btn-primary"
          onClick={handleSubmit}>
            Submit
          </button>
      </Link>
    </div>
  )

  return(
    <>
      <div className="flex">
        <MenuBar></MenuBar>
        <Form title="Project" form={newProjectForm} />
      </div>
    </>
  )
}


