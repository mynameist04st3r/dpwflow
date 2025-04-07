import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/launch"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Launch
      </NavLink>

      <NavLink
        to="/maintenance-request"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Maintenance Request
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/maintenance-tracker"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Maintenance Tracker
      </NavLink>
      <NavLink
        to="/my-requests"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        My Requests
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Admin
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default NavBar;

// Launch.jsx
// MaintenanceRequest.jsx
// Dashboard.jsx
// MaintenanceTracker.jsx
// MyRequests.jsx
// Admin.jsx
// Contact.jsx
