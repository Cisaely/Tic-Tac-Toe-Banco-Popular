//Panel 1.

// Elementos DOM del panel de carga
let elementoBarraProgreso = null;        // Barra de progreso naranja
let elementoPanelLoading = null;         // Panel completo de loading

let progresoActual = 0;                  // Porcentaje actual de carga (0-100)
let intervaloProgreso = null;            // id setInterval


 // Se ejecuta cuando el DOM está cargado

document.addEventListener('DOMContentLoaded', function() {
    inicializarPanelLoading();
});

 // inicia el panel de carga y comienza la animacion
 
function inicializarPanelLoading() {
    elementoBarraProgreso = document.getElementById('progressBar');
    elementoPanelLoading = document.getElementById('panelLoading');
    iniciarAnimacionCarga();
}


 //Inicia la animación de la barra de progreso
 
function iniciarAnimacionCarga() {
    progresoActual = 0;
    
    
    intervaloProgreso = setInterval(function() { // Crear intervalo para actualizar la barra
        actualizarBarraProgreso();
    }, 200); // Actualiza cada 200 milisegundos
}

 // Actuar el progreso de la barra de carga
 
function actualizarBarraProgreso() {
    progresoActual += Math.random() * 15;
    
    if (progresoActual >= 100) {  // Si ya llegoal 100%
        finalizarCarga();
    } else {
        elementoBarraProgreso.style.width = progresoActual + '%';// Actualiza ancho de la barra
    }
}

//Finaliza la animación de carga y prepara la transición
 
function finalizarCarga() {
    progresoActual = 100;
    elementoBarraProgreso.style.width = '100%';
    clearInterval(intervaloProgreso);// Detener el intervalo
    setTimeout(function() { //espera un momento para seguir
        transicionarAlSiguientePanel();
    }, 500);
}


//PANEL 2.

// FUNCIONES GENERALES DE NAVEGACIÓN (Se usarán para todos los paneles)

/**
 * Oculta un panel específico
 * @param {string} idPanel - ID del panel a ocultar
 */
function ocultarPanel(idPanel) {
    let panel = document.getElementById(idPanel);
    if (panel) {
        panel.classList.add('hidden');
        panel.classList.remove('show');
    }
}

/**
 * Muestra un panel específico
 * @param {string} idPanel - ID del panel a mostrar
 */
function mostrarPanel(idPanel) {
    let panel = document.getElementById(idPanel);
    if (panel) {
        panel.classList.remove('hidden');
        panel.classList.add('show');
    }
}

//Panel 2.
let modoJuegoSeleccionado = null; // 'cpu' o 'jugador'

/* Transición del Panel 1 al Panel 2 */
function transicionarAlSiguientePanel() {
    console.log('Transicionando al Panel 2: Selección de modo');
    ocultarPanel('panelLoading');
    mostrarPanel('panelSeleccionModo');
    inicializarPanelSeleccionModo();
}

//Inicializa los eventos del Panel 2 
function inicializarPanelSeleccionModo() {
    let botonCPU = document.getElementById('botonVsCPU');
    let botonJugador = document.getElementById('botonVsJugador');
    
    // Event listeners para los botones
    botonCPU.addEventListener('click', function() {
        seleccionarModoJuego('cpu');
    });
    
    botonJugador.addEventListener('click', function() {
        seleccionarModoJuego('jugador');
    });
}

/**
Maneja la selección del modo de juego
 * @param {string} modo - 'cpu' o 'jugador'
 */
function seleccionarModoJuego(modo) {
    modoJuegoSeleccionado = modo;
    console.log('Modo seleccionado:', modo);
    
    transicionarAPanelNombres();
}

// PANEL 3: (Preparado para la siguiente parte)


function transicionarAPanelNombres() {
    console.log('Panel 3: Ingreso de nombres');
    ocultarPanel('panelSeleccionModo');
    mostrarPanel('panelNombres');
}

//PANEL 3 Y 4
let nombreJugador1 = '';
let nombreJugador2 = '';
let nombreJugadorCPU = '';

//Transición al panel de nombres según el modo seleccionado
 
function transicionarAPanelNombres() {
    console.log('Transicionando al panel de nombres. Modo:', modoJuegoSeleccionado);
    
    ocultarPanel('panelSeleccionModo');
    
    if (modoJuegoSeleccionado === 'jugador') {
        // Mostrar Panel 3: Dos jugadores
        mostrarPanel('panelNombresJugadores');
        inicializarPanelNombresJugadores();
    } else if (modoJuegoSeleccionado === 'cpu') {
        // Mostrar Panel 4: Un jugador vs CPU
        mostrarPanel('panelNombreCPU');
        inicializarPanelNombreCPU();
    }
}

