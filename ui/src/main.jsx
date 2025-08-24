import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'


createRoot(document.getElementById('root')).render(
  <Router>
    <App></App>
  </Router>
)
