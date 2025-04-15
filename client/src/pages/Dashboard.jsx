import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtext">You are logged in as: <strong>Admin</strong></p>

      <div className="dashboard-actions">
        <button className="dashboard-btn" onClick={() => navigate("/all-requests")}>
           View All Requests
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/admin/users")}>
           Manage Users
        </button>
        <button className="dashboard-btn" onClick={() => alert("System Settings coming soon!")}>
          System Settings
        </button>
        <button className="dashboard-btn" onClick={() => alert("Reports feature coming soon!")}>
          Generate Reports
        </button>
      </div>
    </div>
  );
}

console.log("Dashboard page loaded");

export default Dashboard;
