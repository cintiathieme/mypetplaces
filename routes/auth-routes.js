const express = require('express');

const Place = require('../models/Place');
const User = require('../models/User');

const router = express();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { newName, newPassword, newEmail } = req.body;

    if(newName.trim().length === 0 || newPassword.trim().length === 0 || newEmail.trim().length === 0) {
        return res.render('register', {emptyField: 'Todos os campos são obrigatórios'})
    }

    if(newPassword.trim().length < 6) {
        return res.render('register', { passwordError: 'A senha deve conter pelo menos 6 caracteres'})
    }
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

        if (!userFromDb || userPassword !== userFromDb.senha) {
            return res.render('login', { errorLogin: ['Email e/ou senha incorreto(s)'] });
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
// precisamos mandar um id de usuario pra dentro do cookie pra conseguir validar os botoes de login/logout. aí conseguimos fazer isso com if/else na view.


module.exports = router;