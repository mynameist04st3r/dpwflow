import { useState } from 'react';
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
  const [buildingNumber, setBuildingNumber] = useState('');
  const [suggestedBuildings, setSuggestedBuildings] = useState([]);
  const handleSearchChange = (e) => {
    const newStateCode = e.target.value.toUpperCase();
    setSearchValue(newStateCode);
    fetch(`http://localhost:8000/adminrequests/locations/${newStateCode}`)
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
      fetch(`http://localhost:8000/adminrequests/militaryBases?state=${searchValue}&militaryBase=${e.target.value}`)
        .then((response) => response.json())
        .then((data) => setSuggestedBases(data))
        .catch((err) => console.error(err));
    }
  };

  const handleBuildingNumberChange = (e) => {
    setBuildingNumber(e.target.value);
    if (existingLocation) {
      fetch(`http://localhost:8000/adminrequests/buildings?locationId=${existingLocation.id}&buildingNumber=${e.target.value}`)
        .then((response) => response.json())
        .then((data) => setSuggestedBuildings(data))
        .catch((err) => console.error(err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/adminrequests/locations/${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          fetch(`http://localhost:8000/adminrequests/militaryBases?state=${searchValue}&militaryBase=${militaryBase}`)
            .then((response) => response.json())
            .then((existingBase) => {
              if (existingBase.length > 0) {
                // If the military base exists for this state
                fetch(`http://localhost:8000/adminrequests/buildings?locationId=${data[0].id}&buildingNumber=${buildingNumber}`)
                  .then((response) => response.json())
                  .then((existingBuilding) => {
                    if (existingBuilding.length > 0 && existingBuilding[0].id) {
                      // If the building number already exists for this location
                      if (confirm(`Do you want to delete building ${buildingNumber} for location ${searchValue} ${militaryBase}?`)) {
                        // Delete the building
                        fetch(`http://localhost:8000/adminrequests/buildings/${existingBuilding[0].id}`, {
                          method: 'DELETE',
                        })
                          .then((response) => response.json())
                          .then((data) => console.log(data))
                          .catch((err) => console.error(err));
                      }
                    } else {
                      // Add the new building to the existing location
                      fetch('http://localhost:8000/adminrequests/locations', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({state: searchValue, military_base: militaryBase, building_number: buildingNumber}),
                      })
                        .then((response) => response.json())
                        .then((data) => console.log(data))
                        .catch((err) => console.error(err));
                    }
                  })
                  .catch((err) => console.error(err));
              } else {
                // If the military base does not exist for this state, add it
                fetch('http://localhost:8000/adminrequests/locations', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({state: searchValue, military_base: militaryBase, building_number: buildingNumber}),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((err) => console.error(err));
              }
            })
            .catch((err) => console.error(err));
        } else {
          // If the state does not exist, add it
          fetch('http://localhost:8000/adminrequests/locations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({state: searchValue, military_base: militaryBase, building_number: buildingNumber}),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="installation-data-form-container">
      <header className="home-header">
        <h1>Installation Data</h1>
      </header>
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
                  onChange={handleMilitaryBaseChange}
                  placeholder="Enter military base"
                />
                {suggestedBases.length > 0 && (
                  <ul>
                    {suggestedBases.map((base) => (
                      <li key={base.military_base} onClick={() => setMilitaryBase(base.military_base)}>
                        {base.military_base}
                      </li>
                    ))}
                  </ul>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Building Number:</TableCell>
              <TableCell>
                <input
                  type="search"
                  value={buildingNumber}
                  onChange={handleBuildingNumberChange}
                  placeholder="Enter building number"
                />
                {suggestedBuildings.length > 0 && (
                  <ul>
                    {suggestedBuildings.map((building) => (
                      <li key={building.building_number} onClick={() => setBuildingNumber(building.building_number)}>
                        {building.building_number}
                      </li>
                    ))}
                  </ul>
                )}
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
  );
};

export default AddInstallationData;
