export default function NextActionDetailView( { selectedNextAction } ){

  console.log(selectedNextAction)

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
        <tr>
          <td>{ selectedNextAction?.name }</td>
          <td>{ selectedNextAction?.context }</td>
          <td>{ selectedNextAction?.dueDate }</td>
          <td>{ selectedNextAction?.startDate }</td>
          <td>{ selectedNextAction?.endDate }</td>
          <td>{ selectedNextAction?.linkedProjects }</td>
        </tr>
      </tbody>
    </table>
  )
}