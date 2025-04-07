import React, { useState, useEffect } from 'react';
import './MaintenanceRequestPage.css';

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
    const baseMap = {
      CA: ['Fort Irwin', 'Camp Pendleton'],
      TX: ['Fort Bliss', 'Fort Hood'],
      NC: ['Fort Bragg'],
    };
    setBaseOptions(baseMap[formData.state] || []);
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'first_name',
      'last_name',
      'state',
      'military_base',
      'building_number',
      'room_number',
      'location_desc',
      'work_order_desc',
      'phone_number',
      'email'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill out all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/requests', {
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
          <option value="CA">California</option>
          <option value="TX">Texas</option>
          <option value="NC">North Carolina</option>
        </select>

        <select
          name="military_base"
          required
          value={formData.military_base}
          onChange={handleChange}
        >
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
          placeholder="Location (e.g. Bathroom) (required)"
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

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>

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

        {/* Optional field example */}
        {/* <input type="file" name="attachment" onChange={handleFileChange} />
        <small>(Optional) Upload attachment</small> */}

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default MaintenanceRequestPage;
