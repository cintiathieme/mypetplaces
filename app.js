require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');

const app = express();

mongoose
    .connect(
        process.env.MONGODB_URI,
        { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    ).then(() => console.log('Conectado ao Banco de Dados'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')




app.listen(process.env.PORT, () => console.log(`App rodando na porta ${process.env.PORT}`));
