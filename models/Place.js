const { Schema, model } = require('mongoose');

const placeSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    telefone: { type: String, required: true, unique: true },
    site: { type: String },
    endereço:  { type: String },
    bairro:  { type: String },
    cidade:  { type: String },
    estado:  { type: String },
    cep: { type: String },
    categoria:  { type: String, required: true, enum: ['Restaurante', 'Passeio', 'Hotel'] },
    descrição:  { type: String },
}, 
{
    timestamps: true,
});

const Place = model('Place', placeSchema);

module.exports = Place;