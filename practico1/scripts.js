function validateInput(input) {
  return !isNaN(input) && input.trim() !== "";
}

function calculate() {
  const operation = document.getElementById("operation").value;
  const operand1 = document.getElementById("operand1").value;
  const operand2 = document.getElementById("operand2").value;
  const resultElement = document.getElementById("result");

  if (!validateInput(operand1) || !validateInput(operand2)) {
      resultElement.innerHTML = "Por favor, ingrese números válidos en ambos campos.";
      return;
  }

  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);
  let result;

  switch (operation) {
      case "add":
          result = num1 + num2;
          break;
      case "subtract":
          result = num1 - num2;
          break;
      case "multiply":
          result = num1 * num2;
          break;
      case "divide":
          if (num2 !== 0) {
              result = num1 / num2;
          } else {
              resultElement.innerHTML = "No se puede dividir por cero.";
              return;
          }
          break;
      default:
          resultElement.innerHTML = "Operación no válida.";
          return;
  }

  resultElement.innerHTML = "Resultado: " + result;

  // Mostrar el resultado en la caja result-box
  const resultBox = document.getElementById("result-box");
  resultBox.style.display = "block";
  resultBox.querySelector("#result").innerHTML = "Resultado: " + result;
}

// Establecer los valores de texto a campos vacíos
function clearFields() {
  document.getElementById("operand1").value = "";
  document.getElementById("operand2").value = "";
  document.getElementById("result-box").style.display = "none";
  document.getElementById("result").innerHTML = "";
}

