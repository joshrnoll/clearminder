import { Link, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import NextActionDetailView from './NextActionDetailView'

export default function NextActionsList({ nextActions }){

  const [selectedNextAction, setSelectedNextAction] = useState();

  return(
    <>
      <Link to="/home"><button>X</button></Link>

      <h2>Next Actions List</h2>
      <ul>
        { nextActions.map((nextAction) => {
          return (
            <Link to={`/home/next-actions/details/${nextAction.id}`}>
              <button onClick={() => setSelectedNextAction(nextAction)}>{nextAction.name}</button>
            </Link>
          )
        }) }
      </ul>

      <Routes>
        <Route path="details/:id" element={<NextActionDetailView selectedNextAction={ selectedNextAction }></NextActionDetailView>}></Route>
      </Routes>
    </>
  )
}