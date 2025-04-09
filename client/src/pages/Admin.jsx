import { useState, useEffect } from 'react';
import { Button } from 'react';
import '../styles/Admin.css';
import NavBar from '../components/NavBar';

export default function Admin() {
  const [states, setStates] = useState([]);
  const [bases, setBases] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newState, setNewState] = useState('');
  const [isNewState, setIsNewState] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/locations`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched locations:', data);
      })
      .catch(err => setError(err.message));
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      try {
        const response = await fetch(`http://localhost:8000/locations/search`, {
          method: 'GET',
          params: {q: query}
        });
        const data = await response.json();
        setSearchResults(data);
        if (data.length === 0) {
          setIsNewState(true);
        } else {
          setIsNewState(false);
          setNewState('');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
      setIsNewState(false);
      setNewState('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNewState) {
      try {
        const response = await fetch(`http://localhost:8000:locations`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({state: newState}),
        });
        const data = await response.json();
        console.log('New state added: ', data);
        setShowForm(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('State already exists');
    }
  };

  const handleNewStateChange = (e) => {
    setNewState(e.target.value);
  };

  return (
    <div className="admin-back-div-container">
      <NavBar />
      <div className="admin-container">
        <div className="admin-button-bar">
          <div className="admin-button-container">
            <div className="admin-set-priorities">
              <button className="admin-buttons">Prioritize Work Orders</button>
            </div>
            <div className="admin-classify-users">
              <button className="admin-buttons">Set User Rolls</button>
            </div>
            <div className="admin-input-local-data">
            <button className="admin-buttons" onClick={() => setShowForm(true)}>Add Installation Data</button>
            </div>
          </div>
        </div>
        <div className="admin-forms-container">
          <div className="admin-forms">
            {(showForm ? (
              <div>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search states"
                    style={{width: '50%', padding: '10px', marginBottom: '20px'}}
                  />
                  {searchResults.length > 0 && (
                    <ul style={{listStyle: 'none', padding: '0', width: '50%'}}>
                      {searchResults.map((result, index) => (
                        <li key={index}>{result.state}</li>
                      ))}
                    </ul>
                  )}
                  {isNewState && (
                    <div>
                      <label>New State:</label>
                      <input
                        type="text"
                        value={newState}
                        onChange={handleNewStateChange}
                        style={{width: '50%', padding: '10px', marginBottom: '20px'}}
                      />
                    </div>
                  )}
                  <button type="submit" className="admin-buttons">Submit</button>
                </form>
              </div>
            ) : (
              <div>Select an option to the left</div>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
