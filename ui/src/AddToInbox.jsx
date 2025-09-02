import { useState, useContext } from 'react'
import { motion } from 'motion/react'
import { AppContext } from './App'
import MenuBar from './MenuBar'

export default function AddToInbox() {

  const { setInbox } = useContext(AppContext)
  const [input, setInput] = useState("")

  return (
    <>
      <div className="flex">

        <MenuBar></MenuBar>

        <div className="flex flex-col items-center w-[100%]">
          <h1 className="text-[48pt]">Add Something to "In"</h1>
          <textarea
            id="inboxInput"
            type="text"
            placeholder="What's on your mind?"
            className="p-3 w-1/2 border rounded-md"
            onInput={(event) => setInput(event.target.value)}
          ></textarea>

          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="text-[24pt] text-blue-text p-3 mt-3 border rounded-2xl hover:shadow-xl/30 transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer"
            onClick={() => {
              setInbox((prevData) => [...prevData, input])
              alert("Item added!")
              document.getElementById('inboxInput').value=''
            }}
          >Add
          </motion.button>
        </div>
      </div>
    </>
  )
}