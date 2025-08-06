import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { NextActionsContext } from './Welcome'

export default function NextActionsList(){

  const nextActionsState = useContext(NextActionsContext)

  return (
    <>
      <Link to="/home">
        <button className="m-3">X</button>
      </Link>

      <table className="border-separate border-spacing-2 rounded-md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Context</th>
            <th>Due Date</th>
            <th>Associated Project</th>
          </tr>
        </thead>
        <tbody>
          { nextActionsState.nextActions.map((nextAction) => {
            return (
              !nextAction.complete &&
              <tr>
                <td className="px-2 py-1 border rounded-md">{ nextAction?.name }</td>
                <td className="px-2 py-1 border rounded-md">{ nextAction?.context }</td>
                <td className="px-2 py-1 border rounded-md">{ nextAction?.dueDate }</td>
                <td className="px-2 py-1 border rounded-md">{ nextAction?.linkedProjects }</td>
                <td><button onClick={() => nextAction.complete = true }>✅</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}