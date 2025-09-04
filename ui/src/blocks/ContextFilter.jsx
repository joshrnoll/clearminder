import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import { HiHashtag } from 'react-icons/hi'

export default function ContextFilter() {

  const { nextActionsContexts } = useContext(AppContext)

  return (
    <>
      {/* <h3 className="font-bold self-center">Contexts</h3> */}
      {nextActionsContexts.map((context) => {
        return (
          <Link to={`/next-actions/${context}`}>
            <div
            id={context}
            className="m-1 flex justify-center btn-secondary">
              <HiHashtag />
              <p className="italic self-center">{context}</p>
            </div>
          </Link>
        )
      })}
    </>
  )

}