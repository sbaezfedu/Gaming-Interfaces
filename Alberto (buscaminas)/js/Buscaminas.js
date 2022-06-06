/////////////////////////////////////////////////////////////
/////////////////        VARIABLES          /////////////////
/////////////////////////////////////////////////////////////
const btnRanking = document.getElementById("menu2");
const btnTutorial = document.getElementById("menu3");
const btnReinicio = document.getElementById("btnReinicio");
const btnTablero = document.getElementsByClassName("btnsTablero");

var elemCrono = document.getElementById("cronometro");
var elemNumMinas = document.getElementById("minas");

//Objetos de los diferentes niveles de dificultad
const buscaminasFacil = {
    tamLado: 8,
    numMinasTotales: 10,
    casillasParaGanar: 54,
    numMinasEncontradas: 0
}
const buscaminasMedio = {
    tamLado: 12,
    numMinasTotales: 24,
    casillasParaGanar: 120,
    numMinasEncontradas: 0
}
const buscaminasDificil = {
    tamLado: 20,
    numMinasTotales: 70,
    casillasParaGanar: 330,
    numMinasEncontradas: 0
}

var aCampoMinas;
var aCampoMinasBoolean;

var juegoIniciado = false;

var casillasPulsadas = 0;

var id = null;

var rankingFacil = [];
var rankingMedio = [];
var rankingDificil = [];

////////////////////////////////////////////////////////
/////////////////        MAIN          /////////////////
////////////////////////////////////////////////////////
function crearJuegoMain() {
    casillasPulsadas = 0;
    crearCampoMinas();
    colocarMinas();
    crearTablero();
    sacarNumeros();
    ponerMarcador();

    listenerBotonesTabla();
    juegoIniciado = true;

    //Cronometro
    init();
    reiniciar();
    cronometrar();

}

var divWrapMenu = document.getElementById("wrapMenu");
var divWrapDificultad = document.getElementById("wrapDificultad");
var divWrapRanking = document.getElementById("wrapRanking");
var divBotonBack = document.getElementById("botonBack");
var divWrap = document.getElementById("wrap");
var divFlex = document.getElementById("flexTablero");
var divTutorial = document.getElementById("tutorial");
var divCargar = document.getElementById("flex");
///////////////////////////////////////////////////////
//////////////        FUNCIONES          //////////////
///////////////////////////////////////////////////////
function menuDificultad() {    
    divWrapMenu.style.display = "none";
    divWrapDificultad.style.display = "flex"
}

function menuRanking() {
    divWrap.style.display = "none";
    divWrapRanking.style.display = "flex"
    divBotonBack.style.display = "flex";
}

function menuPrincipal(){
    divWrap.style.display = "flex";
    divWrapMenu.style.display = "flex";
    divWrapRanking.style.display = "none";
    divBotonBack.style.display = "none"
    divFlex.style.display = "none";
    divWrapDificultad.style.display = "none";
    divTutorial.style.display = "none";
}

function ponerDificultad(dificultad) {
    
    // divWrap.style.display = "none";
    divCargar.style.display = "none";
    divFlex.style.display = "flex";
    divBotonBack.style.display = "flex";


    storageDifi = sessionStorage.setItem("dificultad", dificultad)
    
    crearTablero();
}

function menuTutorial(){
    divWrap.style.display = "none";
    divTutorial.style.display = "flex";
    divTutorial.style.flexDirection = "column";
    divBotonBack.style.display = "flex";
}

function cargar(dificultad) {
    divWrap.style.display = "none";
    divCargar.style.display = "flex";
    return new Promise((resolve, reject) => {

        let barProgress = document.getElementById("barraProgreso");
        barProgress.setAttribute("style", "visibility:visible");

        let elem = document.getElementById("barra");
        let elemPorcen = document.getElementById("porcentaje");
        let width = 0;
        let id = setInterval(frame, 15);
        function frame() {
            if (width == 100) {
                clearInterval(id);
                resolve(ponerDificultad(dificultad));
            } else {
                width++;
                elem.style.width = width + "%";
                // elem.innerHTML = width + "%";
                elemPorcen.innerHTML = width + "%";
            }
        }
        reject('No se pudo cargar el juego')
    });
}

