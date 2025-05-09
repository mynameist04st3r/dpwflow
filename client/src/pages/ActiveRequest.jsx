import React, { useState } from "react";
import "../styles/ActiveRequest.css";
import { useNavigate } from "react-router-dom";

export default function ActiveRequest() {
  const [input, setInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  const enterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      setInput("");
    }
  };
  // Fetch data when the Search button is clicked
  const handleSearch = async () => {
    if (!input) {
      alert("Please enter a building number to search."); // Basic validation
      return;
    }

    try {
      // const encodedInput = encodeURIComponent(input);
      const response = await fetch(
        `http://localhost:8000/GetRequests/byBuilding/${input}`
      );
      const data = await response.json();
      setFilteredResults(data); // Update the filtered results with fetched data
    } catch (error) {
      console.error("fetch error", error);
    }
  };

  return (
    <>
      <div className="total-display">
        {/* <div className="container_header">
          <button className="home_button" onClick={() => navigate("/")}>
            home
          </button>
        </div> */}
        <div className="container">
          <h1 className="h1-header">Building Work Orders</h1>
          <div className="search-container">
            <input
              className="search-input"
              placeholder="Search by building number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={enterKey}
              // Update input state on change
            />
            <div>
              <button
                className="search-button"
                onClick={handleSearch} // Trigger fetch on button click
              >
                Search
              </button>
            </div>
          </div>
          <div>
            <ul>
              {filteredResults
                // the below code filter has been turned off for now
                // .filter((item) => item.accepted === true)
                .map((item, index) => (
                  <li key={index} className="list">
                    <div className="toprow">
                      <span> Building Number: {item.building_number} </span>
                      <span>Room Number {item.room_number}</span>
                      <span>Date created {item.date_created}</span>
                    </div>
                    Discription: {item.work_order_desc}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
