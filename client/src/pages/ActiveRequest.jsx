import React, { useState } from "react";
import "../styles/ActiveRequest.css";
export default function ActiveRequest() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const search = async () => {
    try {
      const response = await fetch("");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("fetch error", error);
    }
  };

  return (
    <div>
      <div className="search-container">

      <input
      className="search-input"
        placeholder="search active"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

      <div>
        <button
        className="search-button" 
        onClick={search}>Search</button>
      </div>
        </div>
      <div>
        <ul>
          {result.map((active) => {
            return <li key={active.id}>{active.id} </li>;
          })}
        </ul>
      </div>
    </div>
  );
}
