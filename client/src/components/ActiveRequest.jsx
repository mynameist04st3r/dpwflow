import React, { useState } from 'react'

export default function ActiveRequest() {
    const[input, setInput]=useState("");
    const[result, setResult]=useState([]);
   const search = async () => {
    try {
        const response = await fetch('');
        const data = await response.json();
        setResult(data)
    } catch (error) {
        console.error('fetch error', error);
        
    }
   };
    
  return (
    <div>
      <input placeholder='search active'
       value={input}
       onChange={(e) => setInput(e.target.value)}/>

       <div>
        <button onClick={search}>Search</button>
       </div>
       <div>
        <ul>
        {result.map((active)=>{
           return <li key={active.id}>{active.name} </li>;
        })}
        </ul>
       </div>
    </div>
  );
}