// Iniciar el Panel 3 (Jugador vs Jugador)

function inicializarPanelNombresJugadores() {
    let inputJugador1 = document.getElementById('inputJugador1');
    let inputJugador2 = document.getElementById('inputJugador2');
    let botonIniciar = document.getElementById('botonIniciarJugadores');
    
    // Limpiar campos
    inputJugador1.value = '';
    inputJugador2.value = '';
    botonIniciar.disabled = true;
    
    // Validar que ambos campos tengan texto
    function validarCampos() {
        if (inputJugador1.value.trim() !== '' && inputJugador2.value.trim() !== '') {
            botonIniciar.disabled = false;
        } else {
            botonIniciar.disabled = true;
        }
    }
    
    inputJugador1.addEventListener('input', validarCampos);
    inputJugador2.addEventListener('input', validarCampos);
    
    // Evento del botón iniciar
    botonIniciar.addEventListener('click', function() {
        nombreJugador1 = inputJugador1.value.trim();
        nombreJugador2 = inputJugador2.value.trim();
        
        console.log('Jugador 1:', nombreJugador1);
        console.log('Jugador 2:', nombreJugador2);
        
        iniciarJuego();
    });
}

//Iniciar el Panel 4 (Jugador vs CPU)
 
function inicializarPanelNombreCPU() {
    let inputJugador = document.getElementById('inputJugadorSolo');
    let botonIniciar = document.getElementById('botonIniciarCPU');
    
    // Limpiar campo
    inputJugador.value = '';
    botonIniciar.disabled = true;
    
    // Validar que el campo tenga texto
    inputJugador.addEventListener('input', function() {
        if (inputJugador.value.trim() !== '') {
            botonIniciar.disabled = false;
        } else {
            botonIniciar.disabled = true;
        }
    });
    
    // Evento del botón iniciar
    botonIniciar.addEventListener('click', function() {
        nombreJugadorCPU = inputJugador.value.trim();
        
        console.log('Jugador:', nombreJugadorCPU);
        console.log('Oponente: CPU');
        
        iniciarJuego();
    });
}


 //Inicia el juego
 
function iniciarJuego() {
    console.log('Iniciando juego...');
    console.log('Modo:', modoJuegoSeleccionado);
    
    if (modoJuegoSeleccionado === 'jugador') {
        console.log('Jugadores:', nombreJugador1, 'vs', nombreJugador2);
    } else {
        console.log('Jugador:', nombreJugadorCPU, 'vs CPU');
    }
    
    // Aquí irá la transición al Panel 5 (Tablero de juego)
    console.log('dar inicio al juego');
    ocultarPanel(modoJuegoSeleccionado === 'jugador' ? 'panelNombresJugadores' : 'panelNombreCPU');
    mostrarPanel('panelJuego');
}

// PANEL 5: TABLERO DE JUEGO

let tableroEstado = ['', '', '', '', '', '', '', '', ''];
let turnoActual = 'X'; // X siempre empieza
let juegoActivo = true;
let contadorGanadasJ1 = 0;
let contadorGanadasJ2 = 0;
let contadorEmpates = 0;

//Actualizar la función iniciarJuego para ir al Panel 5
function iniciarJuego() {
    console.log('Iniciando juego...');
    console.log('Modo:', modoJuegoSeleccionado);
    
    if (modoJuegoSeleccionado === 'jugador') {
        console.log('Jugadores:', nombreJugador1, 'vs', nombreJugador2);
        ocultarPanel('panelNombresJugadores');
    } else {
        console.log('Jugador:', nombreJugadorCPU, 'vs CPU');
        ocultarPanel('panelNombreCPU');
    }
    
    mostrarPanel('panelJuego');
    inicializarPanelJuego();
}

