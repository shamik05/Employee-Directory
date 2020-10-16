import employeedata from "../data/employee.json";

export default {
  show: () => {
    return employeedata.map(element => {
      return {
        image: element["picture.large"],
        name: `${element["name.first"]} ${element["name.last"]}`,
        phone: element.phone,
        email: element.email,
        dob: element["dob.date"].slice(0,10)
      }
    })
  },
  escapeRegExp: string => {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  },

  search: function(value) {
    const search = new RegExp(this.escapeRegExp(value), "gi")
    return this.show().filter(element => {
      return Object.values(element).some(e => {
        return search.test(e)
      })
    })
  },
  sorting: function(heading, direction){
    console.log(heading, direction)
    return this.show().sort((x, y) => {
      if(x[heading] < y[heading]) {
        return direction === "ASC" ? -1 : 1;
      }

      if (x[heading] > y[heading]) {
        return direction === "ASC" ? 1 : -1;
      }
      return 0;
    })
  }
}