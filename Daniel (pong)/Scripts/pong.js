/*
canvas -> es el canvas
ctx -> para que canvas sea en 2 d
ballRadius -> radio de la bola
x, y -> posicion de la bola
dx, dy -> direccion de la bola
paddleHeight -> altura de la pala
paddleWidth -> ancho de la pala
paddleY, paddle2Y -> posicion y de la pala
up1Pressed, down1Pressed -> control de la pala
ptos1, ptos2 -> puntuaciones
*/
// var juego;


function empezar_Juego(niv, canvas, juego) {

    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 75;
    var paddleWidth = 10;
    var paddleY = (canvas.height - paddleHeight) / 2;
    var up1Pressed = false;
    var down1Pressed = false;

    var paddle2Y = (canvas.height - paddleHeight) / 2;

    var ptos1 = 0;
    var ptos2 = 0;


    document.addEventListener("keydown", plsrTecla, false);
    document.addEventListener("keyup", sltrTecla, false);

    //J1 controles
    function plsrTecla(e) {
        if (e.keyCode == 40) {
            up1Pressed = true;
        } else if (e.keyCode == 38) {
            down1Pressed = true;
        }
    }

    function sltrTecla(e) {
        if (e.keyCode == 40) {
            up1Pressed = false;
        } else if (e.keyCode == 38) {
            down1Pressed = false;
        }
    }


    function dibujBola() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function dibujPala1() {
        ctx.beginPath();
        ctx.rect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function dibujPala2() {
        ctx.beginPath();
        ctx.rect(0, paddle2Y, paddleWidth, paddleHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function ptosIA() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + ptos1, 8, 20);
    }

    function ptosIJ() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + ptos2, canvas.width - 65, 20);
    }


    function mdio() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("----", 0, paddle2Y + paddleHeight / 2);
    }


    function juego() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujBola();
        dibujPala1();
        dibujPala2();
        collisionDetection();
        ptosIA();
        ptosIJ();
        //pto medio de la paleta
        mdio();


        ganar();




        //Rebotar arriba y abajo
        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
        x += dx;
        y += dy;

        //controles J1
        if (up1Pressed && paddleY < canvas.height - paddleHeight) {
            paddleY += 2;
        } else if (down1Pressed && paddleY > 0) {
            paddleY -= 2;
        }

        //controles J2
        if (dx < 0) {
            if (y > paddle2Y + paddleHeight / 2 && paddle2Y < canvas.height - paddleHeight) {
                paddle2Y += niv;
            } else if (y < paddle2Y + paddleHeight / 2 && paddle2Y > 0) {
                paddle2Y -= niv;
            }
        }
    }


    function collisionDetection() {
        //Rebotar en las palas
        if (dx > 0) {
            if (x + dx < ballRadius) {
                dx = -dx;
            } else if (x + dx > canvas.width - ballRadius) {
                if (y > paddleY && y < paddleY + paddleHeight) {
                    dx = -dx;
                } else {
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    ptos1++;
                    console.log("ptos1 = " + ptos1);
                }
            }
        } else {
            if (x + dx > canvas.width - ballRadius) {
                dx = -dx;
            } else if (x + dx < ballRadius) {
                if (y > paddle2Y && y < paddle2Y + paddleHeight) {
                    dx = -dx;
                } else {
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    ptos2++;
                    console.log("ptos2 = " + ptos2);
                }
            }
        }

    }

    document.addEventListener('keydown', (event) => {
        if (event.key == "a") {
            clearInterval(juego);
        } else if (event.key == "r") {
            clearInterval(juego);
        }
    });



    function ganar() {
        if (ptos1 == 3) {
            console.log("J1 g");
            clearInterval(juego);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("GANA J1 PULSA R PARA ACABAR O A PARA VOLVER A EMPEZAR", (canvas.width / 2) - 170, canvas.height / 2);


        } else if (ptos2 == 3) {
            console.log("J2 g");
            clearInterval(juego);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("GANA J2 PULSA R PARA ACABAR O A PARA VOLVER A EMPEZAR", (canvas.width / 2) - 170, canvas.height / 2);
        }
    }

    juego = setInterval(juego, 10);
}