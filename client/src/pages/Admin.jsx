import { useState, useEffect } from 'react';
import '../styles/Admin.css';
import NavBar from '../components/NavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Admin() {
  const [prioritizedRequests, setPrioritizedRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const fetchPrioritizedRequests = async () => {
      const response = await fetch('http://localhost:8000/adminrequests/prioritizedRequests');
      const data = await response.json();
      setPrioritizedRequests(data.slice(0, 20));
    };
    fetchPrioritizedRequests();
  }, []);

  return (
    <div className="admin-back-div-container">
      <NavBar />
      <div className="admin-container">
        <div className="admin-button-bar">
          <div className="admin-button-container">
            <button className="admin-buttons" onClick={() => setShowForm(true)}>Prioritize Work Orders</button>
            <button className="admin-buttons">Set User Rolls</button>
            <button className="admin-buttons" onClick={() => setShowForm(true)}>Add Installation Data</button>
          </div>
        </div>
        <div className="admin-forms-container">
          <div className="admin-forms">
            {showForm && (
              <div>
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
                    {prioritizedRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell component="th" scope="row">{request.priority}</TableCell>
                        <TableCell align="left">{request.pending ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">{request.accepted ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">{request.work_order_desc}</TableCell>
                        <TableCell align="left">{request.date_created}</TableCell>
                        <TableCell align="left">{request.date_completed}</TableCell>
                        <TableCell align="left">{request.location_id}</TableCell>
                        <TableCell align="left">{request.building_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

