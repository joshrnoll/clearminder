import { useContext } from 'react'
import { NextActionContext } from './Welcome'

export default function NextActionDetailView(){

  let nextActions = useContext(NextActionContext)

  return (
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
        { nextActions.Map((nextAction) => {
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
  )
}