import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'

export default function ListHeader({ heading, route }){

  if (!heading){
    console.error("Component ListHeader must take prop 'heading'")
  }
  if (!route){
    console.error("Component ListHeader must take prop 'route'")
  }

  return (
    <div className="w-[100%] flex justify-center">
      <h1 className="m-3 text-[48pt]">{ heading }</h1>
      <div className="absolute top-8 right-8 transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer hover:">
        <Link to={ route }>
          <MdAddCircle size={50} />
        </Link>
      </div>
    </div>
  )
}