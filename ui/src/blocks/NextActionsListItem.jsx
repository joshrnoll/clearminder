import { useState, useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { CiCircleCheck } from 'react-icons/ci'
import { CiCircleChevRight } from 'react-icons/ci'
import { CiCircleChevDown } from 'react-icons/ci'

export default function NextActionsListItem({ nextAction }) {

  if (!nextAction){
    console.error("Component NextActionsListItem must take prop 'nextAction'")
  }

  const { nextActions, setNextActions } = useContext(AppContext)
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
            nextAction.complete = true
            let newArray = nextActions.filter((item) => item.id != nextAction.id)
            newArray.push(nextAction)
            setNextActions(newArray)
          }}>
          <CiCircleCheck size={iconSize} className="text-[green]" />
        </button>
        <p>{nextAction?.name}</p>
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