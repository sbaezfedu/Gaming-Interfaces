// Crea un juego online, que utilice al menos una vez los siguientes elementos:

//  - Eventos de ratón (hover, click, etc).
//  - Funciones de mostrar u ocultar, ya sea con show y hide, funciones de
//    desvanecimiento (fade) o funciones de deslizamiento (slide)
//  - Se debe demostrar que se domina el manejo de tiempos entre animaciones y el
//    uso de funciones callback.
//  - Función de retardo (delay).
//  - Método animate al menos con alguna función del parámetro options (progress,
//    step, done, etc).
//  - Al menos una vez una de las alternativas entre:
//     - Técnicas de manipulación de colas de efectos (queue, dequeue).
//     - Parar y reanudar animaciones (stop, finish, etc).
//  - Función css() o addClass/removeClass/toggleClass.
//  - Manipulación interactiva de la página web (text, append, value, each, is, etc).
//  - Algún elemento de jQueryUI.

// objeto que almacena las teclas pulsadas simultáneamente
const pulsadas = {};

$(document).keydown(function(e) {
  // 90 z 88 x 78 n 77 m
  if ([90, 88, 78, 77].includes(e.keyCode) && pulsadas[e.keyCode] !== true) {
    pulsadas[e.keyCode] = true;
  }
});

$(document).keyup(function(e) {
  // 90 z 88 x 78 n 77 m
  if ([90, 88, 78, 77].includes(e.keyCode) && pulsadas[e.keyCode] === true) {
    pulsadas[e.keyCode] = false;
  }
});

$(document).keypress(function(e) {
  if (e.key === " ") {
    detenerAlerta();
    $("*").clearQueue().stop();
    // TODO
    setTimeout(() => location.reload(), 1000);
  }
});

// Para generación automática de sonidos
let context, gain, oscillator;

function alerta() {
  if (!gain && !oscillator) {
    gain = context.createGain();
    gain.connect(context.destination);
    oscillator = context.createOscillator();
    oscillator.connect(gain);
    oscillator.frequency.setValueAtTime(400, context.currentTime);
    gain.gain.setValueAtTime(0.8, context.currentTime);
    oscillator.type = ['sine', 'square', 'sawtooth', 'triangule'][0];
    oscillator.start();
  }
}

function detenerAlerta() {
  if (gain && oscillator) {
    gain.gain.setTargetAtTime(1/1000, context.currentTime, 0.02);
    oscillator.stop(context.currentTime + 0.05);
    gain = oscillator = undefined;
  }
}

// Contadores para las proporciones
let dentro, fuera;

$(document).ready(function() {
  $("main, header").hide();
  $("header").slideDown(2000);
  // esto se podrí hacer como $("form").submit()
  $("input[type=submit]").click(function(e) {
    e.preventDefault();
    // se genera aquí el context en vez de globalmente, para evitar errores en algunos navegadores
    context = new (window.AudioContext || window.webkitAudioContext)();
    $("header")
      .slideUp('slow')
      .queue(function() {
        $("main").fadeIn('slow');
        psicotecnico();
      });
  })
});

