import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Thead from "./Thead";

const tableHeaders = [
    { label: 'Name', key: "name" },
    { label: 'Phone', key: "phone" },
    { label: 'Email', key: "email" },
    { label: 'DOB', key: "dob" },
]

describe("Component Thead", () => {
    const mockSetSort = jest.fn();
    const mockGetSort = jest.fn();

    beforeEach(() => {
        mockSetSort.mockClear();
        mockGetSort.mockClear();
    })

    test("shows table headers", () => {
        mockGetSort.mockReturnValue("");

        render(
            <table>
                <Thead handleSort={mockSetSort} getDirection={mockGetSort} />
            </table>
        )

        tableHeaders.forEach(({ label }) => {
            expect(screen.getByRole("button", { name: label})).toBeInTheDocument();
        })
    })

    test("checks button functionality", async () => {
        mockSetSort.mockReturnValue("");
        const user = userEvent.setup();

        render(
            <table>
                <Thead handleSort={mockSetSort} getDirection={mockGetSort} />
            </table>
        )

        for (const { label, key } of tableHeaders) {
            await user.click(screen.getByRole("button", { name: label }))
            expect(mockSetSort).toHaveBeenCalledWith(key);
        }            
    })

    test("checks css upon button click", async () => {
        mockGetSort.mockImplementation((col) => {
            if (col === "name") return "asc";
            if (col === "email") return "desc";
            return ""
        });

        render(
            <table>
                <Thead handleSort={mockSetSort} getDirection={mockGetSort} />
            </table>
        )

        const nameBtn = screen.getByRole("button", { name: "Name" });
        const emailBtn = screen.getByRole("button", { name: "Email" });
        const phoneBtn = screen.getByRole("button", { name: "Phone" });

        expect(nameBtn).toHaveClass("asc");
        expect(emailBtn).toHaveClass("desc");
        expect(phoneBtn).not.toHaveClass("asc");
        expect(phoneBtn).not.toHaveClass("desc");
    })

    test("check table structure", () => {
        mockGetSort.mockReturnValue("");

        render(
            <table>
                <Thead handleSort={mockSetSort} getDirection={mockGetSort} />
            </table>
        );

        expect(screen.getAllByRole("columnheader")).toHaveLength(tableHeaders.length + 1);
    })

    test("check image header", () => {
        mockGetSort.mockReturnValue("");

        render(
            <table>
                <Thead handleSort={mockSetSort} getDirection={mockGetSort} />
            </table>
        )

        const imgHeader = screen.getAllByRole("columnheader").find(header => header.textContent === "");
        expect(imgHeader).toBeInTheDocument();
    })
})