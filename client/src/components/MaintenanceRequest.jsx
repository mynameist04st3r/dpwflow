import React, { useState, useEffect } from 'react';
import './MaintenanceRequest.css';

// Base locations by state
const baseMap = {
  AL: ['Fort Rucker', 'Redstone Arsenal', 'Anniston Army Depot'],
  AK: ['Fort Wainwright', 'Fort Greely', 'Joint Base Elmendorf-Richardson'],
  AZ: ['Fort Huachuca', 'Yuma Proving Ground'],
  AR: ['Pine Bluff Arsenal', 'Camp Joseph T. Robinson', 'Fort Chaffee'],
  CA: ['Fort Irwin', 'Presidio of Monterey', 'Camp Roberts', 'Fort Hunter Liggett'],
  CO: ['Fort Carson', 'Pueblo Chemical Depot'],
  GA: ['Fort Benning', 'Fort Gordon', 'Fort Stewart', 'Hunter Army Airfield'],
  HI: ['Schofield Barracks', 'Fort Shafter', 'Tripler Army Medical Center'],
  KS: ['Fort Leavenworth', 'Fort Riley'],
  KY: ['Fort Knox', 'Fort Campbell'],
  LA: ['Fort Polk', 'Camp Beauregard'],
  MD: ['Aberdeen Proving Ground', 'Fort Meade', 'Fort Detrick'],
  MO: ['Fort Leonard Wood'],
  NJ: ['Fort Dix', 'Picatinny Arsenal'],
  NY: ['Fort Drum', 'United States Military Academy at West Point', 'Fort Hamilton'],
  NC: ['Fort Bragg', 'Camp Mackall'],
  OK: ['Fort Sill', 'McAlester Army Ammunition Plant'],
  SC: ['Fort Jackson'],
  TX: ['Fort Hood', 'Fort Bliss', 'Fort Sam Houston'],
  VA: ['Fort Belvoir', 'Fort Eustis', 'Fort Lee'],
  WA: ['Joint Base Lewis-McChord', 'Yakima Training Center'],
  WI: ['Fort McCoy']
};

const MaintenanceRequestPage = () => {
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
    phone_number: '',
    email: '',
  });

  const [baseOptions, setBaseOptions] = useState([]);

  useEffect(() => {
    setBaseOptions(baseMap[formData.state] || []);
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'first_name', 'last_name', 'state', 'military_base',
      'building_number', 'room_number', 'location_desc',
      'work_order_desc', 'phone_number', 'email'
    ];

    const missing = requiredFields.filter((f) => !formData[f]);
    if (missing.length) {
      alert(`Please fill out all required fields: ${missing.join(', ')}`);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/requests/newRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Network response was not ok');

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
        phone_number: '',
        email: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="maint-request-container">
      <h2>Submit Maintenance Request</h2>
      <form onSubmit={handleSubmit} className="maint-request-form">

        <input
          name="first_name"
          required
          placeholder="First Name (required)"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          required
          placeholder="Last Name (required)"
          value={formData.last_name}
          onChange={handleChange}
        />

        <select name="state" required value={formData.state} onChange={handleChange}>
          <option value="">Select State (required)</option>
          {Object.keys(baseMap).map((abbr) => (
            <option key={abbr} value={abbr}>{abbr}</option>
          ))}
        </select>

        <select name="military_base" required value={formData.military_base} onChange={handleChange}>
          <option value="">Select Base (required)</option>
          {baseOptions.map((base, idx) => (
            <option key={idx} value={base}>{base}</option>
          ))}
        </select>

        <input
          name="building_number"
          required
          placeholder="Building # (required)"
          value={formData.building_number}
          onChange={handleChange}
        />
        <input
          name="room_number"
          required
          placeholder="Room # (required)"
          value={formData.room_number}
          onChange={handleChange}
        />
        <input
          name="location_desc"
          required
          placeholder="Location (e.g., Bathroom) (required)"
          value={formData.location_desc}
          onChange={handleChange}
        />
        <textarea
          name="work_order_desc"
          required
          placeholder="Describe the Problem (required)"
          value={formData.work_order_desc}
          onChange={handleChange}
        ></textarea>

        <div className="priority-select-wrapper">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value={1}>1 - High</option>
            <option value={2}>2 - Medium</option>
            <option value={3}>3 - Low</option>
          </select>
          <div className="priority-help">
            <span className="help-icon">❓</span>
            <div className="help-text">
              <strong>Priority Levels:</strong>
              <ul>
                <li><strong>1:</strong> Fix within 24 hours (e.g. burst pipe, HVAC outage)</li>
                <li><strong>2:</strong> Fix within the week (e.g. broken outlet, door issue)</li>
                <li><strong>3:</strong> Fix within 30 days (e.g. paint touch-up, minor repairs)</li>
              </ul>
            </div>
          </div>
        </div>

        <input
          name="phone_number"
          required
          placeholder="Phone Number (required)"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <input
          name="email"
          required
          placeholder="Email (required)"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default MaintenanceRequestPage;
