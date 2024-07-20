// script.js
document.addEventListener("DOMContentLoaded", function () {
  const displayOperation = document.getElementById("operation");
  const displayResult = document.getElementById("result");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "";
  let operator = "";
  let previousInput = "";
  let operationString = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-value");

      if (value === "C") {
        currentInput = "";
        previousInput = "";
        operator = "";
        operationString = "";
        displayOperation.textContent = "0";
        displayResult.textContent = "0";
        return;
      }

      if (value === "=") {
        if (currentInput !== "" && previousInput !== "" && operator !== "") {
          const result = calculate(previousInput, currentInput, operator);
          operationString += ` ${currentInput} =`;
          displayOperation.textContent = operationString;
          displayResult.textContent = result;
          currentInput = result;
          previousInput = "";
          operator = "";
          operationString = "";
        }
        return;
      }

      if (this.classList.contains("operator")) {
        if (currentInput !== "") {
          if (operator === "") {
            operator = value;
            previousInput = currentInput;
            currentInput = "";
            operationString += ` ${previousInput} ${operator}`;
          } else {
            const result = calculate(previousInput, currentInput, operator);
            operationString += ` ${currentInput}`;
            previousInput = result;
            currentInput = "";
            operator = value;
            displayResult.textContent = result;
            operationString += ` ${operator}`;
          }
        }
        displayOperation.textContent = operationString;
        return;
      }

      if (currentInput.length < 16) {
        currentInput += value;
        displayResult.textContent = currentInput;
      }
    });
  });

  function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") {
      if (b === 0) {
        alert("Division par zéro !");
        return 0;
      }
      return a / b;
    }
    return 0;
  }
});
