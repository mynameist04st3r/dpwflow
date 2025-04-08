import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Launch from "./Launch";
import MaintenanceRequest from "./MaintenanceRequest";
import MaintenanceTracker from "./MaintenanceTracker";
import MyRequests from "./MyRequests";
import Admin from "./Admin";
import Contact from "./Contact";

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/launch" element={<Launch />} />
      <Route path="/maintenance-request" element={<MaintenanceRequest />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/maintenance-tracker" element={<MaintenanceTracker />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default Dashboard;
