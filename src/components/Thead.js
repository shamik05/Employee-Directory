import React from "react";

function Thead({handleSort, getDirection}) {
  return (
    <thead>
      <tr>
        <th></th>
        <th>
          <button 
            type="button" 
            onClick={() => handleSort("name")} 
            className={getDirection("name")}
            >Name
          </button>
        </th>

        <th>
          <button 
            type="button" 
            onClick={() => handleSort("phone")} 
            className={getDirection("phone")}
            >Phone
            </button>
        </th>

        <th>
          <button 
            type="button" 
            onClick={() => handleSort("email")} 
            className={getDirection("email")}
            >Email
            </button>
        </th>

        <th>
          <button 
            type="button" 
            onClick={() => handleSort("dob")} 
            className={getDirection("dob")}
            >DOB
            </button>
        </th>
        
      </tr>
    </thead>
  )
}

export default Thead;