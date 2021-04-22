let editButton = document.querySelectorAll('#editButton');
let modal = document.querySelector('.modal');

editButton.forEach(edit => {
    edit.addEventListener('click', () => {
        modal.classList.add('is-active')
    
});
})

