let map, center;
function startMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center,
        });
        new google.maps.Marker({
          position: center,
          map: map,
          title: "I'm here",
        });
      },
      function () {
        // If something goes wrong
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    // Browser says: Nah! I do not support this.
    console.log("Browser does not support geolocation.");
  }
}
startMap();

// const parseJson = string => {
//   try {
//     return JSON.parse(string);
//   }catch(e) {
//     return null;
//   }
// }

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('input_address').value=("");
  document.getElementById('input_city').value=("");
  document.getElementById('input_state').value=("");
  
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
  //Atualiza os campos com os valores.
  document.getElementById('input_address').value=(conteudo.logradouro);
  document.getElementById('input_city').value=(conteudo.localidade);
  document.getElementById('input_state').value=(conteudo.uf);
 } //end if.
else {
  //CEP não Encontrado.
  limpa_formulário_cep();
  alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

  //Expressão regular para validar o CEP.
  var validacep = /^[0-9]{8}$/;

  //Valida o formato do CEP.
  if(validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('input_address').value="...";
      
      document.getElementById('input_city').value="...";
      document.getElementById('input_state').value="...";
    
      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

  } //end if.
  else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
  }
} //end if.
else {
  //cep sem valor, limpa formulário.
  limpa_formulário_cep();
}
};