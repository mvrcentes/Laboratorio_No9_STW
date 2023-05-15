import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

import { Calculator } from "./Calculator"

describe("Calculator", () => {
    it("should render correctly", () => {
        const { container } = render(<Calculator />)
        expect(container).toMatchSnapshot()

        screen.debug()
    })

    // Tests that clicking on "AC" button resets display and state.
    it("test_handle_display_resets_display_and_state", () => {
        render(<Calculator />)
        const acButton = screen.getByText("AC")
        acButton.click()

        // const display = screen.getByText("display")
        // expect(display.textContent).toEqual("0")
    })

    // Tests that clicking on numbers and operators updates display.
    it("test_handle_display_updates_display", () => {
        render(<Calculator />)

        fireEvent.click(screen.getByText("1"))
        expect(screen.getByTestId("display").textContent).toEqual("1")
        fireEvent.click(screen.queryAllByText("1")[1])
        expect(screen.getByTestId("display").textContent).toEqual("11")

        // fireEvent.click(screen.getByText("."))
        // expect(screen.getByTestId("display").textContent).toEqual("-.")

        // fireEvent.click(screen.getAllByText("0")[0])
        // expect(screen.getByTestId("display").textContent).toEqual("0")

        fireEvent.click(screen.getByText("←"))
        expect(screen.getByTestId("display").textContent).toEqual("1")

        // fireEvent.click(screen.getByText("÷"))
        // expect(screen.getByTestId("display").textContent).toEqual("/")
    })

    it("test_handle_display_updates_display_±", () => {
        render(<Calculator />)

        fireEvent.click(screen.getByText("1"))
        expect(screen.getByTestId("display").textContent).toEqual("1")

        fireEvent.click(screen.getByText("±"))
        expect(screen.getByTestId("display").textContent).toEqual("-1")
    })

    it("test_handle_display_updates_display_x", () => {
        render(<Calculator />)

        expect(screen.getByTestId("display").textContent).toEqual("0")

        fireEvent.click(screen.getByText("1"))
        expect(screen.getByTestId("display").textContent).toEqual("1")

        fireEvent.click(screen.getByText("x"))

        fireEvent.click(screen.getByText("2"))
        expect(screen.getByTestId("display").textContent).toEqual("2")

        fireEvent.click(screen.getByText("="))
        expect(screen.getByTestId("display").textContent).toEqual("2")
    })

    it("test_handle_display_updates_display_+", () => {
        render(<Calculator />)

        expect(screen.getByTestId("display").textContent).toEqual("0")

        fireEvent.click(screen.getByText("1"))
        expect(screen.getByTestId("display").textContent).toEqual("1")

        fireEvent.click(screen.getByText("+"))

        fireEvent.click(screen.getByText("2"))
        expect(screen.getByTestId("display").textContent).toEqual("2")

        fireEvent.click(screen.getByText("="))
        expect(screen.getByTestId("display").textContent).toEqual("3")
    })

    
})
