import { motion } from 'motion/react'

export default function Form({ title, form }) {

  if (!title){
    console
    .error("Component 'Form' must take prop 'title'")
  }
  if (!form){
    console.error("Component 'Form' must take prop 'form'")
  }

  return (
    <motion.div
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      className="flex flex-col items-center gap-2 w-[100vw]">

      <h1 className="m-3 text-[48pt]">New { title }</h1>

      { form }

    </motion.div>
  )
}