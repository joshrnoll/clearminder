import { useContext } from 'react'
import { motion } from 'motion/react'
import MenuBar from './MenuBar'
import { AppContext } from './App'

function Home() {

  const today = () => {
    let now = new Date()
    let year = now.getFullYear()
    let month = String(now.getMonth() + 1).padStart(2, '0')
    let day = String(now.getDate()).padStart(2, '0')
    let currentDate = `${year}-${month}-${day}`
    return currentDate
  }

  const { stupf, nextActions } = useContext(AppContext)
  return (
    <>
      <div id="homeContainer" className="grid grid-cols-3">

        <MenuBar></MenuBar>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newSomedayMaybeForm"
          className="flex flex-col content-center flex-wrap gap-2"
        >

          <br />

          <h2 className="flex justify-center text-[32pt] font-bold">Inbox</h2>

          <ul>
            {stupf.length === 0 && <p className="flex justify-center italic">Your "in" is empty!</p>}

            {stupf.map((item) => {
              return <li className="flex justify-center italic">{item}</li>
            })}
          </ul>

          <br />

          <h2 className="flex justify-center text-[24pt] font-bold">For Today</h2>

          <ul>
            {nextActions.length === 0 && <p className="flex justify-center italic">Nothing for today!</p>}

            {nextActions.length > 0 && nextActions.map((item) => {
              if (item.dueDate && item.dueDate === today()) {
                return <li className="flex justify-center italic">{item.name}</li>
              }
            })}
          </ul>

        </motion.div>

      </div>
    </>
  )
}

export default Home
