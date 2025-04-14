import { useState } from 'react';
import '../styles/Admin.css';
import NavBar from '../components/NavBar';
import PrioritySorter from '../components/PrioritySorter';
function Admin() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="admin-back-div-container">
      <NavBar />
      <div className="admin-container">
        <div className="admin-button-bar">
          <div className="admin-button-container">
            <button className="admin-buttons" onClick={() => setShowForm(true)}>Prioritize Work Orders</button>
            <button className="admin-buttons">Set User Rolls</button>
            <button className="admin-buttons" onClick={() => setShowForm(true)}>Add Installation Data</button>
          </div>
        </div>
        <div className="admin-forms-container">
          <div className="admin-forms">
            {showForm && (
              <PrioritySorter />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;