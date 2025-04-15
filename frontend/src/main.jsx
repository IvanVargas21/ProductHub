import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* in our App, we can use anything from react-router-dom
    like useParams, useNavigate, etc
    this is a wrapper for the entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
