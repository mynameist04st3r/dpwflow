import { useState, useEffect } from 'react';
import Admin from '../styles/Admin.css';

function Admin() {
  const [states, setStates] = useState([]);
  const [bases, setBases] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/locations`)
  })
}

export default function Admin() {
  return (
    <div>
      Admin
    </div>
  )
}
