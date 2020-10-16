import React, { useState, useEffect } from "react";
import Row from "./Row";
import Thead from "./Thead";
import "../styles/Table.css";
import API from "../utils/API";

function Table() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState(API.show);
  const [sortType, setSortType] = useState({ type: null, direction: "ASC" });
  const getDirection = name => {
    if (!sortType) {
      return;
    }
    return sortType.type === name ? sortType.direction : undefined;
  };

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
    <table>
      <Thead handleSort={handleSort} getDirection={getDirection}/>
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