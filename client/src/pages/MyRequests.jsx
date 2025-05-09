import React, { useState } from "react";
import "../styles/MyRequests.css";
import { useAllRequests } from "../context/AllRequestsContext";

export default function MyRequests() {
  const { requests, loading } = useAllRequests();
  const [sortBy, setSortBy] = useState("id");

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  const filteredRequests = requests.filter((r) => r.work_order_user_id === userId);

  const formattedRequests = [...filteredRequests]
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
        const priorityOrder = { high: 1, normal: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === "status") {
        const statusOrder = { pending: 1, "in progress": 2, completed: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
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
      <header className="home-header">
        <h1>Maintenance Request</h1>
      </header>

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
                  {formattedRequests.map((request) => (
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
        </>
      )}
    </div>
  );
}