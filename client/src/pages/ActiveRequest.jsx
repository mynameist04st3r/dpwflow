import React, { useState } from "react";
import "../styles/ActiveRequest.css";


export default function ActiveRequest() {
  const [input, setInput] = useState(""); 
  const [result, setResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); 

  
  const search = async () => {
    try {
      const response = await fetch("http://localhost:8000/GetRequests/acceptedRequests");
      const data = await response.json();
      setResult(data); 
    } catch (error) {
      console.error("fetch error", error);
    }
  };

 
  const handleSearch = () => {
    const filtered = result.filter((item) =>
      item.buildingNumber.includes(input) 
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="container">
      <h1>Active Work Orders</h1>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="Search by building number"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <div>
          <button className="search-button" onClick={() => { search(); handleSearch(); }}>
            Search
          </button>
        </div>
      </div>
      <div>
        <ul>
          {filteredResults.map((item, index) => (
            <li key={index}>
              {item.buildingNumber} - {item.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

