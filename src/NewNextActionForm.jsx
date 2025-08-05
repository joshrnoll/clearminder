import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NextActionContext } from './Contexts'
import { NextAction } from './classes'

export default function NewNextActionForm(){

  const nextActions = useContext(NextActionContext);

  let name;
  let context;
  let dueDate;
  let startDate;
  let endDate;
  let linkedProjects = [];

  return(
    <>
      <h1 className="m-3">New Next Action</h1>

      <div id="newProjectForm" className="flex flex-col content-center flex-wrap gap-2">
        <input placeholder="Name" onBlur={(event) => name = event.target.value }>
        </input>

        <input placeholder="Context" onBlur={(event) => context = event.target.value }>
        </input>

        <input placeholder="Due Date" onBlur={(event) => dueDate = event.target.value }>
        </input>

        <input placeholder="Start Date" onBlur={(event) => startDate = event.target.value }>
        </input>

        <input placeholder="End Date" onBlur={(event) => endDate = event.target.value }>
        </input>

        <input placeholder="Linked Projects" onBlur={(event) => linkedProjects = event.target.value }>
        </input>

      </div>

      <button id="newProjectSubmitButton" onClick={() => {
        let newNextAction = new NextAction(name, context, dueDate, startDate, endDate, linkedProjects)
        nextActions.push(newNextAction)
        alert("Next Action added!")
      }}>Submit</button>

      <Link to="/home">
        <button>Go Back</button>
      </Link>
    </>
  )
}