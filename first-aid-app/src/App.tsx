import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmergencyPage from './pages/emergencyPage/emergencyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>
    </BrowserRouter>
  )
}