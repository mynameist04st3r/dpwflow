import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/PrioritySorter.css';

function PrioritySorter() {
  const [prioritizedRequests, setPrioritizedRequests] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const fetchPrioritizedRequests = async () => {
      const response = await fetch('http://localhost:8000/adminrequests/prioritizedRequests');
      const data = await response.json();
      setPrioritizedRequests(data.slice(0, 20));
    };
    fetchPrioritizedRequests();
  }, []);

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...prioritizedRequests];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, movedItem);
    setPrioritizedRequests(updated);
    setDraggedIndex(null);
  };

  const saveNewOrder = async () => {
    try {
      const response = await fetch('http://localhost:8000/adminrequests/updatePriorityOrder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prioritizedRequests.map((req, index) => ({
          ...req,
          priority: index + 1,
        }))),
      });
      if (response.ok) {
        alert('Priority order saved successfully!');
      } else {
        alert('Failed to save new priority order.');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Error saving priority order.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="priority-sorter-container">
        {prioritizedRequests.map((request, index) => (
          <div
            key={request.id}
            className="priority-card"
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            style={{ opacity: draggedIndex === index ? 0.5 : 1 }}
          >
            <h4>Priority {index + 1}</h4>
            <p><strong>Status:</strong> Pending: {request.pending ? 'Yes' : 'No'}, Accepted: {request.accepted ? 'Yes' : 'No'}</p>
            <p><strong>Description:</strong> {request.work_order_desc}</p>
            <p><strong>Created:</strong> {request.date_created}</p>
            <p><strong>Completed:</strong> {request.date_completed || 'N/A'}</p>
            <p><strong>Location ID:</strong> {request.location_id}</p>
            <p><strong>Building ID:</strong> {request.building_id}</p>
          </div>
        ))}
        <div className="priority-save-button-container">
          <button onClick={saveNewOrder}>Save Priority Order</button>
        </div>
      </div>
    </DndProvider>
  );
}

export default PrioritySorter;