//Funcion que crea una matriz donde se colocan las minas y otra matriz boolean para saber si se ha calculado el numero de minas en cada casilla
function crearCampoMinas() {
    let dificultad = sessionStorage.getItem("dificultad")

    if (dificultad == "facil") {
        var tamLado = buscaminasFacil.tamLado;
    }
    else if (dificultad == "medio") {
        var tamLado = buscaminasMedio.tamLado;
    }
    else if (dificultad == "dificil") {
        var tamLado = buscaminasDificil.tamLado;
    }

    aCampoMinas = new Array(tamLado + 2);
    for (let i = 0; i < aCampoMinas.length; i++) {
        aCampoMinas[i] = new Array(tamLado + 2);
    }

    aCampoMinasBoolean = new Array(tamLado + 2);
    for (let i = 0; i < aCampoMinasBoolean.length; i++) {
        aCampoMinasBoolean[i] = new Array(tamLado + 2);
    }
}

function limpiarCampoMinas() {
    for (let i = 0; i < aCampoMinas.length; i++) {
        for (let j = 0; j < aCampoMinas.length; j++) {
            aCampoMinas[i][j] = null;
        }
    }
}

//Funcion que pone las minas en las casillas de el tablero interior
function colocarMinas() {
    limpiarCampoMinas();
    var numMinasColocadas = 0;
    let dificultad = sessionStorage.getItem("dificultad")
    if (dificultad == "facil") {
        var numMinasTotales = buscaminasFacil.numMinasTotales;
        var tamLado = buscaminasFacil.tamLado;
    }
    else if (dificultad == "medio") {
        var numMinasTotales = buscaminasMedio.numMinasTotales;
        var tamLado = buscaminasMedio.tamLado;
    }
    else if (dificultad == "dificil") {
        var numMinasTotales = buscaminasDificil.numMinasTotales;
        var tamLado = buscaminasDificil.tamLado;
    }

    //Bucle que coloca las minas aleatoriamente poniendo una X
    do {
        var x = parseInt(Math.random() * tamLado);
        var y = parseInt(Math.random() * tamLado);

        if (aCampoMinas[y][x] != "X" && x >= 1 && x <= (tamLado + 1) && y >= 1 && y <= (tamLado + 1)) {
            aCampoMinas[y][x] = "X";
            numMinasColocadas++;
        }
    } while (numMinasColocadas < numMinasTotales);

    for (let i = 1; i < aCampoMinasBoolean.length - 1; i++) {
        for (let j = 1; j < aCampoMinasBoolean.length - 1; j++) {
            aCampoMinasBoolean[i][j] = true;
        }
    }

}

/// Funcion que pone los numeros dependiendo de las minas que haya alrededor de cada casilla
function sacarNumeros() {
    //Bucle que pone un 0 en las casillas que no hay una X
    for (let i = 1; i < aCampoMinas.length - 1; i++) {
        for (let j = 1; j < aCampoMinas.length - 1; j++) {
            if (aCampoMinas[i][j] != "X") {
                aCampoMinas[i][j] = 0;
            }
        }
    }
    for (let i = 1; i < aCampoMinas.length; i++) {
        for (let j = 1; j < aCampoMinas.length; j++) {
            if (aCampoMinas[i][j] == "X") {
                for (let n = (i - 1); n <= (i + 1); n++) {
                    for (let m = (j - 1); m <= (j + 1); m++) {
                        if (aCampoMinas[n][m] != "X" && aCampoMinas[n][m] != null) {
                            aCampoMinas[n][m]++;
                        }
                    }
                }
            }
        }
    }
}

