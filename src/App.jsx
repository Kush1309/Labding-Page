import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import SalesPage from './pages/SalesPage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Routes>
  )
}

export default App
