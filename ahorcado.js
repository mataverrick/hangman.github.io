// Diccionario de palabras con emojis representativos
var palabras = [
    ["cat", "🐱"], ["bat", "🦇"],
    ["fare", "🎟️"], ["fair", "⚖️"],
    ["buy", "🛒"], ["bye", "👋"],
    ["pear", "🍐"], ["pair", "👯‍♂️"],
    ["hear", "👂"], ["here", "📍"],
    ["night", "🌙"], ["knight", "🏇"],
    ["flower", "🌸"], ["flour", "🍞"],
    ["scene", "🎭"], ["seen", "👀"],
    ["weight", "⚖️"], ["wait", "⏳"],
    ["peace", "☮️"], ["piece", "🧩"]
];

var palabra = "";
var emoji = "";
var oculta = [];
var cont = 6;
var hueco = document.getElementById("palabra");
var intentosRestantes = document.getElementById("intentos");

// Selecciona una palabra al azar
function generaPalabra() {
    let rand = Math.floor(Math.random() * palabras.length);
    palabra = palabras[rand][0].toUpperCase();
    emoji = palabras[rand][1];
}

// Dibuja los guiones para la palabra
function pintarGuiones() {
    oculta = Array(palabra.length).fill("_");
    hueco.innerHTML = oculta.join(" ");
}

// Genera el abecedario de botones
function generaABC() {
    let abecedario = document.getElementById("abcdario");
    abecedario.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        let letra = String.fromCharCode(i);
        abecedario.innerHTML += `<button onclick="intento('${letra}', this)" class="letra">${letra}</button>`;
    }
}

// Maneja los intentos del jugador
function intento(letra, boton) {
    let correcto = false;
    
    // Deshabilita la tecla y cambia el estilo
    boton.disabled = true;
    boton.style.backgroundColor = "gray";
    boton.style.color = "white";
    boton.style.border = "2px solid black";

    // Comprueba si la letra está en la palabra
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            oculta[i] = letra;
            correcto = true;
        }
    }
    
    hueco.innerHTML = oculta.join(" ");

    // Si la letra no estaba en la palabra, reduce intentos
    if (!correcto) {
        cont--;
        intentosRestantes.innerHTML = cont;
        document.getElementById("image" + cont).classList.add("fade-in");
    }

    comprobarFin();
}

// Comprueba si el juego ha terminado
function comprobarFin() {
    if (!oculta.includes("_")) {
        hueco.innerHTML = `${oculta.join(" ")} ${emoji}`; // Agregar el emoji junto a la palabra
        document.getElementById("msg-final").innerHTML = "🎉 ¡Ganaste!";
        document.getElementById("msg-final").classList.add("zoom-in");
        hueco.style.border = "2px dashed red"; // Mantener borde rojo punteado
    } else if (cont === 0) {
        document.getElementById("msg-final").innerHTML = "💀 ¡Perdiste!";
        document.getElementById("msg-final").classList.add("zoom-in");
        hueco.style.border = "2px dashed red"; // Mantener borde rojo punteado
    }
}

// Inicia el juego
function inicio() {
    generaPalabra();
    pintarGuiones();
    generaABC();
    cont = 6;
    intentosRestantes.innerHTML = cont;
    document.getElementById("msg-final").innerHTML = "";
    document.getElementById("msg-final").classList.remove("zoom-in");
    hueco.style.border = "2px solid white"; // Restablecer borde normal

    // Restablecer imágenes
    for (let i = 0; i <= 6; i++) {
        document.getElementById("image" + i).classList.remove("fade-in");
    }
}

window.onload = inicio;
