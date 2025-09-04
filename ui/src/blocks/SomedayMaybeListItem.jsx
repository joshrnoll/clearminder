import { useState, useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { CiCircleCheck } from 'react-icons/ci'
import { CiCircleChevRight } from 'react-icons/ci'
import { CiCircleChevDown } from 'react-icons/ci'

export default function SomedayMaybeListItem({ somedayMaybeItem }) {

  if (!somedayMaybeItem){
    console.error("Component SomedayMaybeListItem must take prop 'somedayMaybe'")
  }

  // const { somedayMaybe, setSomedayMaybe } = useContext(AppContext)
  const [viewDetails, setViewDetails] = useState(false)
  const iconSize= 30

  let chevron = (
    <></>
  )

  switch (viewDetails) {
    case true:
      chevron = (
        <CiCircleChevDown size={iconSize} />
      )
      break;
    case false:
      chevron = (
        <CiCircleChevRight size={iconSize} />
      )
      break;
  }

  return (
    <li className="px-2 py-1">
      <div className="flex gap-3 items-center">
        <button
          className="hover:cursor-pointer"
          onClick={() => {
            alert('This feature is a future implementation')
            // TODO: refactor to call API rather than set state
          }}>
          <CiCircleCheck size={iconSize} className="text-[green]" />
        </button>
        <p>{somedayMaybeItem?.content}</p>
        <button
          className="hover:cursor-pointer"
          onClick={() => viewDetails === false ? setViewDetails(true) : setViewDetails(false)}>
          {chevron}
        </button>
      </div>
        {viewDetails &&
          <p>THE DEETS</p>
        }
    </li>
  )
}