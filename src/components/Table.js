import React, { useState, useEffect } from "react";
import employeedata from "../data/employee.json";
import Row from "./Row";
import Thead from "./Thead";
import "../styles/Table.css";

function Table() {
  // console.log(employeedata);

  const [employees, setEmployees] = useState(employeedata)
  

  // useEffect(() => {
  //   setEmployees(employeedata);
  // }, [])

  function handleInputChange(event) {
    const { value } = event.target;
    // console.log(value);
    setEmployees(employeedata.filter(element => {
      return element["name.first"].includes(value);
    }));
  };

  return (
    <>
    <input 
      type="text"
      name="search"
      placeholder="Search here"
      onChange={handleInputChange}
    />

    <table>
      <Thead />

      <tbody>
        {employees.map((element,index) => {
          return <Row key={index}{...element}/>
        })}
    </tbody>
    </table>
    </>
  )
}

export default Table;