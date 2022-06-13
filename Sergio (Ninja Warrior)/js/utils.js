//A la hora de validar la colision, comprueba si la posicion de la hitbox esta en la posicion de la persona contraria
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
        rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}


//Determina el ganador en funcion de la vida, o determina el empate
function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#reiniciar').style.visibility = "visible"
        document.querySelector('#displayText').innerHTML = 'Draw!'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
        document.querySelector('#reiniciar').style.visibility = "visible"

        aumentarP1()

    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
        document.querySelector('#reiniciar').style.visibility = "visible"
        aumentarP2()
    }
}


//Determina el tiempo de juego

let timer = 60 //Default 60
let timerId

//Funcion la cual va bajando el contador y aplica el numero en la interfaz del juego, va bajando cada segundo
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        timerDown = true
        determineWinner({player, enemy, timerId})
    }
}