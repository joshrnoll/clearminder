import { Link } from 'react-router-dom'

export default function NextActionsList({ projects }){

  if (projects.length === 0){
    return(
      <h1>You have no projects!</h1>
    )
  }

  else{
    return(
      <>
        <div>
          <Link to="/home"><button>X</button></Link>
          <h2>Projects List</h2>
          <ul>
            { projects.map((project) => {
              return <li key={project.name}>{ project.name }</li>
            }) }
          </ul>
        </div>
      </>
    )
  }
}