// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./components/NavBar";

// // Pages (in components folder)
import HomePage from "./pages/HomePage";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import Dashboard from "./pages/Dashboard";
import MaintenanceTracker from "./pages/MaintenanceTracker";
import MyRequests from "./pages/MyRequests";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import ActiveRequest from "./pages/ActiveRequest";

//     conflict issue
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './styles/App.css'
// import './styles/index.css'

// Below is good code///////////////
import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      {/* <div className="app">
        <HomePage />
      </div> */}

      {/* Router for navigation */}
      <Router>
        {/* Test Message */}
        <p
          style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px" }}
        >
          This is a test message in App.jsx
        </p>

        {/* Main routes handled inside Dashboard */}
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maintenance-request" element={<MaintenanceRequest />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/maintenance-tracker" element={<MaintenanceTracker />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/active-request" element={<ActiveRequest/>} />
        </Routes>

        <NavBar />
      </Router>
    </>

  );
}

export default App;
