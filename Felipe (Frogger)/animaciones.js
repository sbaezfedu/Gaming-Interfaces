
const tabla = document.querySelectorAll('.grid div')
const agua =document.querySelectorAll('.agua')


let arrayJugadores  = new Array()
let intervaloCoche1
let intervaloCoche2
let intervaloCoche3

let intervaloCamion
let intervaloTronco
let intervaloTronco2

let intervaloTiempo


let intervalo =500

//2 dificultad


//Pestañas
//pestaña que te redirige a la pantalla de victoria
function animacionFinal(){
    cerrarPuntuacion()

    ranaFinal().then(data=>animacionLetras())
}
//animacion para que salga un texto letra a letra(pestaña de victoria)
function animacionLetras(){
    var words = "¡¡Ehnorabuena amigo has ganado!! Froggy logro regresar con su familia y le entrego las medicinas a su hermana enferma. "+
    "Eres un verdadero ganador.Gracias a ti una pobre rana no ha muerto y ha regresado contento con su familia.Eres una buena persona. "
    wordWrapper = document.getElementById('textoFinal2'),
    wordWrapperContent = wordWrapper.innerHTML;

setInterval(function(){
      wordWrapper.innerHTML = words.slice(0, wordWrapperContent.length + 1);
      wordWrapperContent = wordWrapper.innerHTML;
}, 20);
}

//te redirige a la pagina donde poner el nombre que quieres registrar en la puntuacion
function iniciar(){
    document.getElementById("start").style.display= "none";
    document.getElementById("nombre").style.display="flex"
}

//redirigir a la pestaña del juego tras la barra de carga ,ademas se establece un if para
//para validar que no se introduzaca nada en blanco
//Se establece el audio y los intervalos (animaciones de coches ,tronco y rana)
function empezar(){
    if(document.getElementById('nombreJugador').value != "" && document.getElementById('nombreJugador').value != null){
      
    barraDeCarga().then(data=> {
        document.getElementById("nombre").style.display= "none"
        document.getElementById("juego").style.display="flex"
        document.addEventListener('keyup',moveFrog)
        document.addEventListener('keydown',pause)

        
        

       


      intervaloCoche1=  setInterval('movimientoCoches()',intervalo+100)
       intervaloCoche2 =  setInterval('movimientoCoche2()',intervalo+500)
       intervaloCoche3 = setInterval('movimientoCoche3()',intervalo-100)
       intervaloTronco = setInterval('movimientoTronco()',intervalo)
       intervaloCamion = setInterval('movimientoCamion()',intervalo+500)
       intervaloTronco2= setInterval('movimientoTronco2()',intervalo) 

       
       intervaloTiempo = setInterval('tiempoJuego()',1000)
        setInterval('victoria()',1)  
        }   
        )
    }
    else{
       setTimeout('mostrarAlert()',500)
    }
}

//animacion con barra de carga (REQUISITO:Promesa)
function barraDeCarga(){    
  var elem = document.getElementById("myBar");   
  var width = 1;
  return new Promise((resolve)=>{
  var id =  setInterval(function(){
    if (width >= 100) {
        resolve("carga con exito")
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  },10)
     
    
  }) 
}


//boton de volver a intentar
function intentar(){
    window.location.reload()
}
//metodo para dirigirte a pestaña dificultad
function ajustes(){
    document.getElementById('start').style.display="none"
    document.getElementById('dificultad').style.display="flex"
}
function facil(){
    intervalo = 700
    document.getElementById('start').style.display="flex"
    document.getElementById('dificultad').style.display="none"
}
function normal(){
    intervalo=500
    document.getElementById('start').style.display="flex"
    document.getElementById('dificultad').style.display="none"
}
function dificil(){
    
    intervalo=200
    document.getElementById('start').style.display="flex"
    document.getElementById('dificultad').style.display="none"
}

//boton de volver situado en la pestaña de Informacion
function volver(){
    document.getElementById('start').style.display="flex"
    document.getElementById('informacion').style.display = "none"
}
//metodo para dirigirte a pestaña informacion
function informacion(){
    document.getElementById('start').style.display="none"
    document.getElementById('informacion').style.display="flex"
}



//funcion popUp
function pause(e){
    if(e.keyCode==27){
        document.getElementById('pause').classList.add('show')
        clearInterval(intervaloCoche1)
        clearInterval(intervaloCoche2)
        clearInterval(intervaloCoche3)
        clearInterval(intervaloTronco)
        clearInterval(intervaloTronco2)
        clearInterval(intervaloTiempo)
        clearInterval(intervaloCamion)
        this.removeEventListener('keyup',moveFrog)
    }
    
}
function cerrarPause(){
    document.getElementById('pause').classList.remove('show')
    
    document.addEventListener('keyup',moveFrog)

    intervaloCoche1=  setInterval('movimientoCoches()',intervalo-100)
    intervaloCoche2 =  setInterval('movimientoCoche2()',intervalo+500)
    intervaloCoche3 = setInterval('movimientoCoche3()',intervalo-300)
    intervaloTronco = setInterval('movimientoTronco()',intervalo)
    intervaloCamion = setInterval('movimientoCamion()',intervalo+500)
    intervaloTronco2= setInterval('movimientoTronco2()',intervalo) 
    intervaloTiempo = setInterval('tiempoJuego()',1000)
}

//abrir popUp
function mostrarAlert(){
   document.getElementsByClassName('alert')[0].classList.add('show')
}
//cerrarPopUp
function cerrarAlert(){
    document.getElementsByClassName('alert')[0].classList.remove('show')
}

//abrir popUp
function mostrarPuntuacion(){
    document.getElementById('puntuacion').classList.add('show')
 }
 //cerrarPopUp
 function cerrarPuntuacion(){
     document.getElementById('puntuacion').classList.remove('show')
     document.getElementById("juego").style.display ="none"
     document.getElementById('victoria').style.display ="block"
 }

//animacion del final
function ranaFinal(){
    let elemento = document.getElementById('ranaFinal')
    var progreso = 80
    return new Promise((resolve)=>{
        var timeout =setInterval(function(){
                if(progreso>0){
                    elemento.style.backgroundImage = "url(img/ranaFinalMove.png)"
                    progreso = progreso-10
                    elemento.style.left = progreso+"%"
                    setTimeout(function(){
                    if(progreso>0){
                        elemento.style.backgroundImage = "url(img/ranaFinal.png)"

                    }else{
                        elemento.style.backgroundImage = "none"
                        document.getElementById('imagenFinal').style.backgroundImage = "url(img/familia.png)"
                    }
                     },200)
                }
                else{
                    resolve("perfe")
         
                    clearInterval(timeout)
                }
        },400)
    })
}