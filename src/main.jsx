import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Welcome from './Welcome'
import Home from './Home.jsx'
import NewProjectForm from './NewProjectForm'
import NewNextActionForm from './NewNextActionForm'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Welcome></Welcome>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/new-project" element={<NewProjectForm></NewProjectForm>}></Route>
      <Route path="/new-next-action" element={<NewNextActionForm></NewNextActionForm>}></Route>
    </Routes>
  </Router>
)
