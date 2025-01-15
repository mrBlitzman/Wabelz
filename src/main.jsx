import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../Views/Pages/App.jsx'
import '../Views/Assets/Styles/App.scss'
import '../Views/Assets/Styles/margin.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='app-root'>
      <App />
    </div>
  </StrictMode>,
)
