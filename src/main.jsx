import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initSettings } from './utils/settings'
import App from './App.jsx'

initSettings()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