//Inicializa el Panel 5 (Tablero de juego)
function inicializarPanelJuego() {
    // Configurar nombres e iniciales
    if (modoJuegoSeleccionado === 'jugador') {
        document.getElementById('nombreJugador1Header').textContent = nombreJugador1;
        document.getElementById('nombreJugador2Header').textContent = nombreJugador2;
        document.getElementById('inicialesJugador1').textContent = obtenerIniciales(nombreJugador1);
        document.getElementById('inicialesJugador2').textContent = obtenerIniciales(nombreJugador2);
        document.getElementById('inicialesMarcador1').textContent = obtenerIniciales(nombreJugador1);
        document.getElementById('inicialesMarcador2').textContent = obtenerIniciales(nombreJugador2);
    } else {
        document.getElementById('nombreJugador1Header').textContent = nombreJugadorCPU;
        document.getElementById('nombreJugador2Header').textContent = 'CPU';
        document.getElementById('inicialesJugador1').textContent = obtenerIniciales(nombreJugadorCPU);
        document.getElementById('inicialesJugador2').textContent = 'CPU';
        document.getElementById('inicialesMarcador1').textContent = obtenerIniciales(nombreJugadorCPU);
        document.getElementById('inicialesMarcador2').textContent = 'CPU';
    }
    
    // Event listeners para el tablero
    let casillas = document.querySelectorAll('.casillaJuego');
    casillas.forEach(function(casilla) {
        casilla.addEventListener('click', manejarClickCasilla);
    });
    
    // Event listeners para botones
    document.getElementById('botonVolver').addEventListener('click', volverAlMenu);
    document.getElementById('botonReinicio').addEventListener('click', reiniciarJuego);
    
    // Resetear tablero
    resetearTablero();
}

//Obtiene las iniciales de un nombre

function obtenerIniciales(nombre) {
    let palabras = nombre.trim().split(' ');
    if (palabras.length >= 2) {
        return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
}

//Maneja el click en una casilla
function manejarClickCasilla(evento) {
    let casilla = evento.target;
    let index = parseInt(casilla.getAttribute('data-index'));
    
    // Verificar si la casilla está ocupada o el juego está inactivo
    if (tableroEstado[index] !== '' || !juegoActivo) {
        return;
    }
    
    // Colocar ficha
    colocarFicha(casilla, index);
    
    // Verificar ganador o empate
    verificarResultado();
    
    // Si es vs CPU y el juego sigue activo, que la CPU juegue
    if (modoJuegoSeleccionado === 'cpu' && juegoActivo && turnoActual === 'O') {
        setTimeout(jugadaCPU, 500);
    }
}

//Coloca una ficha en el tablero
 
function colocarFicha(casilla, index) {
    tableroEstado[index] = turnoActual;
    casilla.textContent = turnoActual;
    casilla.classList.add(turnoActual.toLowerCase());
    casilla.classList.add('ocupada');
    casilla.classList.add('animacion');
    
    // Cambiar turno
    turnoActual = turnoActual === 'X' ? 'O' : 'X';
}

//Jugada de la CPU (simple: busca casilla vacía aleatoria)
 
function jugadaCPU() {
    let casillasVacias = [];
    
    for (let i = 0; i < tableroEstado.length; i++) {
        if (tableroEstado[i] === '') {
            casillasVacias.push(i);
        }
    }
    
    if (casillasVacias.length > 0) {
        let indexAleatorio = casillasVacias[Math.floor(Math.random() * casillasVacias.length)];
        let casilla = document.querySelector('[data-index="' + indexAleatorio + '"]');
        colocarFicha(casilla, indexAleatorio);
        verificarResultado();
    }
}

//Verifica si hay ganador o empate
 
function verificarResultado() {
    let combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]              // Diagonales
    ];
    
    let hayGanador = false;
    
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let combo = combinacionesGanadoras[i];
        let a = tableroEstado[combo[0]];
        let b = tableroEstado[combo[1]];
        let c = tableroEstado[combo[2]];
        
        if (a !== '' && a === b && b === c) {
            hayGanador = true;
            marcarCasillasGanadoras(combo);
            mostrarGanador(a);
            break;
        }
    }
    
    if (!hayGanador && !tableroEstado.includes('')) {
        mostrarEmpate();
    }
}

//Marca las casillas ganadoras
 
function marcarCasillasGanadoras(combo) {
    combo.forEach(function(index) {
        let casilla = document.querySelector('[data-index="' + index + '"]');
        casilla.classList.add('ganadora');
    });
}

// Muestra el ganador

function mostrarGanador(ficha) {
    juegoActivo = false;
    
    setTimeout(function() {
        if (ficha === 'X') {
            contadorGanadasJ1++;
            document.getElementById('ganadasJugador1').textContent = contadorGanadasJ1 + ' GANADAS';
            let nombreGanador = modoJuegoSeleccionado === 'jugador' ? nombreJugador1 : nombreJugadorCPU;
            alert('¡' + nombreGanador + ' GANA!');
        } else {
            contadorGanadasJ2++;
            document.getElementById('ganadasJugador2').textContent = contadorGanadasJ2 + ' GANADAS';
            let nombreGanador = modoJuegoSeleccionado === 'jugador' ? nombreJugador2 : 'CPU';
            alert('¡' + nombreGanador + ' GANA!');
        }
        
        resetearTablero();
    }, 1000);
}

