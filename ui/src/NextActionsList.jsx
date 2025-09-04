import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useContext } from 'react'
import { AppContext } from './contexts/AppContext'
import MenuBar from './MenuBar'
import ListHeader from './blocks/ListHeader'
import NextActionsListItem from './blocks/NextActionsListItem'
import ContextFilter from './blocks/ContextFilter'

export default function NextActionsList() {

  const { nextActions } = useContext(AppContext)
  const params = useParams()

  const nextActionsList = (
    <ul>
      {params.context ?

        nextActions.map((nextAction) => {
          return (
            !nextAction.complete && nextAction.context === params.context &&
            <>
              <NextActionsListItem nextAction={nextAction}/>
            </>
          )
        })
        :
        nextActions.map((nextAction) => {
          return (
            !nextAction.complete &&
            <>
              <NextActionsListItem nextAction={nextAction}/>
            </>
          )
        })}

    </ul>
  )

  return (
    <>
      <div className="flex">

        <MenuBar></MenuBar>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newProjectForm"
          className="flex flex-col items-center gap-2 w-[100%]">

          <ListHeader heading="Next Actions List" route="/new-next-action"/>

          <div className="w-[100vw] flex justify-center">
            <div className="flex">
              <ContextFilter />
            </div>
            {params.context &&
              <Link to="/next-actions" className="absolute right-5">
                <button className="btn-primary">clear filter</button>
              </Link>
            }
          </div>

          {nextActionsList}

        </motion.div>

      </div>
    </>
  )
}