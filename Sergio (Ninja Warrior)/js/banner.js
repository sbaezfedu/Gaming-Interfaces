const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


//Esta clase es para hacer os ajustes del menu de los controles, para detectar cuando hay que mostrar, ocultar, y detectar si se pulsa ya sea en la X, o fuera del marco

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {


        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)

    })
})

overlay.addEventListener('click', () => {

    const modals = document.querySelectorAll('.modal.active')

    modals.forEach(modal =>{
        closeModal(modal)
    })

})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {


        const modal = button.closest('.modal')
        closeModal(modal)

    })
})

function openModal(modal){

    if(modal == null) return


    modal.classList.add('active')
    overlay.classList.add('active')

}

function closeModal(modal){

    if(modal == null) return


    modal.classList.remove('active')
    overlay.classList.remove('active')

}