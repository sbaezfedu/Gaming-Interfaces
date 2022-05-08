
let pulsados = {"KeyW": {"pressed": false,
"direction":true, 
"positive":true}, 
"KeyS": {"pressed": false, 
"direction":true, 
"positive":false}, 
"KeyA" :{"pressed": false, 
"direction":false, 
"positive":true}, 
"KeyD": {"pressed": false, 
"direction":false, 
"positive":false}};

let vidas; let total; let speed; let cristales;
let alertado; let inmune; let contInmune; let mouseHeld;
let mouseTime; let mouseInfo; let countdown; let loop;
let nave; let mapa;

window.onload=principal;

function inicializarVars() {
	vidas = 3;
	total = 5;
	speed = 10;
	cristales = 0;
	alertado = true;
	inmune = false;
	contInmune = 0;
	mouseHeld = false;
	mouseTime = 0;
	nave = null;
	mapa = null;
	mouseInfo = [];
}


function principal(){
	crearMenu();
}

function run() {
	inicializarVars();
	crearMapa();
	crearNave();
	crearCristales(total);
	crearControles();
	mostrarVidas();
	mostrarCristales();
	gameLoop();
}

function gameLoop() {
	loop = setInterval(function() {
		comprobarColision();
		comprobarInmunidad();
		mirarTeclas();
		borrarLaseres();
		manejarEnemigos();
		checkHeld();
		if (cristales < total) {
			comprobarCristales();
		} else {
			comprobarColisionPortal();
		}
	}, 16.666);
}

function crearMapa() {
	mapa = $("<div/>");
	mapa.attr("id", "mapa");
	mapa.css("top", "470px");
	mapa.css("left", "960px");
	mapa.appendTo(document.body);
}

function crearNave() {
	nave = $("<div/>");
	nave.attr("id", "nave");
	nave.addClass("comun");
	nave.appendTo(mapa);
	crearPortal(nave);
}

function crearCristales(num) {
	for (var i = 0; i < num; i++) {
		let cristal = $("<div/>");
		cristal.addClass("cristal");
		cristal.addClass("comun");
		cristal.css("transform",`rotate(${randomNumber(0,360)}deg)`);
		cristal.css("top", randomNumber(0, 100)+"%");
		cristal.css("left", randomNumber(0, 100)+"%");
		mapa.append(cristal);
	}
}

function crearPortal(nave) {
	let portal = $("<div/>");
	portal.attr("id", "portal");
	portal.addClass("comun");
	portal.appendTo(mapa);
	portal.offset({
		top: nave.offset().top-45,
		left: nave.offset().left-45,
	});
	portal.delay(1000).fadeOut(1000);
}

function crearEnemigos(cristal, num) {
	for (var i = 0; i < num; i++) {
		let enemigo = $("<div/>");
		enemigo.addClass("enemigo");
		enemigo.addClass("comun");
		enemigo.css({
			top: cristal.position().top+randomNumber(300,500) * (randomNumber(0,1) > 0 ? -1 : 1)+"px",
			left: cristal.position().left+randomNumber(300,500) * (randomNumber(0,1) > 0 ? -1 : 1)+"px"
		});
		mapa.append(enemigo);
	}
}

function crearControles () {
	mouseInfo = [443, 390, mapa[0]];
	mapa.mousemove(function(e) {
		if( e.target === this ) {
			mouseInfo = [e.clientX, e.clientY, e.target];
		}
	});
	mapa.mousedown(function(e) {
		if( e.target === this ) {
			mouseInfo = [e.clientX, e.clientY, e.target];
		}
		crearLaser(nave);
		mouseHeld = true;
	});
	$(document.body).mouseup(function(e) {
		mouseHeld = false;
		mouseTime = 0;
	});
	document.addEventListener("keydown", function(e) {
		if (e.code=="KeyW") {
			pulsados.KeyW.pressed = true;
		} else if (e.code=="KeyS") {
			pulsados.KeyS.pressed = true;
		} else if (e.code=="KeyA") {
			pulsados.KeyA.pressed = true;
		} else if (e.code=="KeyD") {
			pulsados.KeyD.pressed = true;
		}
	});
	document.addEventListener("keyup", function(e) {
		if (e.code=="KeyW") {
			pulsados.KeyW.pressed = false;
		} else if (e.code=="KeyS") {
			pulsados.KeyS.pressed = false;
		} else if (e.code=="KeyA") {
			pulsados.KeyA.pressed = false;
		} else if (e.code=="KeyD") {
			pulsados.KeyD.pressed = false;
		}
	});
}

