import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { useAllRequests } from "../context/AllRequestsContext";

export default function MaintenanceTracker() {
  const { requests, loading } = useAllRequests();
  const [sortBy, setSortBy] = useState("id");
  const [filterMode, setFilterMode] = useState("all");
  const [assignedBuildings, setAssignedBuildings] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userRole = user?.role || 2;

  useEffect(() => {
    if (userRole >= 3) {
      fetch(`http://localhost:8000/admin-buildings?admin_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const ids = data.map((d) => d.building_id);
          setAssignedBuildings(ids);
        })
        .catch((err) =>
          console.error("Failed to fetch assigned buildings", err)
        );
    }
  }, [user.id, userRole]);

  const filteredRequests = requests.filter((req) => {
    if (filterMode === "mine" && userRole >= 3) {
      return assignedBuildings.includes(req.building_id);
    }
    return true;
  });

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
      if (sortBy === "date")
        return new Date(b.created_at) - new Date(a.created_at);
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
    completed: formattedRequests.filter((r) => r.status === "completed")
      .length,
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

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Change status to "${newStatus}"?`)) return;

    const statusPayload = {
      pending: newStatus === "pending",
      accepted: newStatus === "in progress",
      complete: newStatus === "completed",
    };

    try {
      await fetch(`http://localhost:8000/requests/updateRequest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statusPayload),
      });
      window.location.reload();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    if (!window.confirm(`Change priority to "${newPriority}"?`)) return;

    const priorityMap = { high: 1, normal: 2, low: 3 };

    try {
      await fetch(`http://localhost:8000/requests/updateRequest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: priorityMap[newPriority] }),
      });
      window.location.reload();
    } catch (err) {
      console.error("Failed to update priority:", err);
    }
  };

  return (
    <div className="my-requests-container">
      <h1>Maintenance Tracker</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <>
          {/* Stats Cards */}
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

          {/* Filter, Sort, Manage */}
          <div className="sort-options">
  {userRole >= 3 && (
    <div className="sort-group">
      <label htmlFor="buildingFilter">Filter:</label>
      <select
        id="buildingFilter"
        value={filterMode}
        onChange={(e) => setFilterMode(e.target.value)}
      >
        <option value="all">All Buildings</option>
        <option value="mine">My Buildings</option>
      </select>
    </div>
  )}

    <div className="sort-group">
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

    <div className="sort-group">
      <button onClick={() => navigate("/my-buildings")}>
        Manage Buildings
      </button>
    </div>
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
                      <td>
                        {new Date(request.created_at).toLocaleDateString()}
                      </td>
                      <td>{request.location}</td>
                      <td>{request.issue_type}</td>
                      <td>{request.description}</td>
                      <td>
                        {userRole === 4 ? (
                          <select
                            value={request.status}
                            onChange={(e) =>
                              handleStatusChange(request.id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="in progress">Accepted</option>
                            <option value="completed">Completed</option>
                          </select>
                        ) : (
                          <span
                            className={getStatusBadgeClass(request.status)}
                          >
                            {request.status}
                          </span>
                        )}
                      </td>
                      <td>
                        <select
                          value={request.priority}
                          onChange={(e) =>
                            handlePriorityChange(request.id, e.target.value)
                          }
                          disabled={userRole < 3}
                        >
                          <option value="high">High</option>
                          <option value="normal">Normal</option>
                          <option value="low">Low</option>
                        </select>
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
