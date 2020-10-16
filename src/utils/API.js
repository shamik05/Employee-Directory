// Get data from json file
import employeedata from "../data/employee.json";

// The following are functions related to displaying, filtering and sorting data. 
export default {
  // Return employeedata as an array and trim it to 6 fields
  show: () => {
    // Map over employeedata
    return employeedata.map(element => {
      return {
        // Set image url
        image: element["picture.large"],

        // Set name as first name and last name
        name: `${element["name.first"]} ${element["name.last"]}`,
        phone: element.phone,
        email: element.email,

        // Display date of birth as YYYY-MM-DD
        dob: element["dob.date"].slice(0,10)
      }
    })
  },

  // Function to check if a string contains any special characters that need to be escaped before matching
  escapeRegExp: string => {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  },

  // Function to check if the search text exists within the employee data
  search: function(value) {
    // Create a regexp expression with the search value
    const search = new RegExp(this.escapeRegExp(value), "gi")

    // Runs filter function on Employee Array
    return this.show().filter(element => {

      // Each element is an object. Construct an array of their values for each element
      return Object.values(element).some(e => {
        // Check if search value matches any of the object's values. Return true if it does
        return search.test(e)
      })
    })
  },

  // Function to sort employees. Takes in the column heading and direction to sort in
  // It is based on Kristofer Giltvedt Selbekk's article of Creating Sortable Tables with React
  // https://www.smashingmagazine.com/2020/03/sortable-tables-react/
  sorting: function(heading, direction){
    
    // Sort function compares two elements by the column heading and direction chosen
    return this.show().sort((x, y) => {
      // Check if first element's position alphabetically in related to second element
      if(x[heading] < y[heading]) {
        return direction === "ASC" ? -1 : 1;
      }

      if (x[heading] > y[heading]) {
        return direction === "ASC" ? 1 : -1;
      }
      // Take no action
      return 0;
    })
  }
}