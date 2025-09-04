import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { AppContext } from './contexts/AppContext'
import { BiDockLeft } from 'react-icons/bi'
import { MdAddCircle } from 'react-icons/md'
import LogoutButton from './blocks/LogoutButton'
import ContextFilter from './blocks/ContextFilter'

export default function MenuBar() {

  const { menuOpened, setMenuOpened } = useContext(AppContext)

  return (
    <div className="flex justify-start">

      {menuOpened &&
        <motion.nav initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div
            id="navBar"
            className="w-[15vw] h-[100vh] flex flex-col items-center bg-site-background"
          >

            {/* TODO: Add an 'inbox' button */}
            {/* <div className="self-end pt-3 pb-3 m-3 text-center transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer hover:">
              <Link to="/add-inbox">
                <MdAddCircle size={30}/>
              </Link>
            </div> */}

            <div className="pt-3 pb-3 mb-1 text-center transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer">
              <Link to="/next-actions">
                <p>Next Actions List</p>
              </Link>
            </div>

            <div className="pt-3 pb-3 mb-1 text-center transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer">
              <Link to="/projects">
                <p>Projects List</p>
              </Link>
            </div>

            <div className="pt-3 pb-3 mb-1 text-center transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer">
              <Link to="/calendar">
                <p>Calendar</p>
              </Link>
            </div>

            <div className="pt-3 pb-3 mb-1 text-center transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer">
              <Link to="/someday-maybe">
                <p>Someday-Maybe List</p>
              </Link>
            </div>

            <hr className="w-[30%]"></hr>
            <ContextFilter />

            <LogoutButton></LogoutButton>
          </div>
        </motion.nav>
      }

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setMenuOpened(menuOpened ? false : true)}
        className="h-[100vh] w-[15] bg-site-alt-bg-color rounded-r-lg p-2"
      >
        <BiDockLeft className="w-[30px] h-[30px] transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer" />
      </motion.div>

    </div>
  )
}