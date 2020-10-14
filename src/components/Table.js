import React, { useState, useEffect } from "react";
import Row from "./Row";
import Thead from "./Thead";
import "../styles/Table.css";
import API from "../utils/API";

function Table() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState(API.show);

  useEffect(() => {
    setEmployees(API.search(search));
  }, [search])

  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  return (
    <>
    <input 
      type="text"
      placeholder="Search here"
      onChange={handleInputChange}
    />

    <table>
      <Thead />
      <tbody>
        {employees.map((element, index) => {
          return <Row key={index}{...element}/>
        })}
    </tbody>
    </table>
    </>
  )
}

export default Table;