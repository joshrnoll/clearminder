import { Link } from 'react-router-dom'
import Home from './Home'

export default function Welcome(){

  return(
    <>
      <h1>Welcome to Stupf!</h1>
      <h2>A To-Do app built on GTD principals</h2>
      <Link to="/home" element={<Home></Home>}>
        <button>Get Started</button>
      </Link>
    </>
  )
}