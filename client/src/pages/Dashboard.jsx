import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MaintenanceRequest from "./MaintenanceRequest";
import MaintenanceTracker from "./MaintenanceTracker";
import MyRequests from "./MyRequests";
import Admin from "./Admin";
import Contact from "./Contact";

function Dashboard() {
  return (
    <>
      <div
        style={{
          padding: "40px",
          background: "linear-gradient(to right, #e66465, #9198e5)",
          color: "white",
          height: "100vh",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          Kiersten's Dashboard
        </h1>
        <p style={{ fontSize: "1.2rem" }}>
          This is the group dashboard. Period. 💅🏽
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
          }}
        >
          <p> Add widgets, charts, or whatever tf </p>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maintenance-tracker" element={<MaintenanceTracker />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

console.log("Dashboard page loaded");

export default Dashboard;
