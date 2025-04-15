import { useState, useEffect } from 'react';
import '../styles/Admin.css';
import NavBar from '../components/NavBar';
import PrioritySorter from '../components/PrioritySorter';
import AddInstallationData from '../components/AddInstallationData';

function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showForm) {
        const container = document.querySelector('.admin-forms-container');
        const prioritySorter = document.querySelector('.priority-sorter-form-container');
        const addInstallationData = document.querySelector('.add-installation-data-form');
        if (container && e.target !== container && !container.contains(e.target) &&
            (formType === 'priority' ?
              (prioritySorter && e.target !== prioritySorter && !prioritySorter.contains(e.target))
              : (addInstallationData ? (e.target !== addInstallationData && !addInstallationData.contains(e.target)) : true))) {
          setShowForm(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm, formType]);

  return (
    <div className="admin-back-div-container">
      <NavBar />
      <div className="admin-container">
        <div className="admin-button-bar">
          <div className="admin-button-container">
            <button className="admin-buttons" onClick={() => {setShowForm(true); setFormType('priority');}}>Prioritize Work Orders</button>
            <button className="admin-buttons">Set User Rolls</button>
            <button className="admin-buttons" onClick={() => {setShowForm(true); setFormType('addInstallation');}}>Add Installation Data</button>
          </div>
        </div>
        <div className="admin-forms-container">
          <div className="admin-forms">
            {showForm && formType === 'priority' && <PrioritySorter />}
            {showForm && formType === 'addInstallation' && <AddInstallationData />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
