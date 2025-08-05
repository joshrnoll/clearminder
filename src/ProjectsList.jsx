import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ProjectContext } from './Contexts'

export default function ProjectsList(){

let projects = useContext(ProjectContext)

  if (projects.length === 0){
    return(
      <>
        <Link to="/home">
          <button className="m-3">X</button>
        </Link>
        <h1>You have no projects!</h1>
      </>
    )
  }

  else{
  return (
    <>
      <Link to="/home">
        <button className="m-3">X</button>
      </Link>
      <table className="border border-separate border-spacing-2 rounded-md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Goal</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          { projects.map((project) => {
            return (
              <tr>
                <td>{ project?.name }</td>
                <td>{ project?.goal }</td>
                <td>{ project?.dueDate }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
  }
}