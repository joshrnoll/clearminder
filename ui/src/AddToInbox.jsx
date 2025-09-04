import { useContext } from 'react'
import { AppContext } from './contexts/AppContext'
import { addToInbox } from '../utils/api.js'
import { motion } from 'motion/react'
import MenuBar from './MenuBar'
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function AddToInbox() {

  const { setInbox } = useContext(AppContext)
  const notifySuccess = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  const warn = (message) => toast.warn(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const content = formData.get("content")
    addToInbox(content)
    .then(res => {
      if (res.success === 'true'){
        notifySuccess('Item added to inbox!')
        e.target.reset()
      }
      else{
        warn('Something went wrong...')
        console.error(res)
      }JSON.stringify()
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <div className="flex">

        <MenuBar></MenuBar>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-[100%]">
          <h1 className="text-[48pt]">Add Something to "In"</h1>
          <input
            id="inboxInput"
            type="text"
            name="content"
            placeholder="What's on your mind?"
            className="p-3 w-1/2 border rounded-md"
          ></input>

          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="text-[24pt] text-blue-text p-3 mt-3 border rounded-2xl hover:shadow-xl/30 transform transition duration-250 ease-in-out hover:scale-110 hover:cursor-pointer"
            type="submit">Add</motion.button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}