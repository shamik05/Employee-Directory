import { useState, useEffect } from "react";
import Row from "./Row";
import Thead from "./Thead";
import "../styles/Table.css";
import API from "../utils/API";

// Table component
const Table = () => {
  // Save input text as search state
  const [search, setSearch] = useState("");

  // Employee data state. Default loads the array returned from the show function the API.js
  const [employees, setEmployees] = useState(API.show);

  // Sorting field and direction saved as state. Default first direction will be in ascending order
  const [sortType, setSortType] = useState({ type: null, direction: "ASC" });

  // Function passes sorting direction to heading component by column heading
  const getDirection = (name) => {
    // Check if the sort state exists
    if (!sortType) {
      return;
    }
    // CSS renders up or down arrow depending on the current sort direction
    return sortType.type === name ? sortType.direction : null;
  };

  // If the input text changes then set the results in the employee state
  useEffect(() => {
    setEmployees(API.search(search));
  }, [search]);

  // Event listener to set the search state when the input value changes
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // If sort state changes then run sort function and set the results in the employee state
  useEffect(() => {
    setEmployees(API.sorting(sortType.type, sortType.direction));
  }, [sortType]);

  // The following is based on Kristofer Giltvedt Selbekk's article of Creating Sortable Tables with React
  // https://www.smashingmagazine.com/2020/03/sortable-tables-react/
  // Event listener when column heading is clicked
  const handleSort = (heading) => {
    // By default the direction is in ascending order
    let direction = "ASC";
    // Check if sort state exists, the button clicked matches with current sort heading and if current sort direction is ascending
    if (sortType && sortType.type === heading && sortType.direction === "ASC") {
      // If above condition is true this means the button was clicked twice consecutively then set direction as descending
      direction = "DSC";
    }
    // Save sort state with a column name and direction
    setSortType({ type: heading, direction });
  };

  return (
    <>
      {/* Input textbox for searching with an onchange handler */}
      <input
        type="text"
        placeholder="Search here"
        onChange={handleInputChange}
      />
      {/* Render the table */}
      <table>
        {/* Render the table headings with an event handler and sort direction as classname passed as props */}
        <Thead handleSort={handleSort} getDirection={getDirection} />

        {/* Rest of the table */}
        <tbody>
          {/* Take the employee array from the employee state and render a row component for each element */}
          {employees.map((element) =>
          // Pass current index and spread the object within the current element as props
            <Row key={element.name} {...element} />)}
        </tbody>
      </table>
    </>
  );
}

// Export the component
export default Table;
