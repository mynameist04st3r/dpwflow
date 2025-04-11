import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Launch from "./Launch";
import MaintenanceRequest from "./MaintenanceRequest";
import MaintenanceTracker from "./MaintenanceTracker";
import MyRequests from "./MyRequests";
import Admin from "./Admin";
import Contact from "./Contact";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />
        <Route path="/dashboard" element={<HomePage />} /> {/* fixed! */}
        <Route path="/maintenance-tracker" element={<MaintenanceTracker />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
