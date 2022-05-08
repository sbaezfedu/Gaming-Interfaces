var dificultad, jugando = true, topositions = [], parriba, cont, inter, secs, mins;

$(document).ready(function () {

    // Uso de .css para poner los estilos de la ventana de juego.
    $('#ventana').css({
        "width": "600px",
        "height": "600px",
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "border": "2px solid blue",
        "background-color": "grey",
        "display": "flex",
        "flex-direction": "row",
        "flex-wrap": "wrap",
        "transform": "translate(-50%, -50%)",
        "line-height": "0px",
        "align-content": "flex-start"
    });
    


    // Un añadido de última hora. Uso de mousedown y mouseup además de la propiedad cursor de css para cambiar el cursor por un martillo animado
    $('#ventana').mousedown(function(){
        $('#ventana').css({"cursor": " url('hamm1.png'), pointer"});
    });

    $('#ventana').mouseup(function(){
        $('#ventana').css({"cursor": " url('hamm0.png'), pointer"});
    });

    ponerCasillas(100);
    entrarCasilla(1, 100);
    
});

/*
 * Función ponerCasillas, recibe un nº de casillas y las coloca en el tablero de juego.
 */
function ponerCasillas(numCasillas) {

    for (let i = 1; i <= numCasillas; i++) {
        let curCasilla = document.createElement('div');
        curCasilla.classList.add("tile");
        curCasilla.classList.add("t" + i);
        // Uso de .append para incluir las casillas creadas dentro del div padre #ventana.
        $('#ventana').append(curCasilla);
    }
    
    // Uso de .css para poner los estilos de las casillas.
    $(".tile").css({
        "background-image": "url(grass.png)",
        "background-size": "contain",
        "flex-basis": "10%",
        "height": "10%",
        "display": "flex",

    }).hide();
}

/*
 * Funcion entrarCasillas, hace entrar mediante callback las casillas con un .fadeIn llamándose
 * recursivamente hasta que no quedan casillas por mostrar y comienza el juego al ejecutar
 * la función jugar().
 */
function entrarCasilla(num, numCasillas) {
    if (num <= numCasillas) {
        $('.t' + num).fadeIn(60, function () {
            entrarCasilla(num + 1, numCasillas)
        });
    } else {
        jugar()
    }
}

// Función que devuelve un número aleatorio entre min y max.
function randomInt(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min;
}

/* Bucle que inserta las posiciones de los topos en la variable
 * topositions garantizando que no se repitan las
 * posiciones de los 25, 45, o 65 topos. Los incluye dentro de
 * sus posiciones en el tablero y les añade el listener "click"
 */
function ponerTopos(posiciones) {
    // Este primer bucle rellena el array topositions con las posiciones de los topos.
    for (let j = 0; j < dificultad.numtopos; j++) {
        var pos = randomInt(0, 100);
        if (!posiciones.includes(pos)) {
            posiciones.push(pos);
        } else {
            j--
        }
    }
    // este segundo bucle inserta las imágenes del topo cada una en su posición y les da su estilo.
    posiciones.forEach(element => {
        var topillo = document.createElement('img');
        topillo.src = "mole.png";
        topillo.classList.add("topillo", ("m" + element));
        $('.t' + element).append(topillo);
        $('.m' + element).css({
            "width": "100%",
            "height": "100%",
            "display": "none",
        })
    })

    // mediante selector de clase añadimos la función click
    $('.topillo').click(function () {
        // clickar quita el nº de topo clickado de la variable topositions con la funcion .filter
        topositions = mezclar(topositions.filter(item => item != ($(this).attr("class").match(/[\d]+/)[0])));

        // cambia la imágen del topo por la de una pequeña lápida
        $(this).attr({
            "src": "rip.png",
            "class": "clicked"
        })

        // uso de stop(true) para detener la animación y vaciar la cola de animaciones sobre ese elemento.
        $(this).stop(true);

        // eliminamos el listener.
        $(this).off();

        // nueva posición de la imágen de la lápida.
        $(this).css({
            "position": "relative",
            "top": "0px",
            "left": "0px",
        });

        // la los efectos de .slide de jqueryUI colocan un "placeholder" div que tenemos que quitar con .siblings.
        $(this).siblings().remove();

        // chequeo si el juego ha acabado (quedan 0 topos) en ese caso muestro la pantalla de victoria y detengo el interval que levanta los topos.
        if (topositions.length == 0) {
            clearInterval(inter);
            alert("VICTORIA! Tiempo: " + mins + " minutos y " + secs + " segundos.");
        }
    });
}



function jugar() {

    // jugar() lanza un prompt para escoger la dificultad, y lo seguirá lanzando en el bucle "do" mientras no se responda F, M o D.
    var dif = prompt("MATATOPOS!\nListo para jugar? \n Escribe una letra (Mayus.) para escoger la dificultad: \n (F)acil, (M)edia, (D)ificil.", "M");
    if (dif != null) {
        do {
            var mal = true;
            switch (dif) {

                // cada dificultad lleva asociada un nº de topos en el tablero, un "ratio" de velocidad y la cantidad de topos que suben a la vez cada salto.
                case "F":
                    dificultad = {
                        "numtopos": 25,
                        "vel": 1.25,
                        "grupo": 10
                    };
                    mal = false;
                    break;


                case "M":
                    dificultad = {
                        "numtopos": 45,
                        "vel": 1,
                        "grupo": 8
                    };
                    mal = false;
                    break;


                case "D":
                    dificultad = {
                        "numtopos": 65,
                        "vel": 0.85,
                        "grupo": 5
                    };
                    mal = false;
                    break;

                default:
                    alert("Tienes que escoger una dificultad");
                    dif = prompt("MATATOPOS!\nListo para jugar? \n Escribe una letra (Mayus.) para escoger la dificultad: \n (F)acil, (M)edia, (D)ificil.", "M");
                    break;
            }
        } while (mal)
    }

    // ponemos el nº de topos asociado a la dificultad en los lugares almacenados en topositions.
    ponerTopos(topositions);

    cont = new Date().getTime();
    // comenzamos a levantar un set de topos aleatorio cada 2500*dificultad.vel milisegundos.
    var inter = setInterval(function () {
        var now = new Date().getTime();
        var tiempo = now - cont;
        setTopos = mezclar(topositions);
        secs = (Math.floor((tiempo % (1000 * 60)) / 1000));
        mins = (Math.floor((tiempo % (1000 * 60 * 60)) / (1000 * 60)));
        if (setTopos.length > 0 && jugando) {
            parriba = setTopos.slice(-dificultad.grupo)
            parriba.forEach((ele, index) => {
                var papa = '.m' + ele;
                
                // .show("slide"), .effect("bounce"), y .hide.("slide") son animaciones de jqueryUI
                setTimeout(function () {
                    $(papa).show("slide", {
                        "direction": "down"
                    }, 400 * dificultad.vel).effect("bounce", 200 * dificultad.vel).delay(100 * dificultad.vel).hide("slide", {
                        "direction": "down"
                    }, 400 * dificultad.vel);
                    //console.log("topo " + ele + " salta en momento: " + (index + 1))
                }, (index + 1) * 100);
            });
        } else return;
    }, 2500 * dificultad.vel);

}

// función para mezclar los valores de un array.
function mezclar(array) {
    var m = array.length,
        t, i;

    // Mientras m exista.
    while (m) {

        // coge un elemento al azar entre 0 y m.
        i = Math.floor(Math.random() * m--);

        // y cambialo por el elemento actual.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}