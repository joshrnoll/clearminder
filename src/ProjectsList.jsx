export default function NextActionsList({ projects }){

  return(
    <>
      <h2>Projects List</h2>
      <ul>
        { projects.map((project) => {
          return <li key={project.name}>{ project.name }</li>
        }) }
      </ul>
    </>
  )
}