let editButton = document.querySelectorAll('.editButton');
let modal = document.querySelector('.modal');


editButton.forEach(edit => {
    edit.addEventListener('click', (event) => {
        const idButton = event.target.attributes.id.value;       
        const myModal = document.querySelector(`.modal-${idButton}`)
        myModal.classList.add('is-active')    
});
})

