const express = require('express');

const Place = require('../models/Place');
const User = require('../models/User');
const Review = require('../models/Review');

const router = express();


router.get('/dashboard', (req, res) => {
    res.render('dashboard');

});

router.get('/editUser', (req, res) => {
    const userInfos = req.session.currentUser;
    console.log(userInfos)

    User.findById(userInfos._id)
    .then(userInfos => {
        res.render('editUser', { userInfos });
    })

    .catch(error => {
        return error;
    })
});

router.post('/editUser', (req, res) => {
    const updatedUser = req.body;

    const id = req.session.currentUser;

    User.findByIdAndUpdate(id, updatedUser)
    .then(() => {
        res.redirect('/dashboard')
    })

    .catch(error => {
        return error;
    })
});

router.post('/removeUser', (req,res) => {
    const id = req.session.currentUser;
    console.log(id)

    User.findByIdAndRemove(id)
    .then(() =>{
       res.redirect('/')
    })
    .catch(error => {
        console.log('Erro ao deletar usuário', error)
    })
});

router.get('/places/:category', (req, res) => {
    const { category } = req.params;
    
    const placesFromDb =  Place.find({ categoria: category })

    .then(placesFromDb => {
            res.render('places', { placesFromDb })
    })
})

router.get('/myReviews', (req, res) => {
    Review.find({ usuário: req.session.currentUser }).populate('lugar')   
        .then(myReviews => {
            res.render('myReviews', { myReviews })
        });
})




module.exports = router;