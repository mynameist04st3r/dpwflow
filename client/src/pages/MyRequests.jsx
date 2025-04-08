import React, { useState } from "react";
import "../styles/MyRequests.css";

export default function MyRequests() {
  // Sample data
  const sampleRequests = [
    {
      id: 1,
      created_at: "2024-04-08",
      location: "Barracks 2317, Room 143",
      issue_type: "Plumbing",
      description: "Leaking faucet in bathroom sink",
      status: "pending",
      priority: "normal",
    },
    {
      id: 2,
      created_at: "2024-04-07",
      location: "Barracks 2317, Room 143",
      issue_type: "HVAC",
      description: "AC not cooling properly",
      status: "in progress",
      priority: "high",
    },
    {
      id: 3,
      created_at: "2024-04-05",
      location: "Common Area, Building 2317",
      issue_type: "Electrical",
      description: "Light fixture flickering in hallway",
      status: "completed",
      priority: "normal",
    },
    {
      id: 4,
      created_at: "2024-04-03",
      location: "Barracks 2317, Room 143",
      issue_type: "Structural",
      description: "Window screen damaged",
      status: "completed",
      priority: "low",
    },
  ];

  const [requests] = useState(sampleRequests);

  // Calculate statistics
  const stats = {
    total: requests.length,
    active: requests.filter(
      (r) => r.status === "pending" || r.status === "in progress"
    ).length,
    completed: requests.filter((r) => r.status === "completed").length,
    highPriority: requests.filter(
      (r) => r.priority === "high" && r.status !== "completed"
    ).length,
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-badge pending";
      case "in progress":
        return "status-badge in-progress";
      case "completed":
        return "status-badge completed";
      default:
        return "status-badge pending";
    }
  };

  return (
    <div className="my-requests-container">
      <h1>My Maintenance Requests</h1>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Requests</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>Active Requests</h3>
            <p className="stat-number">{stats.active}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-number">{stats.completed}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>High Priority</h3>
            <p className="stat-number">{stats.highPriority}</p>
          </div>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="no-requests">
          <p>You haven't submitted any maintenance requests yet.</p>
        </div>
      ) : (
        <div className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Date</th>
                <th>Location</th>
                <th>Issue Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>{new Date(request.created_at).toLocaleDateString()}</td>
                  <td>{request.location}</td>
                  <td>{request.issue_type}</td>
                  <td>{request.description}</td>
                  <td>
                    <span className={getStatusBadgeClass(request.status)}>
                      {request.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`priority-badge ${
                        request.priority?.toLowerCase() || "normal"
                      }`}
                    >
                      {request.priority || "Normal"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