function mirarTeclas() {
	let noPulsado = true;
	for (const tecla in pulsados) {
		if (pulsados[tecla].pressed) {
			noPulsado = false;
			if (!nave.hasClass("moviendo")) {
				nave.toggleClass("moviendo");
			}
			if (pulsados[tecla].direction) {
				mapa.css("top", mapa.position().top + (pulsados[tecla].positive ? speed : -speed));
			} else {
				mapa.css("left", mapa.position().left + (pulsados[tecla].positive ? speed : -speed));
			}
		}
		let direcciones = [pulsados["KeyW"].pressed, pulsados["KeyS"].pressed, pulsados["KeyA"].pressed, pulsados["KeyD"].pressed];
		cambiarDirecciones(direcciones);
	}

	if (noPulsado && nave.hasClass("moviendo")) {
		nave.toggleClass("moviendo");
	}
}

function cambiarDirecciones(direcciones) {
	if (direcciones[3] && direcciones[0]) {
		nave.css("transform", `rotate(45deg)`);
	} else if (direcciones[3] && direcciones[1]) {
		nave.css("transform", `rotate(135deg)`);
	} else if (direcciones[1] && direcciones[2]) {
		nave.css("transform", `rotate(225deg)`);
	} else if (direcciones[2] && direcciones[0]) {
		nave.css("transform", `rotate(315deg)`);
	} else if (direcciones[3]) {
		nave.css("transform", `rotate(90deg)`);
	} else if (direcciones[1]) {
		nave.css("transform", `rotate(180deg)`);
	} else if (direcciones[2]) {
		nave.css("transform", `rotate(270deg)`);
	} else if (direcciones[0]) {
		nave.css("transform", "");
	}
}

function crearLaser(entidad) {
	let laser = $("<div/>");
	laser.addClass("laser");
	laser.appendTo(mapa);
	laser.offset({
		top: entidad.offset().top+20,
		left: entidad.offset().left+15,
	});
	let x; let y;
	if (entidad.attr("id") == "nave") {
		laser.addClass("amigo");
		clickPosition = getPosition(mouseInfo[2]);
		x = mouseInfo[0] - clickPosition.x;
		y = mouseInfo[1] - clickPosition.y;
	} else {
		x = nave.offset().left;
		y = nave.offset().top;
	}
	moverLaser(laser, x, y);
}

function moverLaser(laser, x, y) {
	let origen; let sum;
	if (laser.hasClass("amigo")) {
		origen = laser.position();
		sum = 10000;
	} else {
		origen = laser.offset();
		sum = 10000000;
	}
	let slope = (y-origen.top)/(x-origen.left);
	let theta = Math.atan(slope);
	if (x-origen.left > 0) {
		y = y+sum * Math.sin(theta);
		x = x+sum * Math.cos(theta);
	} else {
		y = y-sum * Math.sin(theta);
		x = x-sum * Math.cos(theta);
	}
	
	laser.css("transform", `rotate(${theta}rad)`);
	laser.css({
		top: y,
		left: x
	});
}

function borrarLaseres() {
	let laseres = $(".laser");
	laseres.each(function() {
		let contador = $(this).attr("contador");
		if (contador == undefined) {
			$(this).attr("contador", 0);
		} else if (contador == 120){
			$(this).remove();
		} else {
			contador++;
			$(this).attr("contador", contador);
		}
	});
}

function manejarEnemigos() {
	$(".enemigo").each(function() { 
		let enemigo = $(this);
		if (randomNumber(0, 100) == 0) {
			crearLaser(enemigo);
		}
		if (enemigo.offset().top - nave.offset().top > 200) {
			enemigo.css("top", enemigo.position().top+randomNumber(-speed, 0)+"px");
		} else if (enemigo.offset().left - nave.offset().left > 200) {
			enemigo.css("left", enemigo.position().left+randomNumber(-speed, 0)+"px");
		} else {
			if (enemigo.offset().top > nave.offset().top) {
				enemigo.css("top", enemigo.position().top+randomNumber(-speed, 0)+"px");
			} else {
				enemigo.css("top", enemigo.position().top+randomNumber(0, speed)+"px");
			}
			if (enemigo.offset().left > nave.offset().left) {
				enemigo.css("left", enemigo.position().left+randomNumber(-speed, 0)+"px");
			} else {
				enemigo.css("left", enemigo.position().left+randomNumber(0, speed)+"px");
			}
		}

		$(".laser.amigo").each(function() {
			if (colision($(this), enemigo)) {
				enemigo.effect("puff", function() {
					enemigo.remove();
				});
				$(this).remove();
			}
		});
	});
}

function comprobarInmunidad() {
	if (inmune) {
		contInmune++;
		if (contInmune == 60) {
			inmune = false;
			nave.removeClass("inmune");
			contInmune = 0;
		}
	}
}

function comprobarCristales() {
	$(".cristal").each(function() { if (colision($(this), nave) 
		&& !$(this).attr("collected")) {
		cristales++;
		$("#cristales").html(`Crystals: ${cristales}/${total}`);
		crearEnemigos($(this), 2*cristales);
		$(this).attr("collected", true);
		$(this).effect("scale", {percent: 50}, function() {
			$(this).remove();
		});
	}});
	if (cristales >= total) {
		mostrarMensajePortal();
		$("#portal").fadeIn(1000);
	}
}

