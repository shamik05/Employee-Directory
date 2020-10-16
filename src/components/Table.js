import React, { useState, useEffect } from "react";
import Row from "./Row";
import Thead from "./Thead";
import "../styles/Table.css";
import API from "../utils/API";

function Table() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState(API.show);
  const [sortType, setSortType] = useState({
    type: null, direction: "ASC"
  });

  useEffect(() => {
    setEmployees(API.search(search));
  }, [search])

  const handleInputChange = event => {
    setSearch(event.target.value);
  };
  
  useEffect(() => {
    setEmployees(API.sorting(sortType.type, sortType.direction))
  },[sortType])

  const handleSort = heading => {
    let direction = "ASC";
    if(sortType && sortType.type === heading && sortType.direction === "ASC"){
      direction = "DSC";
    }
    setSortType({ type: heading, direction: direction })
  };

  return (
    <>
    <input 
      type="text"
      placeholder="Search here"
      onChange={handleInputChange}
    />
    <h1>{sortType.direction} {sortType.type}</h1>
    <table>
      <Thead handleSort={handleSort}/>
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