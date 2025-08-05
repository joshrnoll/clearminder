import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { NextActionContext } from './Contexts'

export default function NextActionsList(){

  let nextActions = useContext(NextActionContext)

  return (
    <>
      <Link to="/home">
        <button className="m-3">X</button>
      </Link>

      <table className="border border-separate border-spacing-2 rounded-md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Context</th>
            <th>Due Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Associated Project</th>
          </tr>
        </thead>
        <tbody>
          { nextActions.map((nextAction) => {
            return (
              <tr>
                <td>{ nextAction?.name }</td>
                <td>{ nextAction?.context }</td>
                <td>{ nextAction?.dueDate }</td>
                <td>{ nextAction?.startDate }</td>
                <td>{ nextAction?.endDate }</td>
                <td>{ nextAction?.linkedProjects }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}