function crearTablero() {
    let dificultad = sessionStorage.getItem("dificultad")

    if (dificultad == "facil") {
        var tamLado = buscaminasFacil.tamLado;
    }
    else if (dificultad == "medio") {
        var tamLado = buscaminasMedio.tamLado;
    }
    else if (dificultad == "dificil") {
        var tamLado = buscaminasDificil.tamLado;
    }

    var tabla = "<table>";
    for (let i = 1; i <= tamLado; i++) {
        tabla += "<tr>";
        for (let j = 1; j <= tamLado; j++) {
            tabla += "<td ><button class=\" btnsTablero \" id=\"" + i + ',' + j + "\"></button></td>";
        }
        tabla += "</tr>";
    }
    tabla += "</table>";
    document.getElementById("tablero").innerHTML = tabla;
}

//Funcion que da una accion a cada boton del tablero
function listenerBotonesTabla() {
    for (let i = 0; i < btnTablero.length; i++) {
        var lado = Math.sqrt(btnTablero.length);
        btnTablero[i].addEventListener("click", () => darBotonIzTabla((parseInt(i / lado) + 1), (parseInt(i % lado) + 1)));
        btnTablero[i].addEventListener("auxclick", darBotonDerTabla);
    }
}

function iniciarJuegoDesdeTablero() {
    if (juegoIniciado == false) {
        crearJuegoMain();
    }
}

//Funcion que permite dar click a un boton y ver cuantas minas hay alrededor o si es una mina
function darBotonIzTabla(fila, columna) {
    console.log(fila + " , " + columna);
    var contMinas = 0;

    if (aCampoMinas[fila][columna] == "X") {
        document.getElementById(fila + "," + columna).innerHTML = "X";
        juegoIniciado = false;
        for (let index = 0; index < btnTablero.length; index++) {
            btnTablero[index].setAttribute("disabled", "");
        }

        for (let i = 0; i < aCampoMinas.length; i++) {
            for (let k = 0; k < aCampoMinas.length; k++) {
                if (aCampoMinas[i][k] == "X") {
                    document.getElementById(i + "," + k).innerHTML = "X"
                }
            }
        }
        parar();
        alert("Has perdido");
    }
    else if (aCampoMinas[fila][columna] == 0 && aCampoMinasBoolean[fila][columna] == true) {
        aCampoMinasBoolean[fila][columna] = false
        casillasPulsadas++;
        document.getElementById(fila + "," + columna).innerHTML = contMinas;
        document.getElementById(fila + "," + columna).style.backgroundColor = "#b0afaf";
        for (let n = (fila - 1); n <= (fila + 1); n++) {
            for (let m = (columna - 1); m <= (columna + 1); m++) {
                darBotonIzTabla(n, m)
            }
        }
    }
    else if (aCampoMinas[fila][columna] == null) {

    }
    else if (aCampoMinasBoolean[fila][columna] == true) {
        casillasPulsadas++;
        for (let i = (fila - 1); i <= (fila + 1); i++) {
            for (let j = (columna - 1); j <= (columna + 1); j++) {
                if (aCampoMinas[i][j] == "X" && fila >= 0 <= fila && columna >= 0 <= columna) {
                    contMinas += 1;
                    document.getElementById(fila + "," + columna).innerHTML = contMinas;
                    document.getElementById(fila + "," + columna).style.backgroundColor = "#b0afaf";
                    aCampoMinasBoolean[fila][columna] = false
                }
                else {
                    document.getElementById(fila + "," + columna).innerHTML = contMinas;
                    aCampoMinasBoolean[fila][columna] = false
                }
            }
        }
    }
    else if (aCampoMinasBoolean[fila][columna] == false) {
        for (let i = (fila - 1); i <= (fila + 1); i++) {
            for (let j = (columna - 1); j <= (columna + 1); j++) {
                if (aCampoMinas[i][j] == "X" && fila >= 0 <= fila && columna >= 0 <= columna) {
                    contMinas += 1;
                    document.getElementById(fila + "," + columna).innerHTML = contMinas;
                    document.getElementById(fila + "," + columna).style.backgroundColor = "#b0afaf";
                    aCampoMinasBoolean[fila][columna] = false
                }
                else {
                    document.getElementById(fila + "," + columna).innerHTML = contMinas;
                    aCampoMinasBoolean[fila][columna] = false
                }
            }
        }
    }
    console.log("casillas marcadas: " + casillasPulsadas);
    partidaGanada()
}

