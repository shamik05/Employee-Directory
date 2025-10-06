import employeeUtil from "./API"

jest.mock("../data/employee.json", () => [
  {
    "name.title": "Mr",
    "name.first": "Gabe",
    "name.last": "Stevens",
    "email": "gabe.stevens@testing.com",
    "dob.date": "1975-11-06T09:12:22.812Z",
    "phone": "(464) 741-3133",
    "picture.large": "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    "name.title": "Ms", 
    "name.first": "Jane",
    "name.last": "Smith",
    "email": "jane.smith@testing.com",
    "dob.date": "1990-05-15T08:30:00.000Z",
    "phone": "(555) 123-4567",
    "picture.large": "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    "name.title": "Dr",
    "name.first": "Bob", 
    "name.last": "Johnson",
    "email": "bob.johnson@testing.com",
    "dob.date": "1985-12-30T10:45:00.000Z",
    "phone": "(555) 987-6543",
    "picture.large": "https://randomuser.me/api/portraits/men/2.jpg"
  }
])

describe("API Functions", () => {
  describe("show()", () => {
    test("transforms employee data correctly", () => {
      const result = employeeUtil.show();

      expect(result).toHaveLength(3);
      
      expect(result[0]).toEqual({
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "Gabe Stevens",
        phone: "(464) 741-3133",
        email: "gabe.stevens@testing.com",
        dob: "1975-11-06"
      });

      expect(result[0].dob).toBe("1975-11-06");
      expect(result[0].dob).not.toContain("T");    
      expect(result[0].name).toBe("Gabe Stevens");
    });
  });

  describe("escapeRegExp()", () => {
    test("escapes special regex characters", () => {
      expect(employeeUtil.escapeRegExp("test.*+?^${}()|[]\\"))
        .toBe("test\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\")
    });

    test("handles normal strings without special characters", () => {
      expect(employeeUtil.escapeRegExp("hello world"))
        .toBe("hello world")
    });

    test("handles email addresses with special characters", () => {
      expect(employeeUtil.escapeRegExp("user.name+tag@testing.com"))
        .toBe("user\\.name\\+tag@testing\\.com")
    });
  });

  describe("search()", () => {
    test("finds employees by name", () => {
      const result = employeeUtil.search("Gabe");
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Gabe Stevens");
    });

    test("finds employees by email", () => {
      const result = employeeUtil.search("jane.smith@testing.com");
      
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe("jane.smith@testing.com");
    });

    test("finds employees by phone", () => {
      const result = employeeUtil.search("741-3133");
      
      expect(result).toHaveLength(1);
      expect(result[0].phone).toBe("(464) 741-3133");
    });

    test("is case insensitive", () => {
      const result = employeeUtil.search("GABE");
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Gabe Stevens");
    });

    test("returns empty array for no matches", () => {
      const result = employeeUtil.search("nonexistent");
      
      expect(result).toHaveLength(0);
    });

    test("returns all employees for empty search", () => {
      const result = employeeUtil.search("");
      
      expect(result).toHaveLength(3);
    });

    test("handles special regex characters in search", () => {
      const result = employeeUtil.search("gabe.stevens@testing.com");
      
      expect(result[0].email).toBe("gabe.stevens@testing.com");
    });
  });

  describe("sorting()", () => {
    test("sorts by name in ascending order", () => {
      const result = employeeUtil.sorting("name", "ASC");
      
      expect(result[0].name).toBe("Bob Johnson");
      expect(result[1].name).toBe("Gabe Stevens"); 
      expect(result[2].name).toBe("Jane Smith");
    });

    test("sorts by name in descending order", () => {
      const result = employeeUtil.sorting("name", "DSC");
      
      expect(result[0].name).toBe("Jane Smith");
      expect(result[1].name).toBe("Gabe Stevens");
      expect(result[2].name).toBe("Bob Johnson");
    })

    test("sorts by email in ascending order", () => {
      const result = employeeUtil.sorting("email", "ASC");
      
      expect(result[0].email).toBe("bob.johnson@testing.com");
      expect(result[1].email).toBe("gabe.stevens@testing.com");
      expect(result[2].email).toBe("jane.smith@testing.com");
    });

    test("sorts by date of birth in ascending order", () => {
      const result = employeeUtil.sorting("dob", "ASC");
      
      expect(result[0].dob).toBe("1975-11-06");
      expect(result[1].dob).toBe("1985-12-30");
      expect(result[2].dob).toBe("1990-05-15");
    });

    test("returns stable order for equal values", () => {
      const result = employeeUtil.sorting("name", "ASC");
      const result1 = employeeUtil.sorting("name", "ASC");
      
      expect(result).toEqual(result1);
    });
  });
});
