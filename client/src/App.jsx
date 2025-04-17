// // Pages (in components folder)
import HomePage from "./pages/HomePage";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import Dashboard from "./pages/Dashboard";
// import MaintenanceTracker from "./pages/MaintenanceTracker";
import MyRequests from "./pages/MyRequests";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import ActiveRequest from "./pages/ActiveRequest";
import MyBuildings from "./pages/MyBuildings";
import MaintenanceTrackerDetails from "./pages/MaintenanceTrackerDetails";
import UserProfile from "./pages/UserProfile";

import EasterEgg from "./components/EasterEgg";

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
// import MyBuildings from "./pages/MyBuildings";

function App() {
  // const [userRole, setUserRole] = useState(Roles.GUEST);
  // useEffect(() => {
  //   const storedRole = sessionStorage.getItem("userRole");
  //   if (storedRole !== null) {
  //     setUserRole(parseInt(storedRole));
  //   }
  // }, []);

  const [userRole, setUserRole] = useState(null); // Start as null

  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole");
    if (storedRole !== null) {
      setUserRole(parseInt(storedRole)); // Convert string to number
    } else {
      setUserRole(Roles.GUEST); // Fallback if nothing in sessionStorage
    }
  }, []);

  // Show loading screen while role is being determined
  if (userRole === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Protected pages */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <Dashboard />
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
          path="/my-requests"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <MyRequests />
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
          path="/my-buildings"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <MyBuildings />
            </ProtectedRoute>
          }
        />

        {/*    {Public pages}    */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/active-request" element={<ActiveRequest />} />
        <Route path="/maintenance-request" element={<MaintenanceRequest />} />

        {/*    Home page (moved to the bottom to avoid hijacking other routes)}     */}
        <Route path="/" element={<HomePage />} />

        {/* Optional: 404 fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      <NavBar />
      <EasterEgg />
    </Router>
  );
}
export default App;
