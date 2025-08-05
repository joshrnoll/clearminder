import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NextActionContext, ProjectContext, ContextsForNextActions } from './Contexts'
import { NextAction } from './classes'

export default function NewNextActionForm(){

  const nextActions = useContext(NextActionContext);
  const projects = useContext(ProjectContext);
  const nextActionContexts = useContext(ContextsForNextActions)

  let name;
  let context;
  let dueDate;
  let linkedProject;

  return(
    <>
      <h1 className="m-3">New Next Action</h1>

      <div id="newProjectForm" className="flex flex-col content-center flex-wrap gap-2">
        <input placeholder="Name" onBlur={(event) => name = event.target.value }>
        </input>

        <label htmlFor="context">Context</label>
        <select className="border rounded-md bg-[#242424]" id="context" onBlur={(event) => context = event.target.value }>
          <option selected>General</option>
          { nextActionContexts.map((context) => {
            return <option>{ context }</option>
          })}
        </select>

        <input type="date" placeholder="Due Date" onBlur={(event) => dueDate = event.target.value }>
        </input>

        <label htmlFor="linkedProjects">Linked Project</label>
        <select id="linkedProjects" className="border rounded-md mb-5 bg-[#242424]" onBlur={(event) => linkedProject = event.target.value }>
          <option selected>None</option>
          { projects.map((project) => {
            return <option>{ project.name }</option>
          }) }
        </select>

      </div>

      <button id="newProjectSubmitButton" onClick={() => {
        let newNextAction = new NextAction(name, context, dueDate, linkedProject)
        nextActions.push(newNextAction)
        alert("Next Action added!")
      }}>Submit</button>

      <Link to="/home">
        <button>Go Back</button>
      </Link>

      <Link to="/new-context">
        <button>Create a new context</button>
      </Link>
    </>
  )
}