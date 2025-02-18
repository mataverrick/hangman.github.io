// ### VARIABLES ###

// Array de palabras
var palabras = [
    ["cat", "bat "],
    ["fare", "fair"],     
    ["buy", "bye"],       
    ["pear", "pair"],     
    ["hear", "here"],     
    ["night", "knight"],  
    ["flower", "flour"],  
    ["scene", "seen"],    
    ["weight", "wait"],   
    ["peace", "piece"]    
  ];
  // var palabras = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"], ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"], ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"], ["carrera", "Competición"], ["mermelada", "Confitura"]];
  var palabra = "";
  // Nº aleatorio
  var rand;
  // Palabra oculta
  var oculta = [];
  // Elemento html de la palabra
  var hueco = document.getElementById("palabra");
  // Contador de intentos
  var cont = 6;
  // Botones de letras
  var buttons = document.getElementsByClassName('letra');
  // Boton de reset
  var btnInicio = document.getElementById("reset");
  
  
  // ### FUNCIONES ###
  
  // Escoger palabra al azar
  function generaPalabra() {
    rand = Math.floor(Math.random() *11); ;
    palabra = palabras[rand][0].toUpperCase();
    console.log(palabra);
  }
  
  // Funcion para pintar los guiones de la palabra
  function pintarGuiones(num) {
    oculta = []
    for (var i = 0; i < num; i++) {
      oculta[i] = "_";
    }
    hueco.innerHTML = oculta.join("");
  }
  
  //Generar abecedario
  function generaABC (a,z) {
    document.getElementById("abcdario").innerHTML = "";
    var i = a.charCodeAt(0), j = z.charCodeAt(0);
    var letra = "";
    for( ; i<=j; i++) {
      letra = String.fromCharCode(i).toUpperCase();
      document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    }
  }
  
  // Chequear intento
  function intento(letra) {
    document.getElementById(letra).disabled = true;
    if(palabra.indexOf(letra) != -1) {
      for(var i=0; i<palabra.length; i++) {
        if(palabra[i]==letra) oculta[i] = letra;
      }
      hueco.innerHTML = oculta.join("");
      document.getElementById("acierto").innerHTML = "Excellent!";
      document.getElementById("acierto").className += "acierto verde";
    }else{
      cont--;
      document.getElementById("intentos").innerHTML = cont;
      document.getElementById("acierto").innerHTML = "incorrect!";
      document.getElementById("acierto").className += "acierto rojo";
      document.getElementById("image"+cont).className += "fade-in";
    }
    compruebaFin();
    setTimeout(function () { 
      document.getElementById("acierto").className = ""; 
    }, 800);
  }
  
  // Obtener pista
  function pista() {
    document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
  }
  
  function vaciar(){
    document.getElementById("hueco-pista").innerHTML = '';
  }
  
  // Compruba si ha finalizado
  function compruebaFin() {
    if( oculta.indexOf("_") == -1 ) {
      document.getElementById("msg-final").innerHTML = "Congratulations!";
      document.getElementById("msg-final").className += "zoom-in";
      document.getElementById("palabra").className += " encuadre";
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      document.getElementById("reset").innerHTML = "Start";
      btnInicio.onclick = function() { location.reload() };
    }else if( cont == 0 ) {
      document.getElementById("msg-final").innerHTML = "Game Over";
      document.getElementById("msg-final").className += "zoom-in";
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      document.getElementById("reset").innerHTML = "Start";
      btnInicio.onclick = function () { location.reload() };
    }
  }
  
  // Restablecer juego
  function inicio() {
    generaPalabra();
    pintarGuiones(palabra.length);
    generaABC("a","z");
    vaciar()
    cont = 6;
    console.log(oculta)
    document.getElementById("Attempts").innerHTML=cont;
  }
  
  // Iniciar
  window.onload = inicio(); 