import { useState, useEffect } from "react";

function Admin() {
  const [states, setStates] = useState([]);
  const [bases, setBases] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/locations`);
    return;
    <div>
      <h1>Admin Page</h1>
    </div>;
  });
}

export default Admin;
