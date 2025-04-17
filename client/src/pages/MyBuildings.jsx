import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeModal from "../components/QRCodeModal";
import "../styles/MyBuildings.css";

export default function MyBuildings() {
  const [assignedBuildings, setAssignedBuildings] = useState([]);
  const [allBuildings, setAllBuildings] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedBuildingId, setSelectedBuildingId] = useState("");

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrModalData, setQrModalData] = useState({
    state: "",
    base: "",
    building: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    fetch("http://localhost:8000/buildings/get-buildings")
      .then((res) => res.json())
      .then(setAllBuildings)
      .catch((err) => console.error("Failed to load buildings", err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/admin-buildings?admin_id=${userId}`)
      .then((res) => res.json())
      .then(setAssignedBuildings)
      .catch((err) => console.error("Failed to load assigned buildings", err));
  }, [userId]);

  const handleAssign = () => {
    if (!selectedBuildingId) return;

    const building = allBuildings.find((b) => b.id === selectedBuildingId);
    const confirmAssign = window.confirm(
      `Assign Building ${building.building_number} (${building.military_base}, ${building.state}) to yourself?`
    );
    if (!confirmAssign) return;

    fetch("http://localhost:8000/admin-buildings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: userId,
        building_id: selectedBuildingId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSelectedState("");
        setSelectedBase("");
        setSelectedBuildingId("");
        return fetch(
          `http://localhost:8000/admin-buildings?admin_id=${userId}`
        );
      })
      .then((res) => res.json())
      .then(setAssignedBuildings)
      .catch((err) => console.error("Error assigning building", err));
  };

  const handleRemove = (building_id) => {
    const building = allBuildings.find((b) => b.id === building_id);
    const confirmRemove = window.confirm(
      `Remove Building ${building.building_number} (${building.military_base}, ${building.state}) from your assignments?`
    );
    if (!confirmRemove) return;

    fetch("http://localhost:8000/admin-buildings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_id: userId, building_id }),
    })
      .then((res) => res.json())
      .then(() =>
        setAssignedBuildings((prev) =>
          prev.filter((b) => b.building_id !== building_id)
        )
      )
      .catch((err) => console.error("Error removing building", err));
  };

  const openQrModal = (building) => {
    setQrModalData({
      state: building.state,
      base: building.military_base,
      building: building.building_number,
    });
    setQrModalOpen(true);
  };

  const closeQrModal = () => {
    setQrModalOpen(false);
  };

  const uniqueStates = [...new Set(allBuildings.map((b) => b.state))];
  const basesInState = allBuildings
    .filter((b) => b.state === selectedState)
    .map((b) => b.military_base);
  const uniqueBases = [...new Set(basesInState)];

  const buildingsMatching = allBuildings.filter(
    (b) =>
      b.state === selectedState &&
      b.military_base === selectedBase &&
      b.id !== 999
  );

  return (
    <div className="my-buildings-container">
      <h1>Manage My Buildings</h1>
      <div className="buildings-columns">
        <div className="buildings-section">
          <h2 className="panel-heading">Currently Assigned</h2>
          <div className="building-tags">
            {assignedBuildings.length === 0 ? (
              <p>You are not assigned to any buildings.</p>
            ) : (
              assignedBuildings.map((b) => {
                const building = allBuildings.find(
                  (ab) => ab.id === b.building_id
                );
                const isUnknown = building?.id === 999;

                return (
                  <div key={b.building_id} className="building-tag">
                    <p>
                      <strong>Building ID:</strong>{" "}
                      {isUnknown ? "Unknown" : building?.id}
                    </p>
                    <p>
                      <strong>Building Number:</strong>{" "}
                      {building?.building_number}
                    </p>
                    <p>
                      <strong>Location:</strong> {building?.military_base},{" "}
                      {building?.state}
                    </p>
                    {!isUnknown && (
                      <>
                        <button onClick={() => handleRemove(b.building_id)}>
                          Remove
                        </button>
                        <button
                          onClick={() => openQrModal(building)}
                          style={{ marginLeft: "0.5rem" }}
                        >
                          Generate QR
                        </button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="buildings-section">
          <h2 className="panel-heading">Assign New Building</h2>
          <div className="assign-form">
            <label htmlFor="stateSelect">State:</label>
            <select
              id="stateSelect"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedBase("");
                setSelectedBuildingId("");
              }}
            >
              <option value="">Select a state</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {selectedState && (
              <>
                <label htmlFor="baseSelect">Base:</label>
                <select
                  id="baseSelect"
                  value={selectedBase}
                  onChange={(e) => {
                    setSelectedBase(e.target.value);
                    setSelectedBuildingId("");
                  }}
                >
                  <option value="">Select a base</option>
                  {uniqueBases.map((base) => (
                    <option key={base} value={base}>
                      {base}
                    </option>
                  ))}
                </select>
              </>
            )}

            {selectedState && selectedBase && (
              <>
                <label htmlFor="buildingSelect">Building Number:</label>
                <select
                  id="buildingSelect"
                  value={selectedBuildingId}
                  onChange={(e) =>
                    setSelectedBuildingId(parseInt(e.target.value))
                  }
                >
                  <option value="">Select a building</option>
                  {buildingsMatching.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.building_number}
                    </option>
                  ))}
                </select>
                <button onClick={handleAssign}>Assign ➕</button>
              </>
            )}
          </div>
        </div>
      </div>
      <br />
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>

      {qrModalOpen && (
        <QRCodeModal
          state={qrModalData.state}
          base={qrModalData.base}
          building={qrModalData.building}
          onClose={closeQrModal}
        />
      )}
    </div>
  );
}
