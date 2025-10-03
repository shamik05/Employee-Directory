import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import Banner from "./Banner"

describe("Component Banner", () => {
    test("shows h1 tag", () => {
        render(<Banner />)

        const heading = screen.getByRole("heading", {
            name: "Employee Directory",
            level: 1
        })

        expect(heading).toBeInTheDocument();
    })

    test("shows h2 tag", () => {
        render(<Banner />)

        const subheading = screen.getByRole("heading", {
            name: "Click on table headings to filter or use the search box to narrow your results.",
            level: 2
        })
        
        expect(subheading).toBeInTheDocument();
    })
})