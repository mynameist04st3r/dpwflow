import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../styles/AddInstallationData.css';

function AddInstallationData() {
  const [searchValue, setSearchValue] = useState('');
  const [existingLocation, setExistingLocation] = useState(null);
  const [suggestedBases, setSuggestedBases] = useState([]);
  const [militaryBase, setMilitaryBase] = useState('');
  const handleSearchChange = (e) => {
    const newStateCode = e.target.value.toUpperCase();
    setSearchValue(newStateCode);
    fetch(`/locations?state=${newStateCode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setExistingLocation(data[0]);
        } else {
          setExistingLocation(null);
        }
      })
      .catch((err) => console.error(err));
  };
  const handleMilitaryBaseChange = (e) => {
    setMilitaryBase(e.target.value);
    if (searchValue) {
      fetch(`militaryBases?state=${searchValue}&militaryBase=${e.target.value}`)
        .then((response) => response.json())
        .then((data) => setSuggestedBases(data))
        .catch((err) => console.error(err));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingLocation) {
      return;
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

  // useEffect(() => {
  //   fetch('/locations')
  //     .then((response) => response.json())
  //     .then((data) => setLocations(data))
  //     .catch((err) => console.error(err));
  //   const existingLocation = locations.find((location) => location.state === searchValue);
  //   if (existingLocation) {
  //     setIsLocationExisting(true);
  //   }
  // }, [searchValue, locations]);

  return (
    <div className="installation-data-form-container">
      <form className="add-installation-data-form" onSubmit={handleSubmit}>
        <Table>
          <TableHead>
            <TableRow className="admin-forms-installation-header-row">
              <TableCell colSpan={2} style={{ borderBottom: '2px solid #961e14' }}>Enter Installation and Building Information:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="admin-forms-installation-body">
            <TableRow>
              <TableCell>State:</TableCell>
              <TableCell>
                <input
                  type="search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Enter state code"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Military Base:</TableCell>
              <TableCell>
                <input
                  type="search"
                  value={militaryBase}
                  onChange="handleMilitaryBaseChange"
                  placeholder="Enter military base"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} style={{textAlign: 'center'}}>
                <button type="submit">Submit</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
    // <form className="add-installation-data-form" onSubmit={handleSubmit}>
    //   <label className="add-installation-data-label" htmlFor="search">Search:</label>
    //   <input
    //     className="add-installation-data-search-box"
    //     type="search"
    //     // id="search"
    //     value={searchValue}
    //     onChange={handleSearchChange}
    //     placeholder="Enter state code"
    //   />
    //   {existingLocation ? (
    //     <p>Location already exists: {existingLocation.state}</p>
    //   ):(
    //     <div>
    //       <label className="add-installation-data-label" htmlFor="military-base">Military Base</label>
    //       <input
    //         className="add-installation-data-search-box"
    //         type="text"
    //         // id="military-base"
    //         value={militaryBase}
    //         onChange={handleMilitaryBaseChange}
    //         placeholder="Enter military base"
    //       />
    //     </div>
    //   )}
    //   <button type="submit">Submit</button>
    // </form>
  )
};
export default AddInstallationData;