function partidaGanada() {
    let nickTemp;
    let timeTemp;
    let dificultad = sessionStorage.getItem("dificultad")

    if (dificultad == "facil" && casillasPulsadas == buscaminasFacil.casillasParaGanar) {
        nickTemp = localStorage.getItem("rankingFacilNick");
        timeTemp = localStorage.getItem("rankingFacilTime");

        if (nickTemp == null) {

            nickTemp = (prompt("Has ganado.\nIntroduce nickname") + ",");
            timeTemp = (pasarASegundos(document.getElementById("cronometro").textContent) + ",");
            localStorage.setItem("rankingFacilNick", nickTemp);
            localStorage.setItem("rankingFacilTime", timeTemp);
        }
        else {
            nickTemp += (prompt("Has ganado.\nIntroduce nickname") + ",");
            timeTemp += (pasarASegundos(document.getElementById("cronometro").textContent) + ",");
            localStorage.setItem("rankingFacilNick", nickTemp);
            localStorage.setItem("rankingFacilTime", timeTemp);
        }

        crearJuegoMain();
    }
    else if (dificultad == "medio" && casillasPulsadas == buscaminasMedio.casillasParaGanar) {
        nickTemp = localStorage.getItem("rankingMedioNick");
        timeTemp = localStorage.getItem("rankingMedioTime");
        if (nickTemp == null) {

            nickTemp = (prompt("Has ganado.\nIntroduce nickname") + ",");
            timeTemp = (pasarASegundos(document.getElementById("cronometro").textContent) + ",");
            localStorage.setItem("rankingMedioNick", nickTemp);
            localStorage.setItem("rankingMedioTime", timeTemp);
        }
        else {
            nickTemp += (prompt("Has ganado.\nIntroduce nickname") + ",");
            timeTemp += (pasarASegundos(document.getElementById("cronometro").textContent) + ",");
            localStorage.setItem("rankingMedioNick", nickTemp);
            localStorage.setItem("rankingMedioTime", timeTemp);
        }

        crearJuegoMain();
    }
    else if (dificultad == "dificil" && casillasPulsadas == buscaminasDificil.casillasParaGanar) {
        nickTemp = localStorage.getItem("rankingDificilNick");
        timeTemp = localStorage.getItem("rankingDificilTime");
        if (nickTemp == null) {

            nickTemp = (prompt("Has ganado.\nIntroduce nickname") + ",");
            timeTemp = (document.getElementById("cronometro").textContent + ",");
            localStorage.setItem("rankingDificilNick", nickTemp);
            localStorage.setItem("rankingDificilTime", timeTemp);
        } else {
            nickTemp += (prompt("Has ganado.\nIntroduce nickname") + ",");
            timeTemp += (document.getElementById("cronometro").textContent + ",");
            localStorage.setItem("rankingDificilNick", nickTemp);
            localStorage.setItem("rankingDificilTime", timeTemp);
        }

        crearJuegoMain();
    }
}

function mostrarRanking(dificultad) {
    let tablaRanking = document.getElementById("tablaRaking");
    let nickTemp;
    let timeTemp;

    if (dificultad == "facil") {
        ordenarRanking();
        nickTemp = localStorage.getItem("rankingFacilNick").split(",");
        timeTemp = localStorage.getItem("rankingFacilTime").split(",");
        
    }
    else if (dificultad == "medio") {
        nickTemp = localStorage.getItem("rankingMedioNick").split(",");
        timeTemp = localStorage.getItem("rankingMedioTime").split(",");
    }
    else if (dificultad == "dificil") {
        nickTemp = localStorage.getItem("rankingDificilNick").split(",");
        timeTemp = localStorage.getItem("rankingDificilTime").split(",");
    }

    tablaRanking.innerHTML  = "<tr><th>Nickname</th><th>Tiempo</th></tr>";
    for (let i = 0; i < nickTemp.length; i++) {

        let nombre = nickTemp[i];
        let time = timeTemp[i];

        tablaRanking.innerHTML += "<tr><td>" + nombre + "</td><td>" + time + "</td></tr>";
    }
}

