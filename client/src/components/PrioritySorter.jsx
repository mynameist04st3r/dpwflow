import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../styles/PrioritySorter.css';

function PrioritySorter() {
  const [prioritizedRequests, setPrioritizedRequests] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [ghostIndex, setGhostIndex] = useState(null);
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
    const updatedRequests = [...prioritizedRequests];
    const [movedItem] = updatedRequests.splice(draggedIndex, 1);
    updatedRequests.splice(index, 0, movedItem);
    setPrioritizedRequests(updatedRequests);
    setDraggedIndex(null);
    setGhostIndex(null);
  };
  const handleDragOver = (index) => {
    setGhostIndex(index);
  }
  const saveNewOrder = async () => {
    try {
      const response = await fetch('http://localhost:8000/adminrequests/updatePriorityOrder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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
      console.error('Error saving order: ', error);
      alert('Error saving priority order.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="priority-sorter-form-container">
        <Table>
          <TableHead>
            <TableRow className="admin-forms-prioritized-header-row">
              <TableCell style={{ borderBottom: '2px solid #961e14' }}>Priority</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Pending</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Accepted</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Work Order Description</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Date Created</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Date Completed</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Location ID</TableCell>
              <TableCell align="left" style={{ borderBottom: '2px solid #961e14' }}>Building ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="admin-forms-prioritized-body">
            {prioritizedRequests.map((request, index) => (
              <TableRow
                key={request.id}
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  handleDragOver(index);
                }}
                onDrop={() => handleDrop(index)}
                style={{
                  cursor: 'move',
                  opacity: draggedIndex === index ? 0.5 : 1,
                }}
              >
                <TableCell component="th" scope="row" style={{ borderBottom: '1px solid #426f4d' }}>{index + 1}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.pending ? 'Yes' : 'No'}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.accepted ? 'Yes' : 'No'}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.work_order_desc}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.date_created}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.date_completed}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.location_id}</TableCell>
                <TableCell align="left" style={{ borderBottom: '1px solid #426f4d' }}>{request.building_id}</TableCell>
              </TableRow>
            ))}
            {ghostIndex !== null && (
              <TableRow className="ghost-row">
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="priority-save-button-container">
          <button onClick={saveNewOrder}>Save Priority Order</button>
        </div>
      </div>
    </DndProvider>
  );
}
export default PrioritySorter;
