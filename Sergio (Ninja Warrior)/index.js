const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//Dimension de Canvas
canvas.width = 1024
canvas.height = 576


//Creacion del Canvas
ctx.fillRect(0, 0, canvas.width, canvas.height)


//Gravedad
const gravity = 0.8 //Default 0.8


//Controlar el tiempo para poder parar a los jugadores si el tiempo se ha acabado
let timerDown = false


//Cargar el fondo
const background = new Sprite({
    position: {
        x: 0, y: 0
    }, imageSrc: './img/background.png' //Default: './img/background.png'
})

//Implementacion de la tienda y su imagen
const shop = new Sprite({
    position: {
        x: 600, y: 128  //128
    }, imageSrc: './img/shop.png', scale: 2.75, framesMax: 6
})

//Creacion de Player 1
const player = new Fighter({
    position: {
        x: 100, y: 0
    }, velocity: {
        x: 0, y: 0
    }, offset: {
        x: 0, y: 0
    },
    framesHold: 6,

    imageSrc: './img/samuraiMack/Idle.png', framesMax: 8, scale: 2.5, offset: {
        x: 215, y: 157
    }, sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png', framesMax: 8
        }, idle_mirror: {
            imageSrc: './img/samuraiMack/Idle-Mirror.png', framesMax: 8
        }, run: {
            imageSrc: './img/samuraiMack/Run.png', framesMax: 8
        }, run_mirror: {
            imageSrc: './img/samuraiMack/Run-Mirror.png', framesMax: 8
        }, jump: {
            imageSrc: './img/samuraiMack/Jump.png', framesMax: 2
        }, jump_mirror: {
            imageSrc: './img/samuraiMack/Jump-Mirror.png', framesMax: 2
        }, fall: {
            imageSrc: './img/samuraiMack/Fall.png', framesMax: 2
        }, fall_mirror: {
            imageSrc: './img/samuraiMack/Fall-Mirror.png', framesMax: 2
        }, attack: {
            imageSrc: './img/samuraiMack/Attack.png', framesMax: 6
        }, attack_mirror: {
            imageSrc: './img/samuraiMack/Attack-Mirror.png', framesMax: 6
        }, takeHit: {
            imageSrc: './img/samuraiMack/TakeHit.png', framesMax: 4
        }, death: {
            imageSrc: './img/samuraiMack/Death.png', framesMax: 6
        }
    }, attackBox: {
        offset: {
            x: 120, y: 50
        }, width: 160, height: 50
    }
})

//Creacion de Player 2
const enemy = new Fighter({
    position: {
        x: 775, y: 0
    }, velocity: {
        x: 0, y: 0
    }, color: 'blue',
    offset: {
        x: -50, y: 0
    }, imageSrc: './img/kenji/Idle.png', framesMax: 4, scale: 2.5, offset: {
        x: 215, y: 167
    }, sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png', framesMax: 4
        }, idle_mirror: {
            imageSrc: './img/kenji/Idle-Mirror.png', framesMax: 4
        }, run: {
            imageSrc: './img/kenji/Run.png', framesMax: 8
        }, run_mirror: {
            imageSrc: './img/kenji/Run-Mirror.png', framesMax: 8
        }, jump: {
            imageSrc: './img/kenji/Jump.png', framesMax: 2
        }, jump_mirror: {
            imageSrc: './img/kenji/Jump-Mirror.png', framesMax: 2
        }, fall: {
            imageSrc: './img/kenji/Fall.png', framesMax: 2
        }, fall_mirror: {
            imageSrc: './img/kenji/Fall-Mirror.png', framesMax: 2
        }, attack: {
            imageSrc: './img/kenji/Attack.png', framesMax: 4
        }, attack_mirror: {
            imageSrc: './img/kenji/Attack-Mirror.png', framesMax: 4
        }, takeHit: {
            imageSrc: './img/kenji/Take hit.png', framesMax: 3
        }, death: {
            imageSrc: './img/kenji/Death.png', framesMax: 7
        }
    }, attackBox: {
        offset: {
            x: -170, y: 50
        }, width: 170, height: 50
    }
})


//Teclas de movimientos laterales
const keys = {
    a: {
        pressed: false
    }, d: {
        pressed: false
    }, ArrowRight: {
        pressed: false
    }, ArrowLeft: {
        pressed: false
    }
}


