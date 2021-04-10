const { Schema, model, Types } = require('mongoose');

const placeSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    telefone: { type: String, required: true, unique: true },
    site: { type: String },
    endereco:  { type: String },
    bairro:  { type: String },
    cidade:  { type: String },
    estado:  { type: String },
    cep: { type: String },
    categoria:  { type: String, required: true, enum: ['restaurantes', 'passeios', 'hoteis'] },
    descricao:  { type: String },
}, 
{
    timestamps: true,
});

const Place = model('Place', placeSchema);

module.exports = Place;