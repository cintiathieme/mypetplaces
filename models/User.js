const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 },
},
{
    timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;