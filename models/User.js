const { Schema, model } = require('mongoose');

const userSchema = newSchema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 },
    cidade:  { type: String },
    estado:  { type: String },
    dataNascimento: { type: Date },
},
{
    timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;