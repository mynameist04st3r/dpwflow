// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./components/NavBar";

// // Pages (in components folder)
// import Launch from "./components/Launch";
// import MaintenanceRequest from "./components/MaintenanceRequest";
// import Dashboard from "./components/Dashboard";
// import MaintenanceTracker from "./components/MaintenanceTracker";
// import MyRequests from "./components/MyRequests";
// import Admin from "./components/Admin";
// import Contact from "./components/Contact";

//     conflict issue
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './styles/App.css'
// import './styles/index.css'


// Below is good code///////////////
import { useState } from "react";
import "./styles/App.css";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
}

export default App;
