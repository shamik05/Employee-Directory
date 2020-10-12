import React from "react";

function Row(props) {
  return (
    <tr>
      <td><img src={props["picture.large"]} alt="Employee thumbnail"/></td>
      <td>{props["name.first"]} {props["name.last"]}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props["dob.date"]}</td>
    </tr>
  )
}

export default Row;