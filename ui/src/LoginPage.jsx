import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './App'
import { apiUrl } from '../utils/constants.js'

export default function LoginPage(){

  const navigate = useNavigate()
  const { setLoggedInUser } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const password = formData.get("password")
    const username = formData.get("username")

    // Authenticate user via API
    authenticateUser(username, password)
  }

  function authenticateUser(username, password){
    fetch(`${apiUrl}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then((res) => {
      if(res.status === 200){
        return res.json()
      }
      else if(res.status === 401){
        alert('Login failed')
      }
      else if(!res.ok){
        console.error(`Error while contacting the API server. Received status code of ${res.status}:\n${res}`)
      }
      else{
        console.log(`Something went wrong:\n${res}`)
      }
    })
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
        <h1 className="m-1">Log In to ClearMinder</h1>
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