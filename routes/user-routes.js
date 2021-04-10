const express = require('express');

const Place = require('../models/Place');
const User = require('../models/User');

const router = express();

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.post('/cadastro', async (req, res) => {
    try {
        const newUser = req.body;

        const userFromDb = await User.findOne(newUser.email);

        if (userFromDb) {
            return res.render('cadastro') // alert?
        }
        
        await User.create(newUser);
        
        res.redirect('/login');

    } catch (error) {
        console.log('Erro no cadastro', error)
    }
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    try {
        const {userEmail, userPassword } = req.body;
    }
})