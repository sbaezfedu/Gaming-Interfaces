var code = "";

var konam = " ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight a w r";
document.addEventListener('keydown', (event) => {
    //   console.log(event.key);
    code = code + " " + event.key;

    console.log(code);

    if (code == konam) {

        document.getElementById("audio").src = "CSS/Musica/Never_Gonna_Give_You_Up.mp3"
        var audio = document.getElementById("audio");
        audio.play();
    }

});