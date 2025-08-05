export default function ProjectsList({ nextActions }){

  return(
    <>
      <h2>Next Actions List</h2>
      <ul>
        { nextActions.map((nextAction) => {
          return <li key={nextAction.name}>{ nextAction.name }</li>
        }) }
      </ul>
    </>
  )
}