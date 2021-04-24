const express = require('express');
const bcrypt = require('bcryptjs')

const Place = require('../models/Place');
const User = require('../models/User');

const router = express();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { newName, newPassword, confirmPassword, newEmail } = req.body;

    if(newName.trim().length === 0 || newPassword.trim().length === 0 || newEmail.trim().length === 0) {
        return res.render('register', {emptyField: 'Todos os campos são obrigatórios'})
    }

    if(newPassword.trim().length < 6) {
        return res.render('register', { passwordError: 'A senha deve conter pelo menos 6 caracteres'})
    }

    if(newPassword !== confirmPassword) {
        return res.render('register', { confirmError: 'As senhas não conferem'})
    }
    
    try {

        const userFromDb = await User.findOne({ email: newEmail });
        
        if (userFromDb) {
            return res.render('register', { emailError: 'Email já cadastrado' }); 
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const encryptedPassword = bcrypt.hashSync(newPassword, salt)

        const newUser = {
            nome: newName,
            email: newEmail,
            senha: encryptedPassword,
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

        if(userEmail.trim().length === 0 || userPassword.trim().length === 0) {
            return res.render('login', {emptyField: 'Por favor, digite seu email e senha'})
        }
    
        const userFromDb = await User.findOne( { email: userEmail });

        const comparedPassword = bcrypt.compareSync(userPassword, userFromDb.senha)

        if (!userFromDb || !comparedPassword) {
            return res.render('login', { errorLogin: ['Email e/ou senha incorreto(s)'] });
        }

        req.session.currentUser = userFromDb;

        res.redirect('/dashboard');

    } catch (error) {
        console.log('Erro no login', error);
    }
});

router.get('/logout', (req,res) => {
    req.session.destroy();

    res.redirect('/')
})
//     res.redirect('/')
// })
// precisamos mandar um id de usuario pra dentro do cookie pra conseguir validar os botoes de login/logout. aí conseguimos fazer isso com if/else na view.


module.exports = router;