import React from "react";

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

export default Row;