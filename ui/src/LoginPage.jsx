import { useContext } from 'react'
import { AppContext } from './App'

export default function LoginPage(){

  const { setLoggedInUser } = useContext(AppContext)

  function authenticateUser(username, password){
    fetch(`${import.meta.env.VITE_API_PROTO}://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then((res) => {
      if(res.status === 200){
        setLoggedInUser({
          "username": username
        })
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
    .catch(err => console.error(`Error received from the API server:\n${err}`))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const password = formData.get("password")
    const username = formData.get("username")

    // Authenticate user via API
    authenticateUser(username, password)

    // If true, setLoggedInUser. If false, display failed login
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