const express = require('express');

const Place = require('../models/Place');
const User = require('../models/User');

const router = express();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { newName, newPassword, newEmail } = req.body;

    try {

        const userFromDb = await User.findOne({ email: newEmail });
        
        if (userFromDb) {
            return res.render('register', { emailError: 'Email já cadastrado' }); 
        }

        const newUser = {
            nome: newName,
            email: newEmail,
            senha: newPassword,
        }
       
        await User.create(newUser);
        
        res.redirect('/login');

    } catch (error) {
        console.log('Erro no cadastro', error)
    }
});

router.get('/cancel', (req, res) => {
    res.render('home');
});


router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const userFromDb = await User.findOne( { email: userEmail });

        if (!userFromDb) {
            return res.render('login', { emailNotFound: ['Email não encontrado'] });
        }

        if (userPassword !== userFromDb.senha) {
            return res.render('login', { incorrectPassword: ['Senha incorreta']})
        }

        req.session.currentUser = userFromDb;

        res.redirect('/dashboard');

    } catch (error) {
        console.log('Erro no login', error);
    }
});

// router.get('/logout', (req,res) => {
//     req.session.destroy();

//     res.redirect('/')
// })


module.exports = router;