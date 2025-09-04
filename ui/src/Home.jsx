import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import MenuBar from './MenuBar'
import { AppContext } from './App'
import { LuListTodo } from "react-icons/lu";
import { AiOutlineProject } from "react-icons/ai";
import { FaRegTimesCircle } from "react-icons/fa";
import { TbFolderQuestion } from "react-icons/tb";

function Home() {

  const today = () => {
    let now = new Date()
    let year = now.getFullYear()
    let month = String(now.getMonth() + 1).padStart(2, '0')
    let day = String(now.getDate()).padStart(2, '0')
    let currentDate = `${year}-${month}-${day}`
    return currentDate
  }

  const { loggedInUser, inbox, nextActions } = useContext(AppContext)
  const navigate = useNavigate()

  if(loggedInUser){
    return (
      <>
        <div id="homeContainer" className="grid grid-cols-3">

          <MenuBar></MenuBar>

          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            id="homeScreen"
            className="flex flex-col content-center flex-wrap gap-2"
          >

            <br />

            <h2 className="flex justify-center text-[32pt] font-bold">Inbox</h2>

            {inbox &&
              <ul>
                {inbox.length === 0 && <p className="flex items-center italic">Your "in" is empty!</p>}

                {inbox.length > 0 && inbox.map((item) => {
                  return (
                    <>
                      <li key={item.created_at}className="m-3 flex gap-3 items-center italic">
                        {item.content}
                        <div className="flex gap-3">
                          <LuListTodo className="icon-primary size-7" />
                          <AiOutlineProject className="icon-primary size-7"/>
                          <TbFolderQuestion className="icon-primary size-7"/>
                          <FaRegTimesCircle className="icon-primary size-7 text-[red]"/>
                        </div>
                      </li>
                    </>
                  )
                })}
              </ul>
            }

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
  else{
    navigate('/login')
  }
}

export default Home
