var list = ["Levitating.ogg", "All Star.ogg", "Bad_to_the_bone.mp3", "The-final-countdown-kazoo.mp3", "You_Are_The_Best_Around.mp3", "Rock 'n roll part 2.ogg",
    "A-ha-take-on-me.mp3", "Baby-im-yours.mp3", "Baker street.mp3", "Hooked on a Feeling.mp3", "I Need a Hero.mp3", "I-cant-get-no-satisfaction.mp3", "Mine.mp3", "Shadilay.mp3"
];
var i = 0;
var repro = false;

function music() {
    if (!repro) {
        repro = true;
        console.log("empieza");
        play();
    } else {
        console.log("para");
        repro = false;
        var audio = document.getElementById("audio");
        audio.pause();
    }

}

function play() {

    console.log("suena");

    if (i >= list.length) {
        i = 0;
        document.getElementById("audio").src = "CSS/Musica/" + list[i];
        var audio = document.getElementById("audio");
        audio.play();
    } else {
        document.getElementById("audio").src = "CSS/Musica/" + list[i];
        var audio = document.getElementById("audio");
        audio.play();
    }




}

function next() {
    i++;
    play();
}

function prev() {
    i--;
    play();
}