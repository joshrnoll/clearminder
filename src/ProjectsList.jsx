import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ProjectsContext } from './Welcome'

export default function ProjectsList(){

let projectsState = useContext(ProjectsContext)
console.log(projectsState)

  if (projectsState.projects.length === 0){
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
          { projectsState.projects.map((project) => {
            return (
              <tr>
                <td className="px-2 py-1 border rounded-md">{ project?.name }</td>
                <td className="px-2 py-1 border rounded-md">{ project?.goal }</td>
                <td className="px-2 py-1 border rounded-md">{ project?.dueDate }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
  }
}