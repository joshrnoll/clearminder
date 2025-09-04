import { useContext } from 'react'
import { AppContext } from '../App'

export default function LogoutButton(){

  const { setLoggedInUser } = useContext(AppContext)

  const handleLogout = (() => {
    setLoggedInUser(null)
  })

  return (
    <button onClick={handleLogout} className="btn-primary">Logout</button>
  )
}