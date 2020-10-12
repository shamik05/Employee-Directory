import React from "react";
import Row from "./Row";
import employeedata from "../data/employee.json";

function TableBody() {
  return (
    <tbody>
    {employeedata.map((element,index) => {
      return <Row key={index}{...element}/>
    })}
    </tbody>
  )
}

export default TableBody;