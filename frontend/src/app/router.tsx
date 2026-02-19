import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import EmergencyDetailsPage from "@/pages/emergency-details/EmergencyDetailsPage";
import CreateEmergencyPage from "@/pages/create-emergency/CreateEmergencyPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emergency/:id" element={<EmergencyDetailsPage />} />
        <Route path="/admin/new" element={<CreateEmergencyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
