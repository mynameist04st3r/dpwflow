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
            .then.alert(data.message || "priority Order updated.")
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="installation-data-form-container">
      <form className="add-installation-data-form" onSubmit={handleSubmit}>
      <header className="home-header">
        <div>
          <h1>Installation Data</h1>
          <p><b>Instructions for use:</b></p><br/>
          <p>When you intend to add new installation data, ensure that you type only the correct two letter code for the state that the military base you're adding or editing exists within.</p><br/>
          <p>As you begin to type in the military base name, look to see if it already exists below, and if it does, just click on the name that is provided. This ensures that we don't have multiple entries of the same installation with different spellings or capitalizations.</p><br/>
          <p>If you want to add or delete a building from an installation, make sure to fill out the state and military base where that building exists first and then type in the specific building number. If it already exists, when you hit submit, you will be asked if you really want to delete the building. <b>Make sure you know what you're doing before you hit ok!</b></p>

        </div>
      </header>
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
                  maxLength={2}
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
