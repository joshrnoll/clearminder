import { motion } from 'motion/react'
import { useContext } from 'react'
import { AppContext } from './contexts/AppContext'
import MenuBar from './MenuBar'
import ListHeader from './blocks/ListHeader'
import ProjectsListItem from './blocks/ProjectsListItem'

export default function ProjectsList() {

  let { projects } = useContext(AppContext)

  return (
    <>
      <div className="flex">
        <MenuBar></MenuBar>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newProjectForm"
          className="flex flex-col items-center gap-2 w-[100%]">

          <ListHeader heading="Projects List" route="/new-project"/>

          <ul>
            {projects.map((project) => {
              return <ProjectsListItem project={project}></ProjectsListItem>
            })}
          </ul>
        </motion.div>
      </div>
    </>
  )

}