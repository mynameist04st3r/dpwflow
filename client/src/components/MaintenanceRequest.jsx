import React, { useState, useEffect } from 'react';
import './MaintenanceRequest.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Auto-populate military bases based on selected state
    const baseMap = {
      CA: ['Fort Irwin', 'Camp Pendleton'],
      TX: ['Fort Bliss', 'Fort Hood'],
      NC: ['Fort Bragg'],
      // Add more states as needed
    };
    setBaseOptions(baseMap[formData.state] || []);
  }, [formData.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert('Request submitted successfully!');
      console.log(result);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="maint-request-container">
      <h2>Submit Maintenance Request</h2>
      <form onSubmit={handleSubmit} className="maint-request-form">
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />

        <select name="state" value={formData.state} onChange={handleChange}>
          <option value="">Select State</option>
          <option value="CA">California</option>
          <option value="TX">Texas</option>
          <option value="NC">North Carolina</option>
        </select>

        <select name="military_base" value={formData.military_base} onChange={handleChange}>
          <option value="">Select Base</option>
          {baseOptions.map((base, idx) => (
            <option key={idx} value={base}>{base}</option>
          ))}
        </select>

        <input name="building_number" placeholder="Building #" value={formData.building_number} onChange={handleChange} />
        <input name="room_number" placeholder="Room #" value={formData.room_number} onChange={handleChange} />
        <input name="location_desc" placeholder="Problem Location (e.g. Bathroom)" value={formData.location_desc} onChange={handleChange} />
        <textarea name="work_order_desc" placeholder="Describe the Problem" value={formData.work_order_desc} onChange={handleChange}></textarea>

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>

        <input name="phone_number" placeholder="Contact Phone Number" value={formData.phone_number} onChange={handleChange} />
        <input name="email" placeholder="Contact Email" value={formData.email} onChange={handleChange} />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default MaintenanceRequestPage;
