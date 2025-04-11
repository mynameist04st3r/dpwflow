import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/MaintenanceTrackerDetails.css";

export default function MaintenanceTrackerDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/GetRequests/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch request");
        return res.json();
      })
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading request details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!request) return <p>Request not found.</p>;

  return (
    <div className="my-requests-container">
    <h1>Maintenance Request #{request.id}</h1>
  
    <div className="request-details-card">
      <ul className="request-details-list">
        <li><span>Description:</span> {request.work_order_desc}</li>
        <li><span>Priority:</span> {request.priority}</li>
        <li><span>Status:</span> {request.complete ? "Completed" : request.accepted ? "In Progress" : "Pending"}</li>
        <li><span>Building:</span> {request.building_number}</li>
        <li><span>Room:</span> {request.room_number}</li>
        <li><span>Location Description:</span> {request.location_desc}</li>
        <li><span>Military Base:</span> {request.work_order_military_base}</li>
        <li><span>State:</span> {request.work_order_state}</li>
        <li><span>Date Created:</span> {new Date(request.date_created).toLocaleString()}</li>
        {request.date_completed && (
          <li><span>Date Completed:</span> {new Date(request.date_completed).toLocaleString()}</li>
        )}
        <li><span>Submitted By:</span> {request.work_order_rank} {request.work_order_first_name} {request.work_order_last_name}</li>
        <li><span>Phone:</span> {request.work_order_phone_number}</li>
        <li><span>Email:</span> {request.work_order_email}</li>
      </ul>
    </div>
  </div>
  );
}