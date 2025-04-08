import { useState, useEffect } from 'react';
import '../styles/Admin.css';

export default function Admin() {
  const [states, setStates] = useState([]);
  const [bases, setBases] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/locations`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched locations:', data);
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
