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
      </AppContextProvider>

      <Routes>
        <Route path="/login" element={
          <AppContextProvider>
            <LoginPage />
          </AppContextProvider>
        }></Route>

        <Route path="/home/*" element={
          <AppContextProvider>
            <Home></Home>
          </AppContextProvider>
        }></Route>

        <Route path="/add-inbox" element={
          <AppContextProvider>
            <AddToInbox></AddToInbox>
          </AppContextProvider>
        }></Route>

        <Route path="/new-project" element={
          <AppContextProvider>
            <NewProjectForm></NewProjectForm>
          </AppContextProvider>
        }></Route>

        <Route path="/projects" element={
          <AppContextProvider>
            <ProjectsList></ProjectsList>
          </AppContextProvider>
        }></Route>

        <Route path="/new-next-action" element={
          <AppContextProvider>
            <NewNextActionForm></NewNextActionForm>
          </AppContextProvider>
        }></Route>

        <Route path="/next-actions" element={
          <AppContextProvider>
            <NextActionsList></NextActionsList>
          </AppContextProvider>
        }></Route>

        <Route path="/next-actions/:context" element={
          <AppContextProvider>
            <NextActionsList></NextActionsList>
          </AppContextProvider>
        }></Route>

        <Route path="/someday-maybe" element={
          <AppContextProvider>
            <SomedayMaybeList></SomedayMaybeList>
          </AppContextProvider>
        }></Route>

        <Route path="/new-someday-maybe" element={
          <AppContextProvider>
            <NewSomedayMaybeForm></NewSomedayMaybeForm>
          </AppContextProvider>
        }></Route>

        <Route path="/new-context" element={
          <AppContextProvider>
            <NewContextForm></NewContextForm>
          </AppContextProvider>
        }></Route>

        <Route path="/calendar" element={
          <AppContextProvider>
            <Calendar></Calendar>
          </AppContextProvider>
        }></Route>
      </Routes>
    </>
  )
}