/**
 * Muestra empate
 */
function mostrarEmpate() {
    juegoActivo = false;
    
    setTimeout(function() {
        contadorEmpates++;
        document.getElementById('empates').textContent = contadorEmpates + ' EMPATES';
        alert('¡EMPATE!');
        resetearTablero();
    }, 500);
}

/**
 * Resetea el tablero para una nueva partida
 */
function resetearTablero() {
    tableroEstado = ['', '', '', '', '', '', '', '', ''];
    turnoActual = 'X';
    juegoActivo = true;
    
    let casillas = document.querySelectorAll('.casillaJuego');
    casillas.forEach(function(casilla) {
        casilla.textContent = '';
        casilla.classList.remove('x', 'o', 'ocupada', 'ganadora', 'animacion');
    });
}

//Reinicia completamente el juego (puntuaciones a 0)
function reiniciarJuego() {
    if (confirm('¿Reiniciar el juego? Se perderán las puntuaciones.')) {
        contadorGanadasJ1 = 0;
        contadorGanadasJ2 = 0;
        contadorEmpates = 0;
        
        document.getElementById('ganadasJugador1').textContent = '0 GANADAS';
        document.getElementById('ganadasJugador2').textContent = '0 GANADAS';
        document.getElementById('empates').textContent = '0 EMPATES';
        
        resetearTablero();
    }
}

//Vuelve al menú principal
 
function volverAlMenu() {
    if (confirm('¿Volver al menú? Se perderá el progreso actual.')) {
        ocultarPanel('panelJuego');
        mostrarPanel('panelSeleccionModo');
        
        // Resetear contadores
        contadorGanadasJ1 = 0;
        contadorGanadasJ2 = 0;
        contadorEmpates = 0;
    }
}


// Función para mostrar el modal de victoria/derrota
function mostrarGanador(ficha) {
    juegoActivo = false;
    
    setTimeout(function() {
        if (ficha === 'X') {
            contadorGanadasJ1++;
            document.getElementById('ganadasJugador1').textContent = contadorGanadasJ1 + ' GANADAS';
            let nombreGanador = modoJuegoSeleccionado === 'jugador' ? nombreJugador1 : nombreJugadorCPU;
            
            // Mostrar modal de victoria
            if (modoJuegoSeleccionado === 'jugador') {
                mostrarModalVictoria(nombreGanador);
            } else {
                // Jugador vs CPU: el jugador gana
                mostrarModalVictoria(nombreGanador);
            }
        } else {
            contadorGanadasJ2++;
            document.getElementById('ganadasJugador2').textContent = contadorGanadasJ2 + ' GANADAS';
            let nombreGanador = modoJuegoSeleccionado === 'jugador' ? nombreJugador2 : 'CPU';
            
            // Mostrar modal apropiado
            if (modoJuegoSeleccionado === 'jugador') {
                mostrarModalVictoria(nombreGanador);
            } else {
                // Jugador vs CPU: la CPU gana (jugador pierde)
                mostrarModalDerrota(nombreJugadorCPU);
            }
        }
    }, 1000);
}

// Mostrar modal de victoria
function mostrarModalVictoria(nombreGanador) {
    document.getElementById('nombreGanadorModal').textContent = nombreGanador;
    
    // Actualizar iniciales y marcador
    if (modoJuegoSeleccionado === 'jugador') {
        document.getElementById('inicialesModalV1').textContent = obtenerIniciales(nombreJugador1);
        document.getElementById('inicialesModalV2').textContent = obtenerIniciales(nombreJugador2);
    } else {
        document.getElementById('inicialesModalV1').textContent = obtenerIniciales(nombreJugadorCPU);
        document.getElementById('inicialesModalV2').textContent = 'CPU';
    }
    
    document.getElementById('ganadasModalV1').textContent = contadorGanadasJ1 + ' GANADAS';
    document.getElementById('ganadasModalV2').textContent = contadorGanadasJ2 + ' GANADAS';
    document.getElementById('empatesModalV').textContent = contadorEmpates + ' EMPATES';
    
    // Mostrar modal y overlay
    mostrarPanel('overlayModal');
    mostrarPanel('modalVictoria');
    
    // Event listeners para botones
    let botonSalir = document.getElementById('botonSalirVictoria');
    let botonProximo = document.getElementById('botonProximoRound');
    
    let nuevoBotonSalir = botonSalir.cloneNode(true);
    let nuevoBotonProximo = botonProximo.cloneNode(true);
    botonSalir.parentNode.replaceChild(nuevoBotonSalir, botonSalir);
    botonProximo.parentNode.replaceChild(nuevoBotonProximo, botonProximo);
    
    nuevoBotonSalir.addEventListener('click', function() {
        cerrarModalYVolverMenu();
    });
    
    nuevoBotonProximo.addEventListener('click', function() {
        cerrarModalYContinuar();
    });
}

