const cep = require('cep-promise'); 

const input_cep = document.getElementById('input_cep');
const input_address = document.getElementById('input_address');
const input_city = document.getElementById('input_city');
const input_state = document.getElementById('input_state');
const validateCep = document.getElementById('validateCep');

function insertAddress() {
    cep(input_cep).then(console.log)
}

validateCep.addEventListener('click', insertAddress)
// cep('01230000').then(console.log)