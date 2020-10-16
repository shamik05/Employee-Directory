import React from "react";

// Row component that renders employee details given an employee object
function Row({image, name, phone, email, dob}) {
  return (
    <tr>
      <td><img src={image} alt="Employee thumbnail"/></td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{dob}</td>
    </tr>
  )
}

// Export the component
export default Row;