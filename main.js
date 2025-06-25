let firstNumber = '';
let operation = '';
let secondNumber = '';

const screen = document.querySelector('#screen');

// Updates the display
function updateScreen() {
  screen.textContent = firstNumber + operation + secondNumber;
}

// Handles number input
function numberPressed(num) {
  if (operation === '') {
    firstNumber += num;
  } else {
    secondNumber += num;
  }
  updateScreen();
}

// Handles operation button press
function operationPressed(op) {
  if (firstNumber === '') return; // prevent starting with operator

  if (firstNumber && operation && secondNumber) {
    calcResult(); // calculate first
    operation = op; // set new operation
    return;
  }

  operation = op;
  updateScreen();
}

// Performs calculation
function calcResult() {
  if (firstNumber === '' || operation === '' || secondNumber === '') return;

  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);
  let result = 0;

  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        screen.textContent = 'Error';
        return;
      }
      result = num1 / num2;
      break;
  }

  firstNumber = result.toString();
  operation = '';
  secondNumber = '';
  updateScreen();
}

// Clears everything
function clearScreen() {
  firstNumber = '';
  operation = '';
  secondNumber = '';
  updateScreen();
}

// Add decimal point
function decimalPressed() {
  if (operation === '' && !firstNumber.includes('.')) {
    firstNumber += '.';
  } else if (operation !== '' && !secondNumber.includes('.')) {
    secondNumber += '.';
  }
  updateScreen();
}

// Attach event listeners
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      numberPressed(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
      operationPressed(value);
    } else if (value === '=') {
      calcResult();
    } else if (value === 'C') {
      clearScreen();
    } else if (value === '.') {
      decimalPressed();
    }
  });
});
