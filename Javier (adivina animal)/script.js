$(document).ready(function() {
	var score = 36;
	var nivel = 1;
	var total = 0;
	var contador = 0;
	var movidos = new Array(6);
	var divmov = new Array(3);
	var correcto = false;
	var posiciones = ["20%","32%","20%","38%","20%","44%","20%","50%","20%","56%","20%","62%","28%","32%","28%","38%","28%","44%","28%","50%","28%","56%","28%","62%","36%","32%","36%","38%","36%","44%","36%","50%","36%","56%","36%","62%","44%","32%","44%","38%","44%","44%","44%","50%","44%","56%","44%","62%","52%","32%","52%","38%","52%","44%","52%","50%","52%","56%","52%","62%","60%","32%","60%","38%","60%","44%","60%","50%","60%","56%","60%","62%"];
	var aleatorios = new Array (36);
	function crearAleatorios(aleatorios){
		for(i=0;i<aleatorios.length;i++){
			aleatorios[i]=i;
		}
		aleatorios=aleatorios.sort(function(){
			return Math.random()-0.5;
		});
	}
	function quitarNegros(){
		$(".negro").each(function(i){
			$("#c"+(aleatorios[i]+1)).delay(1000*i);
			$("#c"+(aleatorios[i]+1)).animate({opacity: "0"}, "slow",function(){
				score = score -1;
				$("#pscore").text("Puntuación: "+score);
			});
			
		});
	}
	var respuestas = ["LEON","PEZ","PERRO","KOALA","CONEJO","MARIPOSA","GATO","LOBO","CABALLO","CANARIO"];
	$("#comenzar").on("click",function(e){
		$(this).hide();
		$("#plevel").text("Nivel: "+nivel);
		$("#texto").val("");
		$("#texto").show();
		$("#enviar").show();
		$("#droppable").hide();
		quitarNegros();
	});
	$("#enviar").mouseover( function(e){
		$("#enviar").css("background","black");
		$("#enviar").css("color","white");
	});
	$("#enviar").mouseleave( function(e){
		$("#enviar").css("background-image","url('amarillo.jpg')");
		$("#enviar").css("color","black");
	});
	$("#enviar").on("click", function(e){
		if(($("#texto").val().toUpperCase()== respuestas[nivel-1])){
			var cambiado = false;
			correcto = true;
			nivel ++;
			
			$("#score").fadeOut();
			$("#pscore").fadeOut();
			$("#resultado").text("Enhorabuena, has acertado. Tu puntuación es "+score);
			total = total + score;
			
			$(".negro").finish();
			$("#resultado").fadeIn();
			$("#enviar").fadeOut();
			$("#texto").fadeOut();
			if(nivel<=10){
				$("#ptotal").text("Puntuación total: "+total);
				$("#siguiente").text("Ir al nivel "+nivel);
				$("#siguiente").fadeIn();
			}
			else{
				$("#total").hide();
				$("#ptotal").hide();
				$("#level").hide();
				$("#plevel").hide();
				$("#imagen").delay(1500);
				$("#resultado").delay(1500);
				$("#resultado").fadeOut(1500);
				$("#imagen").fadeOut(1500);
				$("#final").text("Fin del juego. Su puntuación es "+total);
				$("#final").delay(2000);
				$("#final").fadeIn(2000);
				$("#fin").fadeIn();
			}
		}
		else{
			$("#texto").css("border-color",'#ff0000');
		}
	});
	
	$("#fin").on("click", function(e){
		
		score = 36;
		nivel = 1;
		total = 0;
		correcto = false;
		$("#fin").hide();
		$("#final").hide();
		$("#total").fadeIn(2000);
		$("#ptotal").text("Puntuación total: "+total);
		$("#ptotal").show();
		$("#level").fadeIn(2000);
		$("#plevel").text("Nivel: "+nivel+"/10");
		$("#plevel").show();
		mostrar();
		var cambiado = false;
		$("#imagen").hide();
		$("#resultado").fadeOut();
		$("#siguiente").fadeOut();
		$("#imagen").attr("src", nivel+".jpg");
		$(".negro").css("opacity","1");
		
	});
	function mostrar(){
		$("#inicio").fadeOut(1000);
		$("#start").delay(1000);
		$("#start").fadeOut(1000);
		$(".negro").delay(2000);
		$(".negro").show(2000, function(){
			crearAleatorios(aleatorios);
		});
		$("#imagen").delay(3000);
		$("#imagen").fadeIn(3000);
		$("#score").delay(3000);
		$("#score").slideDown();
		$("#pscore").delay(3000);
		$("#pscore").slideDown();
		$("#comenzar").delay(3000);
		$("#comenzar").text("Comenzar nivel "+nivel);
		$("#comenzar").slideDown(3000);
		$("#droppable").show();
		$( ".negro" ).draggable();
		var array = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
		$(this).finish();
		
		
		$("#droppable").text("Puedes quitar "+(3-contador)+" cuadrados");
		
		$( "#droppable" ).droppable({
			drop: function( event, ui ) {
				divmov[contador] = (ui.draggable.attr("id").substr(1,3));
				//movidos[(contador*2)] = ui.draggable.offset().top;
				//movidos[(contador*2)+1] = ui.draggable.offset().left;
				if(contador<2){
					contador++;
					$(this).text("Puedes quitar "+(3-contador)+" cuadrados");
					array[ui.draggable.attr("id").substr(1,3)-1] = false;
					ui.draggable.fadeOut(1000);
				}
				else{
					contador++;
					$(this).text("No se pueden eliminar mas cuadrados");
					array[ui.draggable.attr("id").substr(1,3)-1] = false;
					ui.draggable.fadeOut(1000);
					$(this).delay(1000);
					$(this).fadeOut();
					$(".negro").draggable("disable");
				}
			}
		});
	}
	$("#start").on("click",function(e){
		
		$("#total").fadeIn(2000);
		$("#ptotal").text("Puntuación total: "+total);
		$("#ptotal").show();
		$("#level").fadeIn(2000);
		$("#plevel").text("Nivel: "+nivel+"/10");
		$("#plevel").show();
		mostrar();
	});
	$("#siguiente").on("click",function(e){
		score = 36;
		for(var i=0; i<(contador); i++){
			var div = divmov[i];
			var ndiv = parseInt(div);
			$("#c"+div).css("top",posiciones[(ndiv*2)-2]);
			$("#c"+div).css("left",posiciones[(ndiv*2)-1]);
			$("#c"+div).animate({opacity: "1"});
			$("#c"+div).show();
		}
		contador = 0;
		correcto = false;
		var cambiado = false;
		$("#imagen").hide();
		$("#resultado").fadeOut();
		$("#siguiente").fadeOut();
		$("#imagen").attr("src", nivel+".jpg");
		$(".negro").animate({opacity:"1"});
		mostrar();
		$(".negro").draggable("enable");
	});
	
});