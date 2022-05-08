
			$(document).ready(function() {
					var cartaJug = 0; cartaMaq = 0;
					var uno = 0, dos = 0, tres = 0, cuatro = 0, cinco = 0, seis = 0, siete = 0, ocho = 0, nueve = 0, diez = 0, jota = 0, reina = 0, rey = 0;					
					var partidas = [];
					var partida = 0;
					var palos =["C", "P", "T", "R"];				
					var cartas =[1,2,3,4,5,6,7,8,9,10,"J", "Q", "K"];
					var bCompleta=["1C","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
								   "1P","2P","3P","4P","5P","6P","7P","8P","9P","10P","JP","QP","KP",
								   "1R","2R","3R","4R","5R","6R","7R","8R","9R","10R","JR","QR","KR",
								   "1T","2T","3T","4T","5T","6T","7T","8T","9T","10T","JT","QT","KT"];
					var baraja =[];
					var bCompleta2 = [];
					baraja = cartas;
					bCompleta2 = bCompleta;
					
					var puntosJugador = 0;
					var puntosMaquina = 0;
					var totalCartas = 13;
					
					function repartir(){
						var palo, carta, jugador=0; numYletra = "", estaCarta = -1, salida = true;					
											
						carta = Math.floor(Math.random() * (totalCartas - 0));					
				
						switch(baraja[carta]){							
							case 1:									
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
									
								uno++;
								if(uno < 4){
									jugador += baraja[carta];	
								}else if(uno == 4){									
									jugador += baraja[carta];										
									baraja.splice(carta, 1);									
									totalCartas--;
								}	
								return jugador;								
							case 2:
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								dos++;
								if(dos < 4){
									jugador += baraja[carta];	
								}else if(dos == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}		
								return jugador;	
							case 3:		
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								tres++;
								if(tres < 4){
									jugador += baraja[carta];	
								}else if(tres == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}					
								return jugador;	
							case 4:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);	
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								cuatro++;
								if(cuatro < 4){
									jugador += baraja[carta];	
								}else if(cuatro == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}					
								return jugador;	
							case 5:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);	
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								cinco++;
								if(cinco < 4){
									jugador += baraja[carta];	
								}else if(cinco == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}				
								return jugador;
							case 6:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);	
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								seis++;
								if(seis < 4){
									jugador += baraja[carta];	
								}else if(seis == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}				
								return jugador;
							case 7:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);	
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								siete++;
								if(siete < 4){
									jugador += baraja[carta];	
								}else if(siete == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}					
								return jugador;
							case 8:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
							
								ocho++;
								if(ocho < 4){
									jugador += baraja[carta];	
								}else if(ocho == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}					
								return jugador;
							case 9:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								nueve++;
								if(nueve < 4){
									jugador += baraja[carta];	
								}else if(nueve == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}						
								return jugador;
							case 10:	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								diez++
								if(diez < 4){
									jugador += baraja[carta];	
								}else if(diez == 4){
									jugador += baraja[carta];	
									baraja.splice(carta, 1);
									totalCartas--;
								}						
								return jugador;
							case "J":	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								jota++;
								if(jota < 4){
									jugador += 10;
								}else if(jota == 4){
									jugador += 10;
									baraja.splice(carta, 1);
									totalCartas--;
								}					
								return jugador;
							case "Q":	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);	
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								reina++;
								if(reina < 4){
									jugador += 10;
								}else if(reina == 4){
									jugador += 10;
									baraja.splice(carta, 1);
									totalCartas--;
								}						
								return jugador;
							case "K":	
								do{
									salida = true;
									palo = generarPalo();
									numYletra = baraja[carta]+palos[palo];									
									estaCarta = bCompleta2.indexOf(numYletra);									
									if(estaCarta != -1){
										bCompleta2.splice(estaCarta, 1);									
										
									}else{									
										salida = false;
									};
									
								}while(salida != true);	
								
								rey++
								if(rey < 4){
									jugador += 10;
								}else if(rey == 4){
									jugador += 10;
									baraja.splice(carta, 1);
									totalCartas--;
								}						
								return jugador;
						};						
						
						$("#puntosJugador").html(jugador);
												   
					}
					
					
			
				
				
					function comprobar(){
						if (puntosJugador == 21){
							alert('Blackjack!!!');
							$('#repartir').fadeOut();
							$('#plantarse').fadeOut(10);							
							reparteMaquina();
							
							
						}else if(puntosJugador>21){							
							$('#repartir').fadeOut(1000);
							$('#plantarse').fadeOut(10);
							$('#iniciar').fadeIn();
							puntosMaquina += repartir();
							cartaMaq++;
							$("#RepartidacartaMaquina"+cartaMaq).css("background-image", "url(imagenes/"+numYletra+".png)");							
							$("#puntosMaquina").html(puntosMaquina);
							alert('Te pasastes, Has perdido');
							alert('La máquina gana');
							$("#mesaFichas").css("display", "none");
							$("#apuesta").html("0");
							partidas[(partida-1)] = "Partida Nº "+partida+" - <b>gano la Máquina</b>";
							$('#historial').append("<br>"+partidas[(partida-1)]);
						}
					};
					
					function comprobar2(){
						if(puntosMaquina < 21 && puntosMaquina >16){
							alert('La maquina se planta');
							if(puntosMaquina > puntosJugador){
								alert("La maquina gana");
								$("#mesaFichas").css("display", "none");
								$("#apuesta").html("0");
								partidas[(partida-1)] = "Partida Nº "+partida+" - <b>gano la Máquina</b>";
								$('#historial').append("<br>"+partidas[(partida-1)]);
							}else if(puntosMaquina < puntosJugador){
								alert("EL Jugador gana");
								$("#mesaFichas").css("display", "none");
								$("#miDinero").html((parseInt($("#apuesta").text())*2)+parseInt($("#miDinero").text()));
								$("#apuesta").html("0");
								partidas[(partida-1)] = "Partida Nº "+partida+" -  <b>gano el Jugador</b>";
								$('#historial').append("<br>"+partidas[(partida-1)]);
							}else{
								alert("Empate");
								$("#mesaFichas").css("display", "none");
								$("#miDinero").html(parseInt($("#apuesta").text())+parseInt($("#miDinero").text()));
								$("#apuesta").html("0");
								partidas[(partida-1)] = "Partida Nº "+partida+" <b>hubo empate</b>";
								$('#historial').append("<br>"+partidas[(partida-1)]);
							}						
							$('#iniciar').fadeIn();
						}else if (puntosMaquina == 21){
							alert('Blackjack!!! de la maquina');
							if (puntosJugador == puntosMaquina){
								alert("Empate");
								$("#mesaFichas").css("display", "none");
								$("#miDinero").html(parseInt($("#apuesta").text())+parseInt($("#miDinero").text()));
								$("#apuesta").html("0");
								partidas[(partida-1)] = "Partida Nº "+partida+" <b>hubo empate</b>";
								$('#historial').append("<br>"+partidas[(partida-1)]);
							}else{
								alert("La máquina gana");
								$("#mesaFichas").css("display", "none");
								$("#apuesta").html("0");
								partidas[(partida-1)] = "Partida Nº "+partida+" - <b>gano la Máquina</b>";
								$('#historial').append("<br>"+partidas[(partida-1)]);
							};
							
							$('#iniciar').fadeIn();							
						}else if(puntosMaquina>21){
							alert('la maquina se paso');
							alert("EL jugador gana");
							$("#mesaFichas").css("display", "none");
							$("#miDinero").html((parseInt($("#apuesta").text())*2)+parseInt($("#miDinero").text()));
							$("#apuesta").html("0");
							partidas[(partida-1)] = "Partida Nº "+partida+" - <b>gano el Jugador</b>";
							$('#historial').append("<br>"+partidas[(partida-1)]);
							$('#iniciar').fadeIn();
						}else{
							setTimeout(function(){
								repartirCarta2();
							}, 2000);
							
						}
					};
					function repartirCarta2(){
						puntosMaquina += repartir();
						cartaMaq++;
						$("#RepartidacartaMaquina"+cartaMaq).css("background-image", "url(imagenes/"+numYletra+".png)");
						$("#puntosMaquina").html(puntosMaquina);
						comprobar2();
					
					};
					
					function repartirCarta(){
						puntosJugador += repartir();
						cartaJug++;	
						$("#RepartidacartaJugador"+cartaJug).css("background-image", "url(imagenes/"+numYletra+".png)");		
						$("#RepartidacartaJugador"+cartaJug).css("background-image", "url(imagenes/"+numYletra+".png)");						
						$("#puntosJugador").html(puntosJugador);
						comprobar();
					};
					function inicializaSpanVariables(){					
						uno = 0, dos = 0, tres = 0; cuatro = 0, cinco = 0, seis = 0, siete = 0, ocho = 0, nueve = 0, diez = 0, jota = 0, reina = 0, rey = 0;
						puntosJugador = 0;
						puntosMaquina = 0;
						baraja = cartas;	
						bCompleta2 = bCompleta;	
						cartaJug = 0; 
						cartaMaq = 0;
						totalCartas = 13;
						$("#RepartidacartaMaquina1").css("background-image", "url(imagenes/Dorso.png)");			
						$("#RepartidacartaMaquina2").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaMaquina3").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaMaquina4").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaMaquina5").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaMaquina6").css("background-image", "url(imagenes/h.png)");
						
						$("#RepartidacartaJugador1").css("background-image", "url(imagenes/h.png)");			
						$("#RepartidacartaJugador2").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaJugador3").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaJugador4").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaJugador5").css("background-image", "url(imagenes/h.png)");
						$("#RepartidacartaJugador6").css("background-image", "url(imagenes/h.png)");
					}
					
					function iniciarPartida(){	
						if (parseInt($("#apuesta").text()) == 0){
							alert("Debes realizar una apuesta para Jugar");
						}else{							
							partida += 1;														
							$("#puntosJugador").html("0");
							$("#puntosMaquina").html("0");
							inicializaSpanVariables();	
							
							puntosMaquina += repartir();
							cartaMaq++;
							$("#RepartidacartaMaquina"+cartaMaq).css("background-image", "url(imagenes/"+numYletra+".png)");
							$("#puntosMaquina").html(puntosMaquina);							
							
							$("#RepartidacartaMaquina"+(cartaMaq+1)).css("background-image", "url(imagenes/Dorso.png)");						
							
							repartirCarta();	
	
							$("#RepartidacartaJugador"+cartaJug).css("background-image", "url(imagenes/"+numYletra+".png)");							
							$('#repartir').fadeIn(1000);
							$('#plantarse').fadeIn(1000);
							$('#iniciar').fadeOut(10);
						};
					
					};
					
					function reparteMaquina(){	
						setTimeout(function(){
								repartirCarta2();
							}, 2000);						
					};
					
					
					
					$('#muestraArray').click(function(){
						for (var i = 0; i<totalCartas; i++){
							alert(baraja[i]);
						};
					});
					$('#repartir').click(function(){
						repartirCarta();
					});
					
					$('#iniciar').click(function(){						
						iniciarPartida();						
					});
					$('#plantarse').click(function(){
						$('#repartir').fadeOut(10);
						$('#plantarse').fadeOut(10);						
						reparteMaquina();
					});
					
					function generarPalo(){
						return Math.floor(Math.random() * (4 - 0));
					};
					
				
				
					$("#ver").click(function(){
						$("#historial").slideDown("slow",function(){
							 $("#historial").delay(2000).slideUp();
						});
					});
					
					$("#bIzquierda").click(function(){
						$("#div3").animate({
							"left":"-=50px"
						});
					});
					$("#bDerecha").click(function(){
						$("#div3").animate({
							"left":"+=50px"
						});
					});
					
				
					$( function() {
						$( "#uno" ).draggable({ revert: "invalid", helper: "clone" });
						$( "#dos" ).draggable({ revert: "invalid", helper: "clone" });
						$( "#tres" ).draggable({ revert: "invalid", helper: "clone" });
						$( "#cuatro" ).draggable({ revert: "invalid", helper: "clone" });
						$( "#cinco" ).draggable({ revert: "invalid", helper: "clone" });
 				
						
						$( "#zApuesta" ).droppable({
							drop: function( event, ui ) {	
								var dinero= 0, apu = 0;
								var elemento = ((ui.draggable).attr("id"));	
								
								switch (elemento){
									case "uno":	
										if(($("#miDinero").text()) > 0){
											$("#mesaFichas").css("display", "block");
											dinero = $("#miDinero").text()-1;
											$("#miDinero").html(dinero);
											apu = parseInt($("#apuesta").text())+1;
											$("#apuesta").html(apu);
										}else{
											alert("No tienes suficiente dinero para apostar");
										};
										break;
									case "dos":
										if(($("#miDinero").text()) > 1){
											$("#mesaFichas").css("display", "block");
											dinero = $("#miDinero").text()-2;
											$("#miDinero").html(dinero);
											apu = parseInt($("#apuesta").text())+2;
											$("#apuesta").html(apu);
										}else{
											alert("No tienes suficiente dinero para apostar");
										};
										break;
									case "tres":										
										if(($("#miDinero").text()) > 4){
											$("#mesaFichas").css("display", "block");
											dinero = $("#miDinero").text()-5;
											$("#miDinero").html(dinero);
											apu = parseInt($("#apuesta").text())+5;
											$("#apuesta").html(apu);
										}else{
											alert("No tienes suficiente dinero para apostar");
										};										
										break;
									case "cuatro":										
										if(($("#miDinero").text()) > 9){
											$("#mesaFichas").css("display", "block");
											dinero = $("#miDinero").text()-10;
											$("#miDinero").html(dinero);
											apu = parseInt($("#apuesta").text())+10;
											$("#apuesta").html(apu);
										}else{
											alert("No tienes suficiente dinero para apostar");
										};										
										break;
									case "cinco":										
										if(($("#miDinero").text()) > 19){
											$("#mesaFichas").css("display", "block");
											dinero = $("#miDinero").text()-20;
											$("#miDinero").html(dinero);
											apu = parseInt($("#apuesta").text())+20;
											$("#apuesta").html(apu);
										}else{
											alert("No tienes suficiente dinero para apostar");
										};										
										break;
								};
								
							
							}
						});
					});
				
		
					
				});
				
