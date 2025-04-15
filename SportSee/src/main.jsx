import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/error404.jsx'
import ErrorUser from './pages/errorUser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/12" replace />} />
        <Route path="/user/:id" element={<App />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error-user" element={<ErrorUser />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)