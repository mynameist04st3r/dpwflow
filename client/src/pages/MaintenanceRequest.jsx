import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '../styles/MaintenanceRequest.css';

const MaintenanceRequestPage = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    state: '',
    military_base: '',
    building_number: '',
    room_number: '',
    location_desc: '',
    work_order_desc: '',
    priority: 1,
    anon_phone: '',
    anon_email: '',
    user_id: 999,
    location_id: 999
  });

  const [allLocations, setAllLocations] = useState([]);
  const [baseOptions, setBaseOptions] = useState([]);


//lines 29 to 42 populates table with QR code data from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stateParam = params.get("state");
    const baseParam = params.get("base");
    const buildingParam = params.get("building");
  
    setFormData(prev => ({
      ...prev,
      state: stateParam || '',
      military_base: baseParam || '',
      building_number: buildingParam || ''
    }));
  }, [location.search]);

  // Fetch all locations once on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('http://localhost:8000/locations/allLocations');
        const data = await res.json();
        console.log('Fetched locations:', data);
        setAllLocations(data);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      }
    };
  
    fetchLocations();
  }, []);

  useEffect(() => {
    const matchingBases = allLocations.filter(loc => loc.state === formData.state);
    setBaseOptions(matchingBases);
  }, [formData.state, allLocations]);

  useEffect(() => {
    const match = baseOptions.find(loc => loc.military_base === formData.military_base);
    if (match) {
      setFormData(prev => ({
        ...prev,
        location_id: match.id
      }));
    }
  }, [formData.military_base, baseOptions]);

  const capitalizeLetters = (str) => {
    return str.replace(/[a-z]/g, char => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === 'priority') {
      newValue = parseInt(value, 10);
    }

    if (name === 'building_number' || name === 'room_number') {
      newValue = capitalizeLetters(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  useEffect(() => {
    const rawUser = sessionStorage.getItem('user');
if (rawUser && rawUser !== "undefined") {
  try {
    const storedUser = JSON.parse(rawUser);
    setFormData(prev => ({
      ...prev,
      user_id: storedUser.id || 999,
      first_name: storedUser.first_name || '',
      last_name: storedUser.last_name || '',
      anon_phone: storedUser.phone_number || '',
      anon_email: storedUser.email || ''
    }));
  } catch (err) {
    console.error("Failed to parse user from sessionStorage:", err);
  }
}

  
    const storedLocationId = parseInt(sessionStorage.getItem('location_id'), 10);
    if (!isNaN(storedLocationId)) {
      setFormData(prev => ({
        ...prev,
        location_id: storedLocationId
      }));
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'first_name', 'last_name', 'state', 'military_base',
      'building_number', 'room_number', 'location_desc',
      'work_order_desc', 'anon_phone', 'anon_email'
    ];

    const missing = requiredFields.filter((field) => !formData[field]);
    if (missing.length) {
      alert(`Please fill out all required fields: ${missing.join(', ')}`);
      return;
    }

    const payload = {
      ...formData,
      user_id: parseInt(formData.user_id, 10) || 999,
      location_id: parseInt(formData.location_id, 10) || 999,
      priority: parseInt(formData.priority, 10) || 1
    };

    try {
      const res = await fetch('http://localhost:8000/requests/newRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit request');

      const result = await res.json();
      alert('Request submitted successfully!');
      console.log(result);

      setFormData({
        first_name: '',
        last_name: '',
        state: '',
        military_base: '',
        building_number: '',
        room_number: '',
        location_desc: '',
        work_order_desc: '',
        priority: 1,
        anon_phone: '',
        anon_email: '',
        user_id: formData.user_id,
        location_id: 999
      });

    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit maintenance request.');
    }
  };

  return (
    <div className="maint-request-container">
      <header className="home-header">
        <h1>Maintenance Request</h1>
        <p className="subtitle">Please fill out all of the fields and be as accurate as possible.</p>
        <p className="subtitle">To better track any requests, please create an account and then submit your request.</p>
        <p className="subtitle">Please do NOT submit a request and then create an account/login and submit another.</p>
      </header>
      <form onSubmit={handleSubmit} className="maint-request-form">

        <input name="first_name" required placeholder="First Name (required)" value={formData.first_name} onChange={handleChange} />
        <input name="last_name" required placeholder="Last Name (required)" value={formData.last_name} onChange={handleChange} />

        <select name="state" required value={formData.state} onChange={handleChange}>
          <option value="">Select State (required)</option>
          {[...new Set(allLocations.map(loc => loc.state))].map((stateName) => (
            <option key={stateName} value={stateName}>{stateName}</option>

          ))}
        </select>

        <select name="military_base" required value={formData.military_base} onChange={handleChange}>
          <option value="">Select Base (required)</option>
          {baseOptions.map((loc) => (
            <option key={loc.id} value={loc.military_base}>{loc.military_base}</option>
          ))}
        </select>

        <input name="building_number" required placeholder="Building # (required)" value={formData.building_number} onChange={handleChange} />
        <input name="room_number" required placeholder="Room # (required)" value={formData.room_number} onChange={handleChange} />
        <input name="location_desc" required placeholder="Location (e.g., Bathroom) (required)" value={formData.location_desc} onChange={handleChange} />
        <textarea name="work_order_desc" required placeholder="Describe the Problem (required)" value={formData.work_order_desc} onChange={handleChange}></textarea>

        <div className="priority-select-wrapper">
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority" value={formData.priority} onChange={handleChange}>
            <option value={1}>1 - High</option>
            <option value={2}>2 - Medium</option>
            <option value={3}>3 - Low</option>
          </select>
          <div className="priority-help">
            <span className="help-icon">❓</span>
            <div className="help-text">
              <strong>Priority Levels:</strong>
              <ul>
                <li><strong>1 : </strong> needs fixed within 24 hours (e.g. burst pipe, HVAC outage)</li>
                <li><strong>2 : </strong> Should be fixed within the week (e.g. broken outlet, door issue)</li>
                <li><strong>3 : </strong> Should be fixed within 30 days (e.g. paint touch-up, minor repairs)</li>
              </ul>
            </div>
          </div>
        </div>

        <input name="anon_phone" required placeholder="Phone Number (required)" value={formData.anon_phone} onChange={handleChange} />
        <input name="anon_email" required placeholder="Email (required)" value={formData.anon_email} onChange={handleChange} />

        {/* Hidden fields */}
        <input type="hidden" name="user_id" value={formData.user_id} />
        <input type="hidden" name="location_id" value={formData.location_id} />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default MaintenanceRequestPage;
