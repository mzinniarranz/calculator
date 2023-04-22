import React, { useState } from "react";
import "./Calculator.css";

const INITIAL_STATE_OPERATION = Array(4).fill("");

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [firstOperand, setFirstOperand] = useState<number>(0);
  const [operator, setOperator] = useState<string>("");
  const [operation, setOperation] = useState<string[]>(INITIAL_STATE_OPERATION);

  const handleNumberClick = (num: number) => {
    let newDisplayValue;
    if (displayValue === "0") {
      newDisplayValue = num.toString();
    } else {
      newDisplayValue = displayValue + num.toString();
    }

    handleOperationLine(newDisplayValue, "number");
    setDisplayValue(newDisplayValue);
  };

  const handleOperatorClick = (op: string) => {
    handleOperationLine(op, "operator");
    if (operation[1]) return;
    setOperator(op);
    setFirstOperand(parseFloat(displayValue));
    setDisplayValue("0");
  };

  const handleEqualsClick = () => {
    const secondOperand = parseFloat(displayValue);
    let result;

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "x":
        result = firstOperand * secondOperand;
        break;
      case "/":
        if (secondOperand === 0) {
          result = "Error: Division by zero";
        } else {
          result = firstOperand / secondOperand;
        }
        break;
      default:
        result = "Error: Invalid operator";
        break;
    }
    handleOperationLine("= " + result.toString(), "equals");
    setDisplayValue(result.toString());
    setOperator("");
    setFirstOperand(0);
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setOperator("");
    setFirstOperand(0);
    setOperation(INITIAL_STATE_OPERATION);
  };

  const handleOperationLine = (value: string, action: string) => {
    if (!operation.some((value) => value === "")) return;

    const newOperation = [...operation];

    switch (action) {
      case "number":
        if (newOperation[0]) {
          newOperation[1]
            ? (newOperation[2] = value)
            : (newOperation[0] = value);
        } else {
          newOperation[0] = value;
        }
        setOperation([...newOperation]);
        return;
      case "equals":
        newOperation[3] = value;
        setOperation([...newOperation]);
        return;
      case "operator":
        if (newOperation[1]) return;
        newOperation[1] = value;
        setOperation([...newOperation]);
        return;
    }
  };

  return (
    <div className="calculator-container">
      <div className="displayValues">{operation.join(" ")}</div>
      <div className="button-box">
        <button className="button" onClick={() => handleNumberClick(7)}>
          7
        </button>
        <button className="button" onClick={() => handleNumberClick(8)}>
          8
        </button>
        <button className="button" onClick={() => handleNumberClick(9)}>
          9
        </button>
        <button
          className="button operators"
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>
        <br />
        <button className="button" onClick={() => handleNumberClick(4)}>
          4
        </button>
        <button className="button" onClick={() => handleNumberClick(5)}>
          5
        </button>
        <button className="button" onClick={() => handleNumberClick(6)}>
          6
        </button>
        <button
          className="button operators"
          onClick={() => handleOperatorClick("x")}
        >
          x
        </button>
        <br />
        <button className="button" onClick={() => handleNumberClick(1)}>
          1
        </button>
        <button className="button" onClick={() => handleNumberClick(2)}>
          2
        </button>
        <button className="button" onClick={() => handleNumberClick(3)}>
          3
        </button>
        <button
          className="button operators"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>
        <br />
        <button className="button" onClick={() => handleNumberClick(0)}>
          0
        </button>
        <button
          className="button operators"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button className="button operators" onClick={handleEqualsClick}>
          =
        </button>
        <button className="button operators" onClick={handleClearClick}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
