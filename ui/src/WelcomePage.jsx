import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import * as api from '../utils/api.js'
import { motion } from 'motion/react'
import Home from './Home'

export default function WelcomePage(){

  const navigate = useNavigate()
  const { tutorialComplete, setTutorialComplete, loggedInUser } = useContext(AppContext)

  useEffect(() => {
    if (loggedInUser && tutorialComplete){
      navigate('/home')
    }
  }, [])

  return(
    !tutorialComplete &&
      <>
        <motion.h1
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="flex justify-center text-[48pt]"
        >Welcome to <span className="italic font-bold">&nbsp;ClearMinder!</span>
        </motion.h1>

        <motion.h2
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="flex justify-center text-[24pt]"
        >A To-Do app built on GTD principals
        </motion.h2>

        <Link to="/home" className="flex justify-center" element={<Home></Home>}>
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="text-[24pt] p-3 mt-3 btn-primary rounded-3xl"
            onClick={() => {
              api.setTutorialStatus(true)
              .then(status => setTutorialComplete(status))
            }}
          >Get Started
          </motion.button>
        </Link>
      </>
  )
}