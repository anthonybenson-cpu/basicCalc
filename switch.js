// Variables to store numbers and operator
let firstNumber = '';
let operation = '';
let secondNumber = '';

// Reference to the calculator screen (make sure your HTML has an element with id="screen")
const screen = document.getElementById('screen');

// Update the screen display
function updateScreen() {
  screen.textContent = firstNumber + operation + secondNumber;
}

// Handle number button presses
function numberPressed(number) {
  if (!operation) {
    firstNumber += number;
  } else {
    secondNumber += number;
  }
  updateScreen();
}

// Handle operation button presses (+, -, *, /)
function operationPressed(op) {
  if (firstNumber === '') return; // Do nothing if no number entered yet

  if (operation && secondNumber) {
    calcResult(); // If already have an operation and second number, calculate first
    operation = op; // Then update with new operation
  } else if (!operation) {
    operation = op;
  }

  updateScreen();
}

// Calculate and display result
function calcResult() {
  if (firstNumber === '' || operation === '' || secondNumber === '') return;

  let result;

  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  switch (operation) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': 
      if (num2 === 0) {
        result = 'Error';
        break;
      }
      result = num1 / num2; 
      break;
  }

  firstNumber = result.toString();
  operation = '';
  secondNumber = '';
  updateScreen();
}

// Handle dot (.) button
function dotPressed() {
  if (!operation && !firstNumber.includes('.')) {
    firstNumber += '.';
  } else if (operation && !secondNumber.includes('.')) {
    secondNumber += '.';
  }
  updateScreen();
}

// Clear all input
function clearScreen() {
  firstNumber = '';
  operation = '';
  secondNumber = '';
  updateScreen();
}
