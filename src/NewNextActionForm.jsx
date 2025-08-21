import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NextAction } from './classes'
import { AppContext } from './App'
import MenuBar from './MenuBar'
import Form from './blocks/Form'

export default function NewNextActionForm() {

  const { projects, nextActionsContexts, setNextActions } = useContext(AppContext);

  let name;
  let context;
  let dueDate;
  let linkedProject;

  const handleSubmit = () => {
    let newNextAction = new NextAction(name, context, dueDate, linkedProject)
    setNextActions((prevData) => [...prevData, newNextAction])
  }

  const newNextActionForm = (
    <div id="newNextActionForm" className="flex flex-col gap-2">
      <input placeholder="Name" onBlur={(event) => name = event.target.value}>
      </input>

      <label htmlFor="context">Context</label>
      <select className="border rounded-md" id="context" onBlur={(event) => context = event.target.value}>
        <option selected>General</option>
        {nextActionsContexts.map((context) => {
          return <option>{context}</option>
        })}
      </select>

      <input type="date" placeholder="Due Date" onBlur={(event) => dueDate = event.target.value}>
      </input>

      <label htmlFor="linkedProjects">Linked Project</label>
      <select id="linkedProjects" className="border rounded-md mb-5" onBlur={(event) => linkedProject = event.target.value}>
        <option selected>None</option>
        {projects.map((project) => {
          return <option>{project.name}</option>
        })}
      </select>

      <Link to="/next-actions">
        <button
          id="newProjectSubmitButton"
          className="btn-primary"
          onClick={handleSubmit}
        >Submit</button>
      </Link>
    </div>
  )

  return (
    <>
      <div className="flex">
        <MenuBar />
        <Form title="Next Action" form={newNextActionForm} />
        <Link to="/new-context">
          <button
            className="absolute right-15 bottom-15 p-3 btn-primary"
          >Create a new context</button>
        </Link>
      </div>
    </>
  )
}