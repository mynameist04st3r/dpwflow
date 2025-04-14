// // Pages (in components folder)
import HomePage from "./pages/HomePage";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import Dashboard from "./pages/Dashboard";
import MaintenanceTracker from "./pages/MaintenanceTracker";
import MyRequests from "./pages/MyRequests";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import ActiveRequest from "./pages/ActiveRequest";
import MyBuildings from "./pages/MyBuildings";
import MaintenanceTrackerDetails from "./pages/MaintenanceTrackerDetails";
import UserProfile from "./pages/UserProfile";

//     conflict issue
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './styles/App.css'
// import './styles/index.css'

// Below is good code///////////////
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Roles } from "./Roles";
import { useState, useEffect } from "react";

function App() {
  const [userRole, setUserRole] = useState(null); // Wait until role is loaded

  useEffect(() => {
    const stored = sessionStorage.getItem("userRole");
    const parsed = stored ? parseInt(stored) : null;
    setUserRole(parsed ?? Roles.GUEST);
  }, []);

  if (userRole === null) return null; // Prevent early route rendering

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
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance-tracker/:id"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <MaintenanceTrackerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-buildings"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <MyBuildings />
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

      <NavBar setUserRole={setUserRole} />
    </Router>
  );
}

export default App;
