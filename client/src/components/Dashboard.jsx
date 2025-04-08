import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleGetUsers = () => {
    axios.get('/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  };

  return (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(to right,rgb(90, 161, 23),rgb(0, 0, 0))',
      color: 'white',
      height: '100vh'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Barracks Dashboard</h1>
      <p style={{ fontSize: '1.2rem' }}>Manage housing, maintenance, and soldier info</p>

      <div style={{ marginTop: '30px' }}>
        <button style={btnStyle} onClick={() => navigate('/maintenance-requests')}>View Maintenance Requests</button>
        <button style={btnStyle} onClick={() => navigate('/manage-rooms')}>Manage Rooms</button>
        <button style={btnStyle} onClick={() => navigate('/assignments')}>Assign Housing</button>
        <button style={btnStyle} onClick={handleGetUsers}>Get User Data</button>
      </div>

      {users.length > 0 && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          color: '#fff'
        }}>
          <h3>Registered Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.rank} {user.lastName}, {user.firstName} – Room {user.roomNumber}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  backgroundColor: '#fff',
  color: '#333',
  padding: '12px 20px',
  margin: '10px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Dashboard;
