import { useContext } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import MenuBar from './MenuBar'


export default function NewContextForm() {

  const { setNextActionsContexts } = useContext(AppContext)

  let newContext;

  return (
    <>
      <div className="flex">
        <MenuBar></MenuBar>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newProjectForm"
          className="flex flex-col items-center gap-2 w-[100%]">

        <h1 className="flex justify-center m-3 text-[48pt]">New Context</h1>

        <div id="newProjectForm" className="flex flex-col content-center flex-wrap gap-2">
          <input placeholder="Name" onInput={(event) => newContext = event.target.value}>
          </input>

          <button
            id="newContextSubmitButton"
            className="btn-primary"
            onClick={() => {
              setNextActionsContexts((prevData) => [...prevData, newContext])
              alert("New context added!")
            }}
          >Submit</button>
        </div>
        </motion.div>
      </div>
    </>
  )
}