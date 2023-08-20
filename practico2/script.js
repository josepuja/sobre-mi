// Arreglo de opciones del juego
const opciones = ["piedra", "papel", "tijeras"];

// Selección de elementos del DOM
const botonesOpciones = document.querySelectorAll(".opcion");
const inputNombreJugador = document.getElementById("nombre-jugador");
const resultadoDisplay = document.getElementById("resultado");
const marcadorJugador = document.getElementById("marcador-jugador");
const marcadorComputadora = document.getElementById("marcador-computadora");
const maxVictorias = 3; // Número máximo de victorias para ganar el juego

let puntajeJugador = 0;
let puntajeComputadora = 0;
let intentos = 0;

// Función para jugar una ronda
function jugarRonda() {
  // Validar el nombre del jugador
  const nombreJugador = inputNombreJugador.value.trim();
  if (nombreJugador === "") {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  // Verificar si el juego aún no ha terminado
  if (puntajeJugador < maxVictorias && puntajeComputadora < maxVictorias) {
    const eleccionJugador = this.id;
    const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];

    mostrarSeleccion(this, eleccionJugador); // Mostrar la selección del jugador

    setTimeout(() => {
      mostrarSeleccionAleatoria(eleccionComputadora); // Mostrar la selección aleatoria de la computadora
      const resultado = determinarGanador(eleccionJugador, eleccionComputadora);
      actualizarMarcador(resultado);
      mostrarResultado(resultado, nombreJugador, eleccionJugador, eleccionComputadora);

      // Verificar si alguien ha ganado
      if (puntajeJugador === maxVictorias || puntajeComputadora === maxVictorias) {
        finalizarJuego();
      }
    }, 1000); // Retardo para simular la elección de la computadora
  }
}

// Función para mostrar la selección del jugador y aplicar efectos visuales
function mostrarSeleccion(elemento, eleccion) {
  botonesOpciones.forEach(boton => boton.classList.remove("seleccionada"));
  elemento.classList.add("seleccionada");
}

// Función para mostrar la selección aleatoria de la computadora
function mostrarSeleccionAleatoria(eleccion) {
  const seleccionAleatoria = document.getElementById(eleccion);
  botonesOpciones.forEach(boton => boton.classList.remove("seleccionada"));
  seleccionAleatoria.classList.add("seleccionada");
}

// Función para determinar al ganador de una ronda
function determinarGanador(eleccionJugador, eleccionComputadora) {
  if (eleccionJugador === eleccionComputadora) {
    return "Empate";
  } else if (
    (eleccionJugador === "piedra" && eleccionComputadora === "tijeras") ||
    (eleccionJugador === "papel" && eleccionComputadora === "piedra") ||
    (eleccionJugador === "tijeras" && eleccionComputadora === "papel")
  ) {
    puntajeJugador++; // El jugador gana la ronda
    return "¡Ganaste!";
  } else {
    puntajeComputadora++; // La computadora gana la ronda
    return "¡Perdiste!";
  }
}

// Función para actualizar el marcador
function actualizarMarcador(resultado) {
  marcadorJugador.textContent = puntajeJugador;
  marcadorComputadora.textContent = puntajeComputadora;
}

// Función para mostrar el resultado de una ronda
function mostrarResultado(resultado, nombreJugador, eleccionJugador, eleccionComputadora) {
  resultadoDisplay.innerHTML = `${nombreJugador}: ${eleccionJugador} vs PC: ${eleccionComputadora} - ${resultado}`;
}

// Función para finalizar el juego
function finalizarJuego() {
  // Deshabilitar los botones para detener el juego
  botonesOpciones.forEach(boton => {
    boton.removeEventListener("click", jugarRonda);
    boton.disabled = true;
  });

  let mensajeGanador = "";
  if (puntajeJugador === maxVictorias) {
    mensajeGanador = `¡${inputNombreJugador.value.trim()} ha ganado el juego!`;
  } else if (puntajeComputadora === maxVictorias) {
    mensajeGanador = `¡La computadora ha ganado el juego!`;
  } else {
    mensajeGanador = `El juego ha terminado en empate.`;
  }

  resultadoDisplay.innerHTML = mensajeGanador;
  document.getElementById("ganador").textContent = mensajeGanador;
  document.getElementById("reiniciar").style.display = "block"; // Mostrar botón de reinicio
}

// Función para reiniciar el juego
function reiniciarJuego() {
  // Habilitar los botones y restablecer marcadores
  botonesOpciones.forEach(boton => {
    boton.addEventListener("click", jugarRonda);
    boton.disabled = false;
  });

  puntajeJugador = 0;
  puntajeComputadora = 0;
  intentos = 0;

  marcadorJugador.textContent = puntajeJugador;
  marcadorComputadora.textContent = puntajeComputadora;

  resultadoDisplay.textContent = "";
  document.getElementById("ganador").textContent = "";
  document.getElementById("reiniciar").style.display = "none"; // Ocultar botón de reinicio
}

// Asignar eventos de click a los botones para iniciar el juego
botonesOpciones.forEach(boton => {
  boton.addEventListener("click", jugarRonda);
});
