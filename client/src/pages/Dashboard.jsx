import React from 'react';

function Dashboard() {
  return (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(to right, #e66465, #9198e5)',
      color: 'white',
      height: '100vh'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Kiersten's Dashboard</h1>
      <p style={{ fontSize: '1.2rem' }}>This is the group dashboard. Period. 💅🏽</p>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px'
      }}>
        <p> Add widgets, charts, or whatever tf </p>
      </div>
    </div>
  );
}

export default Dashboard;
