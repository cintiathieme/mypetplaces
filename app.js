require('dotenv').config();

const express = require("express");
const hbs = require("hbs");
const mongoose = require('mongoose');

const app = express(); // aqui estamos instanciando o pacote do express

const morgan = require('morgan');

require('./configs/session.config')(app);

app.use(require('morgan')('tiny'));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static('public'));
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(
        process.env.MONGODB_URI,
        { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    ).then(() => console.log('Conectado ao Banco de Dados'));


const homeRoutes = require('./routes/home-routes');
app.use('/', homeRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);


app.use((req, res, next) => {
    if(req.session.currentUser) {
        return next();
    }
    res.redirect('/login');  
})

const loggedRoutes = require('./routes/logedd-routes');
app.use('/', loggedRoutes);

app.use((req,res) => {
    res.status(404);
    res.render('not-found', { layout: false })
});

app.use((err, req, res) => {
    console.error('ERROR', req.method, req.path, err);

    if (!res.headersSent) {
        res.status(500);
        res.render('error', { layout: false })
    }
});

app.listen(process.env.PORT, () => console.log(`App rodando na porta ${process.env.PORT}`));
