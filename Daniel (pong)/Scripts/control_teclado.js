document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "ArrowDown":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_atras.png')";
            break;
        case "ArrowUp":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_alant.png')";
            break;
        case "ArrowLeft":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_izq.png')";
            break;
        case "ArrowRight":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_dcha.png')";
            break;

        default:
            break;
    }
    // console.log(`key=${event.key},code=${event.code}`);
});

document.addEventListener('keyup', (event) => {
    document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla.png')";
    //  console.log(`key=${event.key},code=${event.code}`);

});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "a":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_btn1.png')";
            break;
        case "w":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_btn2.png')";
            break;
        case "e":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_btn3.png')";
            break;
        case "r":
            document.getElementById('arcade').style.backgroundImage = "url('./CSS/Imagenes/Pantalla_btn4.png')";
            break;

        default:
            break;
    }
    //  console.log(`key=${event.key},code=${event.code}`);
});