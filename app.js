const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); // aqui estamos instanciando o pacote do express

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () =>
  console.log("MyPetPlaces running! :D")
);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(`${__dirname}/views/partials`);

mongoose
    .connect(
        process.env.MONGODB_URI,
        { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    ).then(() => console.log('Conectado ao Banco de Dados'));

app.listen(process.env.PORT, () => console.log(`App rodando na porta ${process.env.PORT}`));
