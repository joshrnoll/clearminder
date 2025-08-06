import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Welcome from './Welcome'


createRoot(document.getElementById('root')).render(
  <Router>
    <Welcome></Welcome>
  </Router>
)
