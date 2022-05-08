 const insertCoin = `
  <style>
  #insrtC {
    text-align: center;
    font-family: 'Courier', monospace;
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    transform: perspective(300px) scaleY(1.5) rotateX(-40deg);
    transform-style: preserve-3d;
    --layer-depth: 0.32em;
    width: 100%;
    height: 100%;
    /*animacion*/
    animation-name: spinner;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 5s;
}

@keyframes spinner {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(-360deg);
    }
}
  </style>
    <div id='insrtC' width="480" height="320">
            <h1>INSERT COIN</h1>
    </div>
`;

 const menuJuego = `
  <style>
  #menu {
    height: 100%;
}

#instruc {
    background-color: black;
    color: white;
    border: thick dotted white;
}


  </style>
  <div id='menu'>
            <p id="pong">PONG</p>
            <div id="instruc">
                CONTROLES
                <p>Controlas la pala de la derecha y tu objetivo es marcar 3 goles</p>
                <p>&#8657; Flecha hacia arriba</p>
                <p>&#8659; Flecha hacia abajo</p>
                <p>A Empezar el juego</p>
                <p>R Acabar el juego</p>
                <p>W Aumentar dificultad</p>
                <p>E Disminuir dificultad</p>
                <p id="dicif"></p>
            </div>
        </div>
`;

 const carg = `
    <style>
        .parent {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(5, 1fr);
            grid-column-gap: 33px;
            grid-row-gap: 0px;
            border: black 1px solid;
        }
        
        .caja {
            display: flex;
            align-items: flex-end;
            grid-area: 3 / 1 / 4 / 7;
        }
        
        #barra {
            color: black;
            background-color: white;
            border-right: white thick solid;
            height: 100%;
            width: 0%;
            transition: width 1s;
        }
    </style>

    <div class="parent">
        <div class="caja">
            <div id="barra">LOADING...</div>
        </div>
    </div>

`;


 const jueg = `
  <style>
  #myCanvas {
    width: 100%;
    height: 100%;
}
  </style>
  <canvas id="myCanvas" width="480" height="320"></canvas>
`;

 class pantallJuego extends HTMLElement {
     constructor() {
         super();
         this.attachShadow({ mode: 'open' });

         document.querySelector('#instCoin').addEventListener('click', () => {
             let niv = 1;
             let juego;

             this.insrtCo(menuJuego);

             document.addEventListener('keydown', (event) => {
                 switch (event.key) {
                     case "a":
                         this.insrtCo(carg);

                         let init = null;
                         var element = this.shadowRoot.getElementById('barra');
                         let anima;

                         console.log(this.shadowRoot.getElementById('barra'));

                         function step(timestamp) {
                             if (!init) init = timestamp;
                             var progress = timestamp - init;
                             element.style.width = '100%';
                             if (progress < 2000) {
                                 start();
                             }
                             window.cancelAnimationFrame(anima);
                         }


                         // Comienza la ejecución
                         function start() {
                             anima = window.requestAnimationFrame(step);
                         }
                         start();

                         setTimeout(() => {
                             this.insrtCo(jueg);
                             clearInterval(juego);

                             empezar_Juego(niv, this.shadowRoot.getElementById('myCanvas'), juego);
                         }, 2500);

                         break;

                     case "r":
                         clearInterval(juego);
                         this.insrtCo(menuJuego);
                         break;

                     case "w":
                         niv++;
                         if (niv > 7) {
                             niv = 7;
                         }
                         break;
                     case "e":
                         niv--;

                         if (niv < 1) {
                             niv = 1;
                         }
                         break;
                     default:
                         break;
                 }
                 //  console.log(`key=${event.key},code=${event.code}`);
             });


         });
     }

     connectedCallback() {
         this.insrtCo(insertCoin);
     }

     insrtCo(cod) {
         this.shadowRoot.innerHTML = cod;
     }
 }
 window.customElements.define('wc-pantalla', pantallJuego);