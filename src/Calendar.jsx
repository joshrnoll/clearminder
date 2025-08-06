import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ProjectsContext, NextActionsContext } from './Welcome'

export default function Calendar(){
  const projectsState = useContext(ProjectsContext)
  const nextActionsState = useContext(NextActionsContext)

  let today = new Date();
  let currentMonth = today.getMonth()
  let currentYear = today.getFullYear()

  let daysInCurrentMonth = daysInMonth(currentMonth, currentYear)

  function daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
  }

  let arrayOfDaysInCurrentMonth = [];
  for (let i = 1; i < daysInCurrentMonth +1; i++){
    arrayOfDaysInCurrentMonth.push(i);
  }

  let nextActionsWithDates = [];
  let projectsWithDates = [];

  projectsState.projects.forEach((project) => {
    if (project.dueDate){
      projectsWithDates.push(project)
    }
  })

  nextActionsState.nextActions.forEach((nextAction) => {
    if (nextAction.dueDate){
      nextActionsWithDates.push(nextAction)
    }
  })

  return (
    <>
      <Link to="/home">
        <button>X</button>
      </Link>
      <h1>Calendar</h1>
      <h2 className="mb-3">{ today.toLocaleString('default', { month: 'long'}) }</h2>
      <div className="grid grid-cols-7 gap-5">
        { arrayOfDaysInCurrentMonth.map((day) => {
          return (
            <div key={day} className="border w-24 h-24 hover:animate-pulse">
                <h4>{day}</h4>
                <ul>
                 {projectsWithDates.map((project) => {
                    let date = project.dueDate.split('-')[2]
                    return date == day ? <li>{project.name}</li> : <></>
                  })}
                </ul>

                <ul>
                 {nextActionsWithDates.map((nextAction) => {
                    let date = nextAction.dueDate.split('-')[2]
                    return date == day ? <li>{nextAction.name}</li> : <></>
                  })}
                </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}