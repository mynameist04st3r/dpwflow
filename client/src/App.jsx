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

<<<<<<< HEAD
function App()
// {
=======
function App() {
//////   const [userRole, setUserRole] = useState(null); // Wait until role is loaded

//////   useEffect(() => {
//////     const stored = sessionStorage.getItem("userRole");
//////     const parsed = stored ? parseInt(stored) : null;
//////     setUserRole(parsed ?? Roles.GUEST);
  
>>>>>>> 3099ab2de57912ceea849ce416b7811fdfef7088
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

  if (userRole === null) return null; // Prevent early route rendering

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
          path="/my-requests"
          element={
            <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
              <MyRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance-tracker/*"
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
<<<<<<< HEAD

=======
{/* //// <<<<<<< fix-maintenance-tracker
////         <Route
////           path="/maintenance-tracker/:id"
////           element={
////             <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
////               <MaintenanceTrackerDetails />
//// =======
////         {<Route
////           path="/maintenance-tracker"
////           element={
////             <ProtectedRoute userRole={userRole} minimumRole={Roles.USER}>
////               <MaintenanceTracker />
//// >>>>>>> Rob
////            </ProtectedRoute>
////          }
////        /> */}
>>>>>>> 3099ab2de57912ceea849ce416b7811fdfef7088
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

      <NavBar setUserRole={setUserRole} />
    </Router>
  );
}

export default App;