//Asignar las posiciones fijas del eje x de los personajes para controlar el movimiento de la hitbox dependiendo hacia el lado que miren
const hitBoxDirecctionPlayer1 = {
    right: 80, left: -200
}

const hitBoxDirecctionPlayer2 = {
    right: -170, left: 70
}


//Funcion principal la cual utiliza la programacion recursiva, que constantemente actualiza posiciones, velocidades, animaciones...etc
function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    if (!timerDown) {

        // Movimiento del jugador 1
        if (keys.a.pressed && player.lastKey === 'a') {
//Con esto controla los limites de la posicion para que no pueda salir de la etiqueta
            if (player.position.x >= 0) {
                player.velocity.x = -5
                player.attackBox.offset.x = hitBoxDirecctionPlayer1.left

            }
            player.switchSprite('run-mirror')
        } else if (keys.d.pressed && player.lastKey === 'd') {
            //Con esto controla los limites de la posicion para que no pueda salir de la etiqueta
            if (player.position.x <= 950) {
                player.attackBox.offset.x = hitBoxDirecctionPlayer1.right
                player.velocity.x = 5
            }
            player.switchSprite('run')

        } else if (player.lastKey === 'a') {

            //En este momento es en el que se valora la posicion a la que esta mirando el jugador para cargar el sprite correcto, y aplicar la direccion de la hitbox correspondiente
            player.attackBox.offset.x = hitBoxDirecctionPlayer1.left
            player.switchSprite('idle-mirror')
        } else {
            player.attackBox.offset.x = hitBoxDirecctionPlayer1.right
            player.switchSprite('idle')
        }

        // Saltar Player 1

        //Se aplican las dimensiones del canvas para que no pueda saltar infinito y asignar el sprite correcto
        if (player.velocity.y < 0) {

            if (player.lastKey === 'a') {
                player.switchSprite('jump-mirror')
            } else {
                player.switchSprite('jump')
            }

        } else if (player.velocity.y > 0) {


            if (player.lastKey === 'a') {
                player.switchSprite('fall-mirror')
            } else {
                player.switchSprite('fall')
            }
        }
    }


    if (!timerDown) {
        // Movimiento del jugador 2
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            //Con esto controla los limites de la posicion para que no pueda salir de la etiqueta
            if (enemy.position.x >= 0) {
                enemy.velocity.x = -5

                //En este momento es en el que se valora si el jugador esta atacando, no se actualiza la hitbox, y en el caso que no lo este, se controla la posicion de la hitbox
                if (!player.isAttacking) {

                    enemy.attackBox.offset.x = hitBoxDirecctionPlayer2.right
                }

            }
            enemy.switchSprite('run')
        } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            //Con esto controla los limites de la posicion para que no pueda salir de la etiqueta
            if (enemy.position.x <= 950) {
                enemy.velocity.x = 5
                if (!player.isAttacking) {
                    enemy.attackBox.offset.x = hitBoxDirecctionPlayer2.left
                }

            }

            enemy.switchSprite('run-mirror')

        } else if (enemy.lastKey === 'ArrowRight') {

            if (!enemy.isAttacking) {
                enemy.attackBox.offset.x = hitBoxDirecctionPlayer2.left
            }

            enemy.switchSprite('idle-mirror')

        } else {
            if (!enemy.isAttacking) {
                enemy.attackBox.offset.x = hitBoxDirecctionPlayer2.right
            }
            enemy.switchSprite('idle')
        }

        // Saltar player 2
        if (enemy.velocity.y < 0) {


            if (enemy.lastKey === 'ArrowRight') {
                enemy.switchSprite('jump-mirror')

            } else {
                enemy.switchSprite('jump')

            }

        } else if (enemy.velocity.y > 0) {
            if (enemy.lastKey === 'ArrowRight') {
                enemy.switchSprite('fall-mirror')
            } else {
                enemy.switchSprite('fall')
            }

        }
    }

    // Detecta si ha habido colision entre el area de hitbox de player 1, y el player 2, el metodo esta en utils.js
    if (rectangularCollision({
        rectangle1: player, rectangle2: enemy
    }) && player.isAttacking && player.framesCurrent === 4) {
        enemy.takeHit()
        player.isAttacking = false

        //Se ha utilizado una libreria externa llamada GSAP, la cual se utiliza para poder aplicar animaciones a etiquetas HTML
        // https://greensock.com/

        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })


    }

    // Dejar de "atacar", en ese momento se vuelve a poner que el personaje no esta atacando
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    // Detecta si ha habido colision entre el area de hitbox de player 2, y el player 1
    if (rectangularCollision({
        rectangle1: enemy, rectangle2: player
    }) && enemy.isAttacking && enemy.framesCurrent === 2) {
        player.takeHit()
        enemy.isAttacking = false

        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // Dejar de "atacar", en ese momento se vuelve a poner que el personaje no esta atacando
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    // Detectar si alguno de los dos a muerto, para parar el contador
    if (enemy.health < 20 || player.health < 20) {
        determineWinner({player, enemy, timerId})
    }
}


