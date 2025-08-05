import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextsForNextActions } from './Contexts'


export default function NewContextForm(){

  let contexts = useContext(ContextsForNextActions)

  let newContext;

  return(
    <>
      <h1 className="m-3">New Context</h1>

      <div id="newProjectForm" className="flex flex-col content-center flex-wrap gap-2">
        <input placeholder="Name" onBlur={(event) => newContext = event.target.value }>
        </input>
      </div>

      <button id="newContextSubmitButton" onClick={() => {
        contexts.push(newContext)
        alert("New context added!")
      }}>Submit</button>

      <Link to="/home">
        <button>Go Back</button>
      </Link>
    </>
  )
}