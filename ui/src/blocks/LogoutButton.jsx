import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export default function LogoutButton(){

  const { setLoggedInUser } = useContext(AppContext)

  const handleLogout = (() => {
    setLoggedInUser(null)
  })

  return (
    <button onClick={handleLogout} className="btn-primary">Logout</button>
  )
}