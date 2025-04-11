import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MyRequests.css";
import { useAllRequests } from "../context/AllRequestsContext";

export default function MaintenanceTracker() {
  const { requests, loading } = useAllRequests();
  const [sortBy, setSortBy] = useState("id");

  const formattedRequests = [...requests]
    .map((req) => ({
      id: req.id,
      created_at: req.date_created,
      location: `${req.building_number}, Room ${req.room_number}`,
      issue_type: req.work_order_desc?.split(" ")[0] || "General",
      description: req.work_order_desc,
      status: req.complete
        ? "completed"
        : req.accepted
        ? "in progress"
        : "pending",
      priority:
        req.priority === 1
          ? "high"
          : req.priority === 2
          ? "normal"
          : "low",
    }))
    .sort((a, b) => {
      if (sortBy === "id") return a.id - b.id;
      if (sortBy === "date") return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "priority") {
        const order = { high: 1, normal: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === "status") {
        const order = { pending: 1, "in progress": 2, completed: 3 };
        return order[a.status] - order[b.status];
      }
      return 0;
    });

  const stats = {
    total: formattedRequests.length,
    active: formattedRequests.filter(
      (r) => r.status === "pending" || r.status === "in progress"
    ).length,
    completed: formattedRequests.filter((r) => r.status === "completed").length,
    highPriority: formattedRequests.filter(
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
      <h1>Maintenance Tracker</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <>
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

          {/* Sort Dropdown */}
          <div className="sort-options">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="id">Request ID</option>
              <option value="date">Date</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Requests Table */}
          {formattedRequests.length === 0 ? (
            <div className="no-requests">
              <p>No maintenance requests found.</p>
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
                  {formattedRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <Link to={`/maintenance-tracker/${request.id}`}>
                          #{request.id}
                        </Link>
                      </td>
                      <td>{new Date(request.created_at).toLocaleDateString()}</td>
                      <td>{request.location}</td>
                      <td>{request.issue_type}</td>
                      <td>{request.description}</td>
                      <td>
                        <span className={getStatusBadgeClass(request.status)}>
                          {request.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge ${request.priority}`}>
                          {request.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}