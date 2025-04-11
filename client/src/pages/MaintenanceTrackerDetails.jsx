import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div style={{ padding: "2rem" }}>
      <h1>Maintenance Request #{request.id}</h1>
      <ul>
        <li><strong>Description:</strong> {request.work_order_desc}</li>
        <li><strong>Priority:</strong> {request.priority}</li>
        <li><strong>Status:</strong> {request.complete ? "Completed" : request.accepted ? "In Progress" : "Pending"}</li>
        <li><strong>Building:</strong> {request.building_number}</li>
        <li><strong>Room:</strong> {request.room_number}</li>
        <li><strong>Location Description:</strong> {request.location_desc}</li>
        <li><strong>Military Base:</strong> {request.work_order_military_base}</li>
        <li><strong>State:</strong> {request.work_order_state}</li>
        <li><strong>Date Created:</strong> {new Date(request.date_created).toLocaleString()}</li>
        {request.date_completed && (
          <li><strong>Date Completed:</strong> {new Date(request.date_completed).toLocaleString()}</li>
        )}
        <li><strong>Submitted By:</strong> {request.work_order_rank} {request.work_order_first_name} {request.work_order_last_name}</li>
        <li><strong>Phone:</strong> {request.work_order_phone_number}</li>
        <li><strong>Email:</strong> {request.work_order_email}</li>
      </ul>
    </div>
  );
}