// Funcion que pone una bandera
function darBotonDerTabla() {
    var numMinas = elemNumMinas.textContent;

    window.oncontextmenu = function () {
        return false;
    }
    if (document.getElementById(this.id).childNodes[0] == null || document.getElementById(this.id).innerHTML == "") {
        numMinas--;
        document.getElementById(this.id).innerHTML = "<img src='img/bandera.png'>";
        elemNumMinas.innerHTML = numMinas;
    }
    else {
        numMinas++;
        document.getElementById(this.id).innerHTML = "";
        elemNumMinas.innerHTML = numMinas;
    }
}

function ponerMarcador() {
    let dificultad = sessionStorage.getItem("dificultad")

    if (dificultad == "facil") {
        var numMinas = buscaminasFacil.numMinasTotales;
    }
    else if (dificultad == "medio") {
        var numMinas = buscaminasMedio.numMinasTotales;
    }
    else if (dificultad == "dificil") {
        var numMinas = buscaminasDificil.numMinasTotales;
    }

    elemNumMinas.innerHTML = numMinas;
}

function ordenarRanking() {
    let personas = localStorage.getItem("rankingFacilNick").split(",");
    let tiempos = localStorage.getItem("rankingFacilTime").split(",");
    personas.pop();
    tiempos.pop();
    let recorrido = false;
    let tempP;
    let tempT;
    while (!recorrido) {
        recorrido = true;
        for (let i = 0; i < tiempos.length; i++) {
            
            if (tiempos[i] > tiempos[i + 1]){
                tempP = personas[i + 1];
                tempT = tiempos[i + 1];
                personas[i + 1] = personas[i];
                tiempos[i + 1] = tiempos[i];
                personas[i] = tempP;
                tiempos[i] = tempT;
                recorrido = false;
            }
        }
    }
    localStorage.setItem("rankingFacilNick", (personas + ","));
    localStorage.setItem("rankingFacilTime", (tiempos + ","));
}


function pasarASegundos(cronometro){
    let segundos;
    let tiempo = cronometro.toString().split(":");
    segundos = parseInt(tiempo[0])*60;
    segundos += parseInt(tiempo[1]);
    return segundos; 
}

//Cronometro
function init() {
    m = 0;
    s = 0;
    document.getElementById("cronometro").innerHTML = "00:00";
}
function cronometrar() {
    let inicio = setTimeout(escribir, 5000);
    id = setInterval(escribir, 1000);

    for (let i = 0; i < btnTablero.length; i++) {
        btnTablero[i].removeEventListener("click", cronometrar);
    }
}
function escribir() {
    var mAux, sAux;
    s++;
    if (s > 59) { m++; s = 0; }

    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }

    document.getElementById("cronometro").innerHTML = mAux + ":" + sAux;
}
function parar() {
    clearInterval(id);
}
function reiniciar() {
    clearInterval(id);
    document.getElementById("cronometro").innerHTML = "00:00";
    m = 0; s = 0;

    for (let i = 0; i < btnTablero.length; i++) {
        btnTablero[i].addEventListener("click", cronometrar);
    }
}

/////////////////////////////////////////////////////////
///////////////        LISTENERS          ///////////////
/////////////////////////////////////////////////////////

btnReinicio.addEventListener("click", crearJuegoMain);
btnRanking.addEventListener("click", menuRanking);
btnTutorial.addEventListener("click", menuTutorial);