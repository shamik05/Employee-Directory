import React from "react";

function Thead({handleSort}) {
  return (
    <thead>
      <tr>
        <th>Image</th>
        <th><button onClick={() => handleSort("name")}>Name</button></th>
        <th><button onClick={() => handleSort("phone")}>Phone</button></th>
        <th><button onClick={() => handleSort("email")}>Email</button></th>
        <th><button onClick={() => handleSort("dob")}>DOB</button></th>
      </tr>
    </thead>
  )
}

export default Thead;