function psicotecnico() {
  $(".prueba").text("");
  $("#progreso, #porcentaje").progressbar({value: 0, orientation: "vertical"});

  const caminos = 2;
  for (let camino = 0; camino < caminos; camino++) {
    $(".prueba").append($('<div class="ruta"/>'));
  }
  $(".ruta")
    .append($("<div/>").addClass("bola"))
    .append($('<div/>').addClass("camino"));
  
  // velocidad
  const velocidad = parseInt(document.getElementById("velocidad").value);
  // número de carriles en cada camino
  const carriles = parseInt(document.getElementById("carriles").value);
  // número de tramos
  const tramos = parseInt(document.getElementById("tramos").value);
  // anchura calzada
  const anchura = `${100 / carriles}%` || "var(--calzada)" || `${$(".camino").width() / carriles}px`;
  // longitud de un tramo en pixeles
  const tramo = $(".camino").width() / carriles;

  // pintado de los carriles
  $(".camino").each(function() {
    for (const [inicio, final] of ruta(tramos, carriles)) {
      const giro = [" izda", "", " dcha"][inicio - final + 1];
      const desplazamiento = `${final * 100 / carriles}%`;
      $(this).append($(`<div class="carril${giro}" style="width: ${anchura}; height: ${tramo}px; left: ${desplazamiento};"/>`));
    }
  });

  // animaciones
  $(".bola").animate({"top": $(window).height() / 2 - $(".bola").last().offset().top - $(".bola").height() / 2}, 3000, 'swing');
  $(".camino")
    .animate({'top': $(window).height() / 2 - $(".camino").offset().top}, "slow")
    .animate({'top': `-=${tramo / 2}px`}, 3000)
    .delay(1000)
    .queue(() => mostrarNumeros(5));

  // reseteamos los contadores para la prueba
  dentro = fuera = 0;

  // guardamos las bolas para acceder fácilmente a ellas
  const bola1 = $(".ruta .bola").first();
  const bola2 = $(".ruta .bola").last();

  // aquí empieza la prueba
  $(".camino")
    .first()
    .animate({'top': "-=" + (parseInt($(".camino").css('top')) * 2 + $(".camino").height() - tramo) + "px"},
      {
        duration: (tramos - 1) * velocidad,
        easing: 'linear',
      });
  // sólo llamamos al callback en el segundo camino
  $(".camino")
    .last()
    .animate({'top': "-=" + (parseInt($(".camino").css('top')) * 2 + $(".camino").height() - tramo) + "px"},
      {
        duration: (tramos - 1) * velocidad,
        easing: 'linear',
        progress: (_, progreso, restante) => {
          for (const tecla in pulsadas) {
            if (pulsadas[tecla]) {
              switch (parseInt(tecla)) {
                case 90:
                  bola1.css('left', "-=4px");
                  break;
                case 88:
                  bola1.css('left', "+=4px");
                  break;
                case 78:
                  bola2.css('left', "-=4px");
                  break;
                case 77:
                  bola2.css('left', "+=4px");
                  break;
              }
            }
          }
          $("#progreso").progressbar({value: progreso * 100});
          $("#porcentaje").progressbar({value: dentro / (dentro + fuera) * 100});
          let sonar = false;
          // aquí quizá usar
          // cerciorarseDentro(bola1)
          // cerciorarseDentro(bola2)
          $(".ruta .bola").each(function() {
            const dentro = cerciorarseDentro($(this));
            sonar = sonar || !dentro;
          });
          if (sonar) {
            alerta();
          } else {
            detenerAlerta();
          }
        },
        done: () => {
          detenerAlerta();
          alert(`Dentro: ${dentro}\nFuera: ${fuera}\nPorcentaje: ${(100 * dentro / (dentro + fuera)).toFixed(2)}%`);
          // TODO
          setTimeout(() => location.reload(), 1000);
        }
      });
}

// checkea que determinada bola está dentro de un carril
function cerciorarseDentro(bola) {
  const {top, left} = bola.offset();
  const anchura = altura = bola.width(); // === bola.height()
  // primer elemento es la bola en sí, segundo el posible carril carril, por eso [1]
  const donde = document.elementsFromPoint(left + anchura / 2, top + altura / 2)[1];
  if (donde && donde.classList.contains("carril")) {
    dentro++;
    return true;
  }
  fuera++;
  return false;
}

function mostrarNumeros(numero) {
  if ($(".numerito").length) {
    return;
  }
  if (numero < 0) {
    $(".camino").dequeue();
  } else {
    const numerito =
      $(`<div class="numerito">${numero || "¡VAMOS!"}<div/>`)
        .delay(300)
        .animate({opacity: 0, fontSize: 250}, 700)
        .queue(function() {
          $(this).remove();
          mostrarNumeros(numero - 1);
        });
    $("body").append(numerito);
  }
}

function aleatorio(n) {
  return Math.floor(Math.random() * n);
}

// checkeo de que funciona bien la ruta
// Math.max.apply(null, ruta(100).map(([a, b]) => Math.abs(a - b))) === 1;
function ruta(tramos, carriles = 3) {
  let anterior = Math.round(carriles / 2) - 1;
  const ruta = [[anterior, anterior]];
  for (let i = 1, nuevo; i < tramos; i++) {
    // sólo funciona para 2 carriles o más
    nuevo = anterior - 1 + aleatorio(3);
    if (nuevo < 0) {
      nuevo += 2;
    } else if (nuevo === carriles) {
      nuevo -= 2;
    }
    ruta.push([anterior, nuevo]);
    anterior = nuevo;
  }
  return ruta;
}