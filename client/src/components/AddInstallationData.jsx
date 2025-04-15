import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../styles/AddInstallationData.css';

function AddInstallationData() {
  const [searchValue, setSearchValue] = useState('');
  const [locations, setLocations] = useState([]);
  const [militaryBase, setMilitaryBase] = useState('');
  const [isLocationExisting, setIsLocationExisting] = useState(false);
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleMilitaryBaseChange = (e) => {
    setMilitaryBase(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocationExisting) {

    } else {
      fetch('/locations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({state: searchValue, military_base: militaryBase}),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetch('/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error(err));
    const existingLocation = locations.find((location) => location.state === searchValue);
    if (existingLocation) {
      setIsLocationExisting(true);
    }
  }, [searchValue, locations]);

  return (
    <form className="add-installation-data-form" onSubmit={handleSubmit}>
      <label className="add-installation-data-label" htmlFor="search">Search:</label>
      <input
        className="add-installation-data-search-box"
        type="search"
        id="search"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Enter search term"
      />
      {isLocationExisting ? (
        <p>Location already exists</p>
      ):(
        <div>
          <label className="add-installation-data-label" htmlFor="military-base">Military Base</label>
          <input
            className="add-installation-data-search-box"
            type="text"
            id="military-base"
            value={militaryBase}
            onChange={handleMilitaryBaseChange}
            placeholder="Enter military base"
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  )
};
export default AddInstallationData;
