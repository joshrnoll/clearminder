import { useContext } from 'react'
import { AppContext } from './contexts/AppContext'
import { motion } from 'motion/react'
import MenuBar from './MenuBar'
import { SomedayMaybe } from './classes.js'

export default function NewSomedayMaybeForm() {

  const { setSomedayMaybe } = useContext(AppContext)

  const handleSubmit = () => {
    let newSomedayMaybe = new SomedayMaybe(name)
    setSomedayMaybe((prevData) => [...prevData, newSomedayMaybe])
    alert("Someday-Maybe added!")
  }

  let name;

  return (
    <>
      <div className="flex">
        <MenuBar></MenuBar>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newSomedayMaybeForm"
          className="flex flex-col items-center gap-2 w-[100%]"
        >

          <h1 className="flex justify-center m-3 text-[48pt]">New Someday-Maybe</h1>

          <input
            autoFocus
            placeholder="Name"
            className="border rounded-md p-3"
            onBlur={(event) => name = event.target.value}
          ></input>

          <button
            id="newSomedayMaybeSubmitButton"
            className="btn-primary"
            onClick={handleSubmit}
          >Submit</button>

        </motion.div>
      </div>
    </>
  )
}