function comprobarColision() {
	let colisionando = colision(mapa, nave);
	$(".enemigo, [class='laser']").each(function() { if (colision($(this), nave)) {
		if (!inmune) {
			quitarVida();
			if ($(this).hasClass("enemigo")) {
				$(this).effect("puff", function() {
					$(this).remove();
				});
			}
		}
		if (vidas == 0) {
			gameOver();
		}
	}});

	if (!colisionando && !alertado) {
		outOfBounds();
	} else if (colisionando && alertado) {
		inBounds();
	}
}

function comprobarColisionPortal() {
	let colisionando = colision($("#portal"), nave);
	if (colisionando) {
		win();
	}
}

function quitarVida() {
	vidas--;
	inmune = true;
	$(".vida").first().animate({
		height: "0",
		width: "0"
	}, {
		done: function(now, fx) {
			$(".vida").first().remove();
		}
	}, 500);
	nave.addClass("inmune");
	nave.effect("shake");
}

function outOfBounds() {
	alertado = true;
	let timer = 5;
	nave.addClass("fuera");
	countdown = setInterval(function() {
		if (timer == 0) {
			gameOver();
		}
		mostrarContador(timer);
		timer--;
	}, 1000);

}

function inBounds() {
	alertado = false;
	nave.removeClass("fuera");
	clearInterval(countdown);
}

function checkHeld() {
	if (mouseHeld && mouseTime == 15) {
		crearLaser(nave);
		mouseTime = 0;
	} else if (mouseHeld) {
		mouseTime++;
	}
}

function win() {
	clear();
	$("#portalMsg").remove();
	finalMessage("You Win!");
	nave.animate({
		top: $("#portal").offset().top+75,
		left: $("#portal").offset().left+75
	}, {
		done: function(now, fx) {
			nave.fadeOut("slow");
			$("#portal").fadeOut("slow");
		}
	});
	replayButton("Replay!");
}

function gameOver() {
	clear();
	$("#portalMsg").remove();
	finalMessage("Game Over");
	nave.finish();
	nave.effect("explode", function() {
		nave.remove();
	});
	replayButton("Retry");
}

function finalMessage(title) {
	let mensaje = $("<div/>");
	mensaje.addClass("mensaje");
	mensaje.addClass("final");
	mensaje.html(title);
	mensaje.appendTo(document.body);
}

function crearMenu() {
    $("#instructions").accordion({
    	collapsible: true,
    	active: 1
    });
	crearMapa();
	finalMessage("S C A V E N G E R");
	replayButton("Start");
}

function replayButton(message) {
	let button = $("<div/>");
	button.addClass("ui-button");
	button.html(message);
	button.click(reset);
	button.appendTo(document.body);
}

function reset() {
	clear();
	$(document.body).html("");
	run();
}

function clear() {
	clearInterval(countdown);
	clearInterval(loop);
	mapa.off("mousedown");
	mapa.off("mousemove");
	$(document.body).off("mouseup");
}

function mostrarVidas() {
	let vidasDiv = $("<div/>");
	vidasDiv.attr("id", "vidas");
	for (var i = 0; i < vidas; i++) {
		let vida = $("<div/>");
		vida.addClass("vida");
		vida.addClass("comun");
		vida.appendTo(vidasDiv);
		vida.animate({
			height: "70%",
			width: "40%"
		}, 500);

		vida.animate({
			height: "60%",
			width: "30%"
		}, 500);
	}
	vidasDiv.appendTo(document.body);
}

function mostrarContador(num) {
	let mensaje = $("<div/>");
	mensaje.addClass("mensaje");
	mensaje.addClass("contador");
	mensaje.html(num);
	mensaje.appendTo(document.body);
	mensaje.effect("bounce");
	mensaje.fadeOut(1000, function() {
		mensaje.remove();
	});
}

function mostrarCristales() {
	let cristales = $("<div/>");
	cristales.attr("id", "cristales");
	cristales.appendTo(document.body);
	cristales.html(`Crystals: 0/${total}`);
}

function mostrarMensajePortal() {
	let mensaje = $("<div/>");
	mensaje.attr("id", "portalMsg");
	mensaje.addClass("mensaje");
	mensaje.html("You have all the crystals! Go back to the portal.");
	mensaje.appendTo(document.body);
}

function getPosition(el) {
	var xPosition = 0;
	var yPosition = 0;
	while (el) {
		if (el.tagName == "BODY") {
			var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
			var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

			xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
			yPosition += (el.offsetTop - yScrollPos + el.clientTop);
		} else {
			xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}

function colision(div1, div2) {
	var d1_offset             = div1.offset();
	var d1_height             = div1.outerHeight(true);
	var d1_width              = div1.outerWidth(true);
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	var d2_offset             = div2.offset();
	var d2_height             = div2.outerHeight(true);
	var d2_width              = div2.outerWidth(true);
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var colisionando = !(d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left);

	return colisionando;
}

function randomNumber(min, max){
	return Math.floor(Math.random()*(max - min + 1) + min)
}
