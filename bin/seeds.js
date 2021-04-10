require('../app');

const mongoose = require('mongoose');

const Places = require('../models/Place');

const places = [
    {
        nome: 'Casaria SP',
        telefone:'(11)3061-9293',
        site: 'https://www.instagram.com/casariasp/',
        endereço: 'Rua Haddock Lobo, 1077',
        bairro: 'Pinheiros',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01422-001',
        categoria: 'restaurantes',
        descrição: 'Ótima opção para tomar um brunch, almoçar, tomar um café da tarde ou jantar, além de levar pães e doces deliciosos para casa. Possui uma área externa coberta onde os pets podem ficar.'  
    },
    {
        nome: 'Beraldo di Cale',
        telefone:'(11)4584-4330',
        site: 'http://beraldodicale.com.br/',
        endereço: 'Estrada de Jarinu, km 12',
        bairro: 'Caxambu',
        cidade: 'Jundiaí',
        estado: 'SP',
        cep: '13240-000',
        categoria: 'restaurantes',
        descrição: 'Tem amplo espaço ao ar livre e mesas na varanda. O local tem um riacho passando, laguinho com peixes, além de uma adega e empório com produtos da região (doces, bebidas artesanais, vinhos). Tem amplo estacionamento e funcionários gentis e educados que tratam bem os amiguinhos. Os pratos dizem que serve 2 pessoas (mas com uma entrada servem bem 3 pessoas).'  
    },
    {
        nome: 'Restaurante Saint Morit',
        telefone:'(12)3663-7171',
        site: 'https://www.instagram.com/saintmoritzrestaurante/',
        endereço: 'Av. Doutor. Paulo Ribas, 165',
        bairro: 'Capivari',
        cidade: 'Campos do Jordão',
        estado: 'SP',
        cep: '12460-000',
        categoria: 'restaurantes',
        descrição: 'No Capivarí em frente a Torre Eiffel da Galeria Paris, este restaurante fica aberto no almoço (com opção de menu executivo) e no jantar, com destaque para o fondue. Existem diversos pratos para todos os gostos: sopas, saladas, pizzas, massas. A varanda é coberta, bem protegida do sol, chuva ou vento!! Pets são super bem recebidos. Tem rampa de acesso e mesas espaçadas, ideais para humanos e pets com mobilidade reduzida. Além disso, possui estacionamento gratuito!! Quem se aventura em Campos do Jordão sabe que é raridade.'  
    },
    {
        nome: 'Hanami Confeitaria',
        telefone:'(11)2675-9300',
        site: 'http://www.hanamiconfeitaria.com.br/',
        endereço: 'Rua Demétrio Ribeiro, 785',
        bairro: 'Tatuapé',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '03332-000',
        categoria: 'restaurantes',
        descrição: 'Esta confeitaria fica no Tatuapé e produz doces (e salgados) de-li-ci-o-sos. O carro chefe é o Choux Cream que possui uma massa levinha recheada com um creme pâtisserie. Por ter como base a confeitaria japonesa os doces são suaves e perfeitos para que prefere um sabor menos doce. Possui mesas em um espaço aberto logo na entrada, onde os pets podem ficar'  
    },
    {
        nome: 'Picanha & Pasta',
        telefone:'(12)3666-1162',
        site: 'https://www.instagram.com/picanhaepasta/',
        endereço: 'Av. Antônio Joaquim de Oliveira, 265',
        bairro: 'Centro',
        cidade: 'Santo Antônio do Pinhal',
        estado: 'SP',
        cep: '12450-000',
        categoria: 'restaurantes',
        descrição: 'O Restaurante possui um espaço aberto super gostoso para os pets ficarem à vontade. Servem massas, risotos, carnes e saladas. O destaque fica por conta da Picanha Argentina super macia ... derrete na boca, além do atendimento super amigável com pets e estacionamento gratuito.'  
    },{
        nome: 'Cabana Burger – Shopping Morumbi',
        telefone:'(11)2307-1918',
        site: 'https://www.cabanaburger.com.br/',
        endereço: 'Av. Roque Petroni Júnior, 1089',
        bairro: 'Vila Gertrudes',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '04707-900',
        categoria: 'restaurantes',
        descrição: 'Esta hamburgueria localizada no Shopping Morumbi (possui outros endereços também) tem ótimos hamburgueres e possui opções veganas e vegetarianas. Logo na entrada deixam um potinho de agua para os pets e vendem um biscoito para pets com o lucro revertido para ONGs que trabalham para ajudar a vida de muitos cachorros.'  
    },
    {
        nome: 'Brado Restaurante',
        telefone:'(11)3061-9293’',
        site: 'http://bradorestaurante.com.br/',
        endereço: 'Rua Joaquim Antunes, 381',
        bairro: 'Pinheiros',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '05415-011',
        categoria: 'restaurantes',
        descrição: 'Este é o restaurante que aparece em todas as pesquisas Restaurantes Petfriendly em São Paulo. Possui uma cozinha variada, com opções veganas inclusive. Os pets são recebidos com tigela de água fresca e bifinhos. Todos os amigos são bem-vindos, pequeninos e grandões, com mesas ao ar livre cobertas (nada de improviso para ser petfriendly por lá).'  
    },
]

Places.create(places)
.then(() => {
    mongoose.connection.close();
})
.catch(error => console.log('Erro ao criar database', error))