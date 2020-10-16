import React from "react";

// Component rendering all column headings as clickable buttons
function Thead({handleSort, getDirection}) {
  return (
    <thead>
      <tr>
        {/* Empty cell for the image heading */}
        <th></th>
        {/* Cell for the name column. Sets an on click handler and a function to set sort direction as class name */}
        <th>
          <button 
            type="button" 
            // Sets an onclick handler that passes name as an argument
            onClick={() => handleSort("name")} 
            // Function to set the sort direction as class name for the button
            className={getDirection("name")}
            >Name
          </button>
        </th>

        {/* Cell for the phone column */}
        <th>
          <button 
            type="button"
            // Sets an onclick handler that passes phone as an argument 
            onClick={() => handleSort("phone")} 
            // Function to set the sort direction as class name for the button
            className={getDirection("phone")}
            >Phone
            </button>
        </th>

        {/* Cell for the email column */}
        <th>
          <button 
            type="button" 
            // Sets an onclick handler that passes email as an argument
            onClick={() => handleSort("email")} 
            // Function to set the sort direction as class name for the button
            className={getDirection("email")}
            >Email
            </button>
        </th>

        {/* Cell for the date of birth column */}
        <th>
          <button 
            type="button" 
            // Sets an onclick handler that passes the date of birth as an argument
            onClick={() => handleSort("dob")} 
            // Function to set the sort direction as class name for the button
            className={getDirection("dob")}
            >DOB
            </button>
        </th>
        
      </tr>
    </thead>
  )
}

// Export the component
export default Thead;