import './index.css'
import { motion } from 'motion/react'
import { Link, Routes, Route } from 'react-router-dom'
import { AppContextProvider } from './contexts/AppContextProvider.jsx'
import Home from './Home'
import WelcomePage from './WelcomePage'
import NewProjectForm from './NewProjectForm'
import NewNextActionForm from './NewNextActionForm'
import NextActionsList from './NextActionsList'
import ProjectsList from './ProjectsList'
import NewContextForm from './NewContextForm'
import Calendar from './Calendar'
import AddToInbox from './AddToInbox'
import NewSomedayMaybeForm from './NewSomedayMaybeForm'
import SomedayMaybeList from './SomedayMaybeList'
import LoginPage from './LoginPage'

export default function App() {

  return (
    <>
      <AppContextProvider>

        <WelcomePage></WelcomePage>

        <Routes>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/home/*" element={ <Home /> } />
          <Route path="/add-inbox" element={ <AddToInbox /> } />
          <Route path="/new-project" element={ <NewProjectForm /> } />
          <Route path="/projects" element={ <ProjectsList /> } />
          <Route path="/new-next-action" element={ <NewNextActionForm /> } />
          <Route path="/next-actions" element={ <NextActionsList /> } />
          <Route path="/next-actions/:context" element={ <NextActionsList /> } />
          <Route path="/someday-maybe" element={ <SomedayMaybeList /> } />
          <Route path="/new-someday-maybe" element={ <NewSomedayMaybeForm /> } />
          <Route path="/new-context" element={ <NewContextForm /> } />
          <Route path="/calendar" element={ <Calendar /> } />
        </Routes>
      </AppContextProvider>
    </>
  )
}