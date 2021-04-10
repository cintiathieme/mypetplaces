require('dotenv').config();

const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');

const app = express(); // aqui estamos instanciando o pacote do express

require('./configs/session.config')(app);

// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.listen(3000, () =>
//   console.log("MyPetPlaces running! :D")
// );

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(
        process.env.MONGODB_URI,
        { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    ).then(() => console.log('Conectado ao Banco de Dados'));


const homeRoutes = require('./routes/home-routes');
app.use('/', homeRoutes);

const userRoutes = require('./routes/auth-routes');
app.use('/', userRoutes);

const loggedRoutes = require('./routes/logedd-routes');
app.use('/', loggedRoutes);


app.listen(process.env.PORT, () => console.log(`App rodando na porta ${process.env.PORT}`));