// Control de cuando el usuario pulsa la tecla, y almacena cual es la ultima tecla pulsada para usarla en distintos sitios
window.addEventListener('keydown', (event) => {
    //Controla que si esta muerto no se pueda mover
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break

            //Controlar que si el tiempo esta acabado no pueda realizar las acciones
            case 'w':

                if (!timerDown) {
                    if (player.position.y > 0) {
                        player.velocity.y = -20
                    }
                }
                break
            case 's':

                //Controlar que si el tiempo esta acabado no pueda realizar las acciones

                if (!timerDown) {

                    if (player.lastKey === 'd') {
                        player.switchSprite('attack')
                    } else {
                        player.switchSprite('attack-mirror')
                    }


                    player.attack()
                }

                break
        }
    }

    // Controlar que el enemigo no se pueda mover si esta muerto
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                if (!timerDown) {
                    if (enemy.position.y > 0) {
                        enemy.velocity.y = -20
                    }
                }
                break
            case 'ArrowDown':


                if (enemy.lastKey === 'ArrowRight') {
                    enemy.switchSprite('attack-mirror')
                } else {
                    enemy.switchSprite('attack')
                }


                enemy.attack()

                break
        }
    }
})

// Control de cuando el usuario levanta el dedo de la tecla
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }


    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})


//Crear las variables a cero que luego se guardaran
let p1Wins = 0
let p2Wins = 0

//Para asegurar que se ha asignado la suma de victoria, y que no la sume más de una vez
let aumentado = false


//Coger el valor de los local Storage
let player1Wins = localStorage.getItem("player1Wins");

let player2Wins = localStorage.getItem("player2Wins");


//Comprobar si tiene valor o es nulo
if (player1Wins == null || player2Wins == null) {
    localStorage.setItem("player1Wins", "0")
    localStorage.setItem("player2Wins", "0")

    player1Wins = localStorage.getItem("player1Wins");
    player2Wins = localStorage.getItem("player2Wins");

} else {
    p1Wins = player1Wins = localStorage.getItem("player1Wins");
    p2Wins = player1Wins = localStorage.getItem("player2Wins");

}

//Asigna los valores al contador
document.querySelector('#p1Wins').innerHTML = p1Wins
document.querySelector('#p2Wins').innerHTML = p2Wins


//Aumentar en el caso que gane J1
function aumentarP1() {

    if (!aumentado) {
        p1Wins++
        localStorage.setItem("player1Wins", p1Wins)
        aumentado = true
    }

}

//Aumentar en el caso que gane J2
function aumentarP2() {

    if (!aumentado) {
        p2Wins++
        localStorage.setItem("player2Wins", p2Wins)
        aumentado = true
    }

}


let refresh = document.getElementById('reiniciar');
refresh.addEventListener('click', _ => {

    localStorage.setItem("restart", "true")


    location.reload();

})







//Funcion main que se llama al pulsar alguna tecla en el menu de inicio
function main() {


    if (iniciar) {

        iniciar = false


        document.getElementById("menuPrincipal").style.display = "none"

        document.getElementById("title").style.visibility = "visible"

        document.getElementById("texto").style.display = "none"

        document.getElementById("containerGame").style.display = "block"


        localStorage.setItem("restart", "false")

        animate()
        decreaseTimer()


    }

}

//Controla que ya se a iniciado para que no se inicie cada vez que le pulsas a una tecla
let iniciar = true

let root = document.body



root.addEventListener('keydown', main)


if(localStorage.getItem("restart") === 'true'){
    main()
}



