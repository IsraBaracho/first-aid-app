import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmergencyPage from './pages/emergencyPage/emergencyPage'
import CreateEmergency from './pages/createEmergency/createEmergency'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/emergency/:id" element={<EmergencyPage />} />
        <Route path="/admin/new" element={<CreateEmergency />} />
      </Routes>
    </BrowserRouter>
  )
}