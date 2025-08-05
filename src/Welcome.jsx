import { Link } from 'react-router-dom'
import Home from './Home'

export default function Welcome(){

  return(
    <Link to="/home" element={<Home></Home>}>
      <button>Get Started</button>
    </Link>
  )
}