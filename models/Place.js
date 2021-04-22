const { Schema, model, Types } = require('mongoose');

const placeSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    telefone: { type: String },
    site: { type: String },
    endereco:  { type: String },
    numero: { type: Number },
    bairro:  { type: String },
    cidade:  { type: String },
    estado:  { type: String },
    cep: { type: String },
    coordenadas: {
        lat: { type: Number }, 
        lng: { type: Number }
    },
    categoria:  { type: String, required: true, enum: ['restaurantes', 'passeios', 'hoteis'] },
    descricao:  { type: String },
    usuario: { type: String },
    imagem: { type: String },
}, 
{
    timestamps: true,
});

const Place = model('Place', placeSchema);

module.exports = Place;