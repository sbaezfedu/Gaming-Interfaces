/**
 * Global Utils
 */
let reproductor;
let questN = 0;
let track = ["./sounds/soundTrackSuspense.mp3", "./sounds/timeout.mp3"]
let puntuacion = ['0€', '100€', '200€', '300€', '500€', '1000€', '2000€', '4000€', '8000€', '16000€', '32000€', '64000€', '12500€', '250000€', '500000€', '1 MILLON DE EUROS MAKINA'];
let asserts = 0;
curAudioIndex = 0;
/**
 * Window onload
 */
$(() => {
    startGame();
    $('#modal')
        .fadeIn(1000)
    $('#startGame').on('click', () => {
        soundTrack("./sounds/start.mp3");
        $('#modal')
            .fadeOut(500, () => {
                $("#ask-area")
                    .css({
                        visibility: 'visible'
                    })
            });
    });
});


function soundTrack(srcTrack) {
    reproductor = new Audio(srcTrack)
    reproductor.play();
    console.log(srcTrack)
    reproductor.onended = () => {
        soundTrack(track[curAudioIndex % track.length]);
        curAudioIndex++;
    }
}

function startGame() {
    setQuestion();
}

function setQuestion() {
    restartButtons();
    $('#pregunta')
        .html(quest[questN].pregunta)
    $('#a')
        .html(quest[questN].opciones.a)
    $('#respuestaA')
        .click((evt) => {
            checkCurrentChoice('A', quest[questN].respuestaCorrecta.toUpperCase());
            evt.preventDefault();
        });
    $('#b')
        .html(quest[questN].opciones.b)
    $('#respuestaB')
        .click((evt) => {
            checkCurrentChoice('B', quest[questN].respuestaCorrecta.toUpperCase());
            evt.preventDefault();
        });
    $('#c')
        .html(quest[questN].opciones.c)
    $('#respuestaC')
        .click((evt) => {
            checkCurrentChoice('C', quest[questN].respuestaCorrecta.toUpperCase());
            evt.preventDefault();
        });
    $('#d')
        .html(quest[questN].opciones.d)
    $('#respuestaD')
        .click((evt) => {
            checkCurrentChoice('D', quest[questN].respuestaCorrecta.toUpperCase());
            evt.preventDefault();
        });
}

function checkCurrentChoice(choice, respuestaCorrecta) {
    if (respuestaCorrecta == choice) {
        questN++;
        if (quest.length > questN) {
            restartButtons();
            setQuestion(questN);//NextQuestion
            asserts++;
        }
        else {
            $('#respuesta' + respuestaCorrecta)
                .addClass('respuesta-correcta');
            loseAnimation();
            setTimeout(() => {
                window.location.reload();
            }, 1000 * 5);
            return
        }
    }
    else {
        console.log("PERDISTE GILIPO")
        $('#respuesta' + respuestaCorrecta)
            .addClass('respuesta-correcta');
        loseAnimation();
        setTimeout(() => {
            window.location.reload();
        }, 1000 * 5);
        return
    }
}

function loseAnimation() {
    $('.title-area')
        .animate({
            backgroundPosition: '25%'
        }, 1000, function () {
            $('.puntuacion')
                .html(puntuacion[asserts])
                .animate({
                    fontSize: '5em'
                })

        })
}
function restartButtons() {
    $('#respuestaA').remove();
    $('#ask-area').append(
        $('<button></button>')
            .addClass('col-6')
            .addClass('quest-r')
            .attr('id', 'respuestaA')
            .append(
                $('<span></span>')
                    .html('a)')
            )
            .append(
                $('<span></span>')
                    .attr('id', 'a')
            )
    );
    $('#respuestaB').remove();
    $('#ask-area').append(
        $('<button></button>')
            .addClass('col-6')
            .addClass('quest-r')
            .attr('id', 'respuestaB')
            .append(
                $('<span></span>')
                    .html('b)')
            )
            .append(
                $('<span></span>')
                    .attr('id', 'b')
            )
    );
    $('#respuestaC').remove();
    $('#ask-area').append(
        $('<button></button>')
            .addClass('col-6')
            .addClass('quest-r')
            .attr('id', 'respuestaC')
            .append(
                $('<span></span>')
                    .html('c)')
            )
            .append(
                $('<span></span>')
                    .attr('id', 'c')
            )
    );
    $('#respuestaD').remove();
    $('#ask-area').append(
        $('<button></button>')
            .addClass('col-6')
            .addClass('quest-r')
            .attr('id', 'respuestaD')
            .append(
                $('<span></span>')
                    .html('d)')
            )
            .append(
                $('<span></span>')
                    .attr('id', 'd')
            )
    );
}