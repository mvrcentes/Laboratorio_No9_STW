import React from "react"
import { render, screen } from "@testing-library/react"


import { Button } from "./Button"

describe("Button", () => {
    it("should render correctly", () => {
        const { container } = render(<Button />)
        expect(container).toMatchSnapshot()
    })

    // Tests that the button component renders with all provided props.
    it("test_button_renders_with_all_props", () => {
        render(
            <Button
                name="Test Button"
                value="test"
                setSelected={() => {}}
                backgroundColor="blue"
            />
        )
        expect(screen.getByText("Test Button")).toBeInTheDocument()
        expect(screen.getByText("Test Button").getAttribute("value")).toBe(
            "test"
        )
    })

    it("test_on_click_invokes_set_selected", () => {
        const setSelectedMock = jest.fn()
        const wrapper = render(
            <Button
                name="Test Button"
                value="test"
                setSelected={setSelectedMock}
                backgroundColor="blue"
            />
        )
        wrapper.simulate("click")
        expect(setSelectedMock).toHaveBeenCalledWith("test")
    })    
})
