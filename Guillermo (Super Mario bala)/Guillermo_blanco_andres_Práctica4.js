
var pers;
var linea;
var comprobar;
var crear;
var crear1;
var tiempo;
var bichote=[];
var puntuacion=0;
var vic=4;
var start = null;
var star;
var inter;

function empezar()
{
    
    comprobar=setInterval(colision,5);
    crear=setInterval(bichos,700,1,3);
    star=setInterval(estrella,15000);
    setInterval(dificultad,5000);
    tiempo=setInterval(() => {
      puntuacion++;
      document.getElementById('temporizador').innerHTML=puntuacion;
    },  1000);
    pers=document.createElement('div');
    pers.className='muneco';
    pers.id='pers';
    document.getElementById('2').appendChild(pers);
    linea=pers.parentElement.id;
    window.addEventListener("keydown", function (event) {
        if(event.key == 'w')
        { 
           if(linea<=1){}
           else
           {
            linea--;
            document.getElementById(linea).appendChild(pers);
           }
        }
        if(event.key == 's')
        {
            if(linea>=3){}
           else
           {
            linea++;
            document.getElementById(linea).appendChild(pers);
           }
        }
    },false);
}

function bichos(a,b)
{
  
  var ohcib=document.createElement('div');
  ohcib.className='monstruo';
  ohcib.id=vic;
  document.getElementById(aleatorio(a,b)).appendChild(ohcib);
  bichote.push(ohcib);
  avanzar(ohcib);
  vic++;
}

function avanzar(bicho)
{
  var hola=setInterval(function () {
    var x=bicho.getBoundingClientRect();
    bicho.style.left=(x.x - 15 )+'px';
    
  },1)
}

function colision()
{
  var posi=pers.getBoundingClientRect();
  for(let x in bichote)
  {
    var z=bichote[x].getBoundingClientRect();

      if(z.x>=posi.left && z.x <=(posi.right -20)&& z.y==posi.y)
      {
        derrota();
      }
      else if(z.x<=-60)
      {
        document.getElementById(bichote[x].id).remove();
        puntuacion+=10;
        bichote.splice(x,1);
      }
    }
  }


function aleatorio(a,b) {
	return Math.round(Math.random()*(b-a)+parseInt(a));
}

function victoria()
{
  
  
  
  var elem=document.getElementById('juego')
  var punt=document.getElementById('temporizador').innerText
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
  
  clearInterval(crear);
  clearInterval(crear1);
  clearInterval(tiempo);
  clearInterval(star);
  
  elem.innerHTML='<p color=#ee3e18>VICTORIA</p><br>puntuación:'+punt;
  
}

function estrella()
{var prueba=document.createElement('victoria-div');
document.getElementById('2').appendChild(prueba);}


function derrota()
{
    var elem=document.getElementById('juego')
    var punt=document.getElementById('temporizador').innerText
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    clearInterval(crear);
    clearInterval(crear1);
    clearInterval(tiempo);
    clearInterval(star);
    clearInterval(inter);
    elem.innerHTML='DERROTA :(<br>puntuación:'+punt;
    document.getElementById('juego').style.backgroundColor="#7b94a5";

}

function dificultad()
{
  clearInterval(crear);
  clearInterval(crear1);
  crear=setInterval(bichos,700,1,2);
  crear1=setInterval(bichos,700,2,3);
}

class barraProgreso extends HTMLElement{

  constructor() {
    super();
    this.attachShadow({mode: 'open'});		
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.template;  
    this._barra = this.shadowRoot.querySelector(".barra");
    this._leer = this.shadowRoot.querySelector("#leer");
    this.shadowRoot.querySelector("#jugar").addEventListener("click", this.jugar.bind(this));
    this.shadowRoot.querySelector("#instrucciones").addEventListener("click", this.instrucciones.bind(this));
  }

  jugar(){				
      var start = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        let ancho = ((progress*100)/1000)+"%";
        this._barra.style.width = ancho;
        
        if (progress < 1000) {
         window.requestAnimationFrame(step.bind(this));
        } else {
          empezar();
          document.getElementById('juego').style.visibility='visible';
          document.getElementById('pantalla1').style.visibility='hidden';
        }
      }
      
      window.requestAnimationFrame(step.bind(this)); 
    }

  instrucciones()
  {
    if(this._leer.innerHTML!='') this._leer.innerHTML='';
    else this._leer.innerHTML='<b>W</b> para moverte hacia arriba. <br><b>S</b> para moverte hacia abajo.<br><br>Recoje la estrella para ganar.';
    
  }

    get template(){
			return `<style>
				#progress{
					margin: 1em;
					height: 20px;
					width: 90%;
					border: 1px solid black;
				}

				.barra{
					height: 100%;
					width: 0;
          background-color: red;
				}

        #jugar
        {
          margin: 2em 1em 2em 0.5em;
          text-decoration: none;
          padding: 30px;
          font-weight: 600;
          font-size: 25px;
          color: #ffffff;
          background-color: #735722;
          border-radius: 6px;
          border: 2px solid #0016b0;
        }
        #instrucciones
        {
          margin: 2em 1em 2em 1em;
          text-decoration: none;
          padding: 30px;
          font-weight: 600;
          font-size: 25px;
          color: #ffffff;
          background-color: #735722;
          border-radius: 6px;
          border: 2px solid #0016b0;
        }

        #jugar:hover{
          color: #1883ba;
          background-color: #ffffff;
        }

        #instrucciones:hover{
          color: #1883ba;
          background-color: #ffffff;
        }
        #leer
        {
            margin: 1em;
            font-size: 2em;
        }

			</style>
			<input type="button" value="Jugar" id="jugar"></input>
			<input type="button" value="Instrucciones" id="instrucciones"></input>		
					
			<div id="progress">
				<div class="barra"></div>
			</div>
      <div id="leer"></div>
      `;
		}
}// fin clase

customElements.define('progress-bar', barraProgreso);


class VictoriaDiv extends HTMLElement{

  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});		
  }

  
  connectedCallback() {
    this.shadowRoot.innerHTML = this.template;  
    this._vict = this.shadowRoot.querySelector("#estrella");
    this.mover(this._vict);
  }

  mover(a)
  {
    inter=setInterval(function () {

      var posi=document.getElementById('pers').getBoundingClientRect();
      var x=a.getBoundingClientRect();
      a.style.left=(x.x - 200 )+'px';
      
      
      if(x.x>=posi.left && x.x <=(posi.right -20)&& x.y==posi.y)
      {
        victoria();
        clearInterval(inter)
      }
      
    },100)

  }

    get template(){
			return `<style>
              #estrella
              {
                  transition: left 0.5s;
                  transition-timing-function: linear;
                  height: 100%;
                  width: 100px;
                  z-index: 2;
                  background-image: url('victoria.png');
                  background-repeat: no-repeat;
                  background-size: 80px;
                  position:absolute;
                  right: 0;
              }
              </style>
              <div id="estrella">
              </div>
      `;
		}
}// fin clase

customElements.define('victoria-div', VictoriaDiv);

