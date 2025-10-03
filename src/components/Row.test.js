import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import Row from "./Row";

jest.mock("next/image", () => {
    const MockImage = ({ src, alt, loading, width, height}) => {
        return (
            <img 
                src={src}
                alt={alt}
                loading={loading}
                width={width}
                height={height}
            />
        )
    }
    
    return MockImage
})

describe("Component Row", () => {
    const mockProps = {
        image: "/someImage",
        name: "someGuy",
        phone: "somePhone",
        email: "someEmail",
        dob: "someDob"
    }


    test("shows table row with 5 cells", () => {
        render(
            <table>
                <tbody>
                    <Row {...mockProps} />
                </tbody>
            </table>
        )

        const row = screen.getByRole("row");
        const cells = screen.getAllByRole("cell");
        
        expect(row).toBeInTheDocument();
        expect(cells).toHaveLength(5);
    })

    test("shows 5 cells with correct info", () => {
        render(
            <table>
                <tbody>
                    <Row {...mockProps} />
                </tbody>
            </table>
        )

        const name = screen.getByText("someGuy");
        const phone = screen.getByText("somePhone");
        const email = screen.getByText("someEmail");
        const dob = screen.getByText("someDob");

        expect(name).toBeInTheDocument;
        expect(phone).toBeInTheDocument;
        expect(email).toBeInTheDocument;
        expect(dob).toBeInTheDocument;
    })

    test("shows image", () => {
        render(
            <table>
                <tbody>
                    <Row {...mockProps} />
                </tbody>
            </table>
        )

        const image = screen.getByAltText("Employee thumbnail")
        
        expect(image).toBeInTheDocument;
        expect(image).toHaveAttribute("src", "/someImage");
        expect(image).toHaveAttribute("loading", "lazy");
        expect(image).toHaveAttribute("width", "100");
        expect(image).toHaveAttribute("height", "100");
    })
})