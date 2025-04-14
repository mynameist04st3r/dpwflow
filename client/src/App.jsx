// // Pages (in components folder)
import HomePage from "./pages/HomePage";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import Dashboard from "./pages/Dashboard";
import MaintenanceTracker from "./pages/MaintenanceTracker";
import MyRequests from "./pages/MyRequests";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import ActiveRequest from "./pages/ActiveRequest";
import MaintenanceTrackerDetails from "./pages/MaintenanceTrackerDetails"

//     conflict issue
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './styles/App.css'
// import './styles/index.css'sessionStorage.setItem(

// Below is good code///////////////
// import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Roles } from "./Roles";
import { useState, useEffect } from "react";

function App() {
  const [userRole, setUserRole] = useState(Roles.GUEST);
  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole !== null) {
      setUserRole(parseInt(storedRole));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Protected pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-requests"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <MyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance-tracker"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.MANAGER}>
              <MaintenanceTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.ADMIN}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Public pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/active-request" element={<ActiveRequest />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />

        {/* Home page (moved to the bottom to avoid hijacking other routes) */}
        <Route path="/" element={<HomePage />} />

        {/* Optional: 404 fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      <NavBar />
    </Router>
  );
}
export default App;