// Mostrar modal de derrota
function mostrarModalDerrota(nombrePerdedor) {
    document.getElementById('nombrePerdedorModal').textContent = nombrePerdedor;
    
    // Actualizar iniciales y marcador
    document.getElementById('inicialesModalD1').textContent = obtenerIniciales(nombreJugadorCPU);
    document.getElementById('inicialesModalD2').textContent = 'CPU';
    
    document.getElementById('ganadasModalD1').textContent = contadorGanadasJ1 + ' GANADAS';
    document.getElementById('ganadasModalD2').textContent = contadorGanadasJ2 + ' GANADAS';
    document.getElementById('empatesModalD').textContent = contadorEmpates + ' EMPATES';
    
    // Mostrar modal y overlay
    mostrarPanel('overlayModal');
    mostrarPanel('modalDerrota');
    
    // Event listeners para botones
    let botonSalir = document.getElementById('botonSalirDerrota');
    let botonProximo = document.getElementById('botonProximoRoundDerrota');
    
    let nuevoBotonSalir = botonSalir.cloneNode(true);
    let nuevoBotonProximo = botonProximo.cloneNode(true);
    botonSalir.parentNode.replaceChild(nuevoBotonSalir, botonSalir);
    botonProximo.parentNode.replaceChild(nuevoBotonProximo, botonProximo);
    
    nuevoBotonSalir.addEventListener('click', function() {
        cerrarModalYVolverMenu();
    });
    
    nuevoBotonProximo.addEventListener('click', function() {
        cerrarModalYContinuar();
    });
}

// Mostrar empate (sin modal especial, solo continuar)
function mostrarEmpate() {
    juegoActivo = false;
    setTimeout(function() {
        contadorEmpates++;
        document.getElementById('empates').textContent = contadorEmpates + ' EMPATES';
        alert('¡EMPATE!');
        resetearTablero();
    }, 500);
}

// Cerrar modal y volver al menú
function cerrarModalYVolverMenu() {
    ocultarPanel('overlayModal');
    ocultarPanel('modalVictoria');
    ocultarPanel('modalDerrota');
    ocultarPanel('panelJuego');
    mostrarPanel('panelSeleccionModo');
    
    // Resetear contadores
    contadorGanadasJ1 = 0;
    contadorGanadasJ2 = 0;
    contadorEmpates = 0;
}

// Cerrar modal y continuar jugando
function cerrarModalYContinuar() {
    ocultarPanel('overlayModal');
    ocultarPanel('modalVictoria');
    ocultarPanel('modalDerrota');
    resetearTablero();
}

// Actualizar función reiniciarJuego para mostrar modal de confirmación
function reiniciarJuego() {
    mostrarPanel('overlayModal');
    mostrarPanel('modalReinicio');
    
    let botonCancelar = document.getElementById('botonCancelarReinicio');
    let botonConfirmar = document.getElementById('botonConfirmarReinicio');
    
    let nuevoBotonCancelar = botonCancelar.cloneNode(true);
    let nuevoBotonConfirmar = botonConfirmar.cloneNode(true);
    botonCancelar.parentNode.replaceChild(nuevoBotonCancelar, botonCancelar);
    botonConfirmar.parentNode.replaceChild(nuevoBotonConfirmar, botonConfirmar);
    
    nuevoBotonCancelar.addEventListener('click', function() {
        ocultarPanel('overlayModal');
        ocultarPanel('modalReinicio');
    });
    
    nuevoBotonConfirmar.addEventListener('click', function() {
        ocultarPanel('overlayModal');
        ocultarPanel('modalReinicio');
        
        contadorGanadasJ1 = 0;
        contadorGanadasJ2 = 0;
        contadorEmpates = 0;
        document.getElementById('ganadasJugador1').textContent = '0 GANADAS';
        document.getElementById('ganadasJugador2').textContent = '0 GANADAS';
        document.getElementById('empates').textContent = '0 EMPATES';
        resetearTablero();
    });
}