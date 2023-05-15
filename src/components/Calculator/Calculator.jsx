import React, { useState } from "react"
import { Button } from "../Button/Button"

import style from "./Calculator.module.css"

export const Calculator = ({ children }) => {
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "←"]
    const [inputValue, setInputValue] = useState("0")
    const [previousValue, setPreviousValue] = useState(null)
    const [operator, setOperator] = useState(null)

    const handleDisplay = (value) => {
        switch (value) {
            case "AC":
                setInputValue("0")
                setPreviousValue(null)
                setOperator(null)
                break
            case "±":
                setInputValue(
                    (inputValue) =>
                        // inputValue.startsWith("-")
                        //     ? inputValue.slice(1)
                        //     : "-" + inputValue)
                        inputValue * -1
                )
                break
            case "%":
                setInputValue((inputValue) =>
                    (parseFloat(inputValue) / 100).toString()
                )
                break
            case ".":
                if (!inputValue.includes(".")) {
                    setInputValue((inputValue) => inputValue + ".")
                }
                break
            case "÷":
            case "x":
            case "-":
            case "+":
                setOperator(value)
                setPreviousValue(inputValue)
                setInputValue("0")
                break
            case "←":
                setInputValue((e) => (
                    e.length === 1
                        ? "0"
                        : 
                        e.slice(0, -1))
                    
                )
                break

            case "=":
                if (operator && previousValue && inputValue) {
                    let result
                    switch (operator) {
                        case "/":
                            result =
                                parseFloat(previousValue) /
                                parseFloat(inputValue)
                            break
                        case "x":
                            result =
                                parseFloat(previousValue) *
                                parseFloat(inputValue)
                            break
                        case "-":
                            result =
                                parseFloat(previousValue) -
                                parseFloat(inputValue)
                            result = result < 0 ? "ERROR" : result
                            break
                        case "+":
                            result =
                                parseFloat(previousValue) +
                                parseFloat(inputValue)
                            break
                        default:
                            break
                    }
                    const resultString = result.toString()
                    if (resultString.length > 9) {
                        setInputValue("ERROR")
                    } else {
                        setInputValue(resultString)
                    }
                    setPreviousValue(null)
                    setOperator(null)
                }
                break
            default:
                if (inputValue.length > 8) {
                    return
                }
                setInputValue(inputValue === "0" ? value : inputValue + value.toString())
                break
        }
    }

    return (
        <div className={style.Calculator}>
            <div className={style.Display} data-testid="display">
                {inputValue}
            </div>

            <div className={style.Top}>
                <Button
                    name="AC"
                    value={"AC"}
                    backgroundColor={"AC"}
                    setSelected={() => handleDisplay("AC")}
                />
                <Button
                    name="x"
                    value={"multiply"}
                    backgroundColor={"operator"}
                    setSelected={() => handleDisplay("x")}
                />
                <Button
                    name="÷"
                    value={"divide"}
                    backgroundColor={"operator"}
                    setSelected={() => handleDisplay("/")}
                />
                <Button
                    name="±"
                    value={"±"}
                    backgroundColor={"operator"}
                    setSelected={() => handleDisplay("±")}
                />
            </div>

            <div className={style.Bottom}>
                <div className={style.Numbers}>
                    {numbers.map((number) => (
                        <Button
                            name={number}
                            value={number}
                            setSelected={() => handleDisplay(number)}
                        />
                    ))}
                </div>
                <div className={style.Operations}>
                    <Button
                        name="+"
                        value={"add"}
                        backgroundColor={"operator"}
                        setSelected={() => handleDisplay("+")}
                    />

                    <Button
                        name="-"
                        value={"subtract"}
                        backgroundColor={"operator"}
                        setSelected={() => handleDisplay("-")}
                    />
                    <Button
                        name="="
                        value={"equal"}
                        backgroundColor={"equal"}
                        setSelected={() => handleDisplay("=")}
                    />
                </div>
            </div>
        </div>
    )
}
