//Al pulsarle al boton que hay en la pantalla de inicio, muestra la historia con su animacion, la cual se repite constantemente hasta que le pulses a una tecla al iniciar el juego

let btn = document.getElementById("history-btn")

btn.addEventListener('click', ev => {
    animation()

    document.getElementById("menuPrincipal").style.display = "none"

    document.getElementById("containerHistory").style.display = "block"

    document.getElementById("word").style.display = "inline-block"
    document.getElementById("title").style.visibility = "visible"

})


//Esta es la array de valores en la cual se va mostrando cada texto

let texto = ""

let texto1 = "En una epoca antigua de Japon"

let texto2 = "Hubo una emboscada despues de comprar una nueva katana"


let words = [texto, texto1, texto2],
    wordWrapper = document.getElementById('word'),
    wordWrapperContent = wordWrapper.innerHTML,
    addingWord = false,
    counter = 1;

function animation() {
    setInterval(function () {

        if (wordWrapperContent.length > 0 && !addingWord) {
            wordWrapper.innerHTML = wordWrapperContent.slice(0, -1);
            wordWrapperContent = wordWrapper.innerHTML;
        } else {
            addingWord = true;
        }

        if (addingWord) {
            if (wordWrapperContent.length < words[counter].length) {
                wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
                wordWrapperContent = wordWrapper.innerHTML;
            } else {
                if (counter < words.length) {
                    counter++
                }
                addingWord = false;
            }
        }

        if (counter == words.length) {
            counter = 0;
        }

    }, 150);
}