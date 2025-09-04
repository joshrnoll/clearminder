import { motion } from 'motion/react'
import { useContext } from 'react'
import { AppContext } from './contexts/AppContext'
import MenuBar from './MenuBar'


export default function Calendar() {
  const { menuOpened, setMenuOpened, projects, nextActions } = useContext(AppContext)

  let today = new Date();
  let currentMonth = today.getMonth()
  let currentYear = today.getFullYear()

  let daysInCurrentMonth = daysInMonth(currentMonth, currentYear)

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  let arrayOfDaysInCurrentMonth = [];
  for (let i = 1; i < daysInCurrentMonth + 1; i++) {
    arrayOfDaysInCurrentMonth.push(i);
  }

  let nextActionsWithDates = [];
  let projectsWithDates = [];

  projects.forEach((project) => {
    if (project.dueDate) {
      projectsWithDates.push(project)
    }
  })

  nextActions.forEach((nextAction) => {
    if (nextAction.dueDate) {
      nextActionsWithDates.push(nextAction)
    }
  })

  return (
    <>
      <div className="flex">
        <AppContext value={{ menuOpened, setMenuOpened }}>
          <MenuBar></MenuBar>
        </AppContext>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newProjectForm"
          className="flex flex-col items-center gap-2 w-[100%]">

          <h1 className="m-3 text-[48pt]">Calendar</h1>

        </motion.div>
      </div>
    </>
  )
}