import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { userLogin } from '../utils/api.js'

export default function LoginPage(){

  const navigate = useNavigate()
  const { setLoggedInUser } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const password = formData.get("password")
    const username = formData.get("username")

    // Authenticate user via API
    userLogin(username, password)
    .then(data => {
      if(data){
        setLoggedInUser(data)
        navigate('/')
      }
      else{
        setLoggedInUser(null)
      }
    })
    .catch(err => console.error(`Error received from the API server:\n${err}`))
  }

  return(
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="m-1 text-[32pt] font-bold">Log In to ClearMinder</h1>
        <img src="/favicon/android-chrome-512x512.png" className="m-3 size-50 rounded-3xl"/>
        <input
          type="text" name="username"
          placeholder="Username"
          className="border rounded-md p-1 m-1"
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border rounded-md p-1 m-1"
        ></input>
        <button
          className="btn-primary m-1"
          type="submit"
        >Login</button>
      </form>
    </>
  )
}