import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import Table from "./Table"
import API from "../utils/API"

jest.mock("../utils/API", () => ({
  show: jest.fn(() => [{ 
    name: "Test Ing", 
    email: "test@testing.com", 
    phone: "123", 
    dob: "1984-01-01", 
    image: "" 
  }]),
  search: jest.fn((query) => query ? [] : [{ name: "Test Ing" }]),
  sorting: jest.fn(() => [{ name: "Test Ing" }])
}));

jest.mock("./Row", () => {
  const MockRow = (props) => (
    <tr data-testid="mock-row">
      <td>{props.name}</td>
    </tr>
    );

  MockRow.displayName = "MockRow"
});

jest.mock("./Thead", () => {
  const mockThead = ({ handleSort }) => (
    <thead>
      <tr>
        <th><button onClick={() => handleSort("name")}>Name</button></th>
        <th><button onClick={() => handleSort("email")}>Email</button></th>
      </tr>
    </thead>
  );

  mockThead.displayName = "mockThead"
});

describe("Component Table", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("show initial data", () => {
    render(<Table />);
    
    expect(API.show).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Test Ing")).toBeInTheDocument();
  });

  test("check search data", async () => {
    const user = userEvent.setup();
    render(<Table />);

    await user.type(screen.getByPlaceholderText("Search here"), "test");
    
    expect(API.search).toHaveBeenCalledWith("test");
  })

  test("triggers sorting when header buttons are clicked", async () => {
    const user = userEvent.setup();
    render(<Table />);

    await user.click(screen.getByRole("button", { name: /name/i }));
    expect(API.sorting).toHaveBeenCalledWith("name", "ASC");

    await user.click(screen.getByRole("button", { name: /name/i }));
    expect(API.sorting).toHaveBeenCalledWith("name", "DSC");
  })

  test("updates search state when input changes", async () => {
    const user = userEvent.setup();
    render(<Table />);

    const input = screen.getByPlaceholderText("Search here");
    await user.type(input, "test");
    
    expect(input).toHaveValue("test");
  })
})