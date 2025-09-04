import { motion } from 'motion/react'
import { useContext } from 'react'
import { AppContext } from './contexts/AppContext'
import MenuBar from './MenuBar'
import ListHeader from './blocks/ListHeader'
import SomedayMaybeListItem from './blocks/SomedayMaybeListItem'

export default function SomedayMaybeList(){

  const { somedayMaybe } = useContext(AppContext)
  
  return (
    <>
      <div className="flex">

        <MenuBar></MenuBar>

        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          id="newSomedayMaybeForm"
          className="flex flex-col items-center w-[100%]"
        >

          <ListHeader heading="Someday-Maybe List" route="/new-someday-maybe"/>

          <ul className="m-3 text-[18pt]">
            {somedayMaybe.map(somedayMaybeItem => {
              console.log(somedayMaybeItem)
              return <SomedayMaybeListItem somedayMaybeItem={ somedayMaybeItem } />
            })}
          </ul>

        </motion.div>
      </div>
    </>
  )
}