const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

const Place = require('../models/Place');
const User = require('../models/User');
const Review = require('../models/Review');

const fileUploader = require('../configs/cloudinary.config');

const router = express();


router.get('/dashboard', async (req, res) => {
    const currentUser = req.session.currentUser;
    const placesFromDb = await Place.find();
        res.render('dashboard', { currentUser, placesFromDb });
        const { coordenadas } = placesFromDb;
        console.log({coordenadas})
});

router.get('/editUser', (req, res) => {
    const userInfos = req.session.currentUser;
    
    User.findById(userInfos._id)
        .then(userInfos => {
            res.render('editUser', { userInfos, currentUser: req.session.currentUser });
        })
        .catch(error => {
            return error;
        })
});

router.post('/editUser', (req, res) => {
    const updatedUser = req.body;

    const id = req.session.currentUser;
    
    if(updatedUser.nome.trim().length === 0 || updatedUser.email.trim().length === 0) {
        return res.redirect('/editUser')
    }

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
   
    User.findByIdAndRemove(id)
        .then(() =>{
            res.redirect('/')
        })
        .catch(error => {
            console.log('Erro ao deletar usuário', error)
        })
});

router.get('/places/:category', async (req, res) => {
    const { category } = req.params;
    
    const placesFromDb =  await Place.find({ categoria: category })
    
    const placesWithReviewPromises = placesFromDb.map( async place => {
        const parsedPlace = place.toJSON();
        const id = parsedPlace._id
        
        const places = await Review.find({ lugar: id }).populate('emissor')
        const reviews = {...parsedPlace, reviews: places}
        return reviews
        
    }); 

    const placesWithReview = await Promise.all(placesWithReviewPromises)

    res.render('places', { placesWithReview, currentUser: req.session.currentUser })
});

router.get('/addReview/:id', (req, res) => {
    const { id } = req.params; 

    Place.findById(id)
        .then(placeFromDb => {
            res.render('placeDetail', { placeFromDb, currentUser: req.session.currentUser })
        });
});

router.post('/addReview/:id', (req,res) => {
    const placeId = req.params;
    
    const { review } = req.body;

    const newReview = {
            lugar: placeId.id,
            desc: review,
            emissor: req.session.currentUser._id
    }
     
    Review.create(newReview)
        .then(placeFromDb => {
            res.redirect('/myReviews')
        })  
       .catch(error => {
           console.log(error)
       })    
})

router.get('/myReviews', (req, res) => {
    Review.find({ emissor: req.session.currentUser }).populate('lugar')   
        .then(myReviews => {
            res.render('myReviews', { myReviews, currentUser: req.session.currentUser })
        });
})


router.post('/myReviews/delete/:id', (req,res) => {
    const { id } = req.params;
    
    Review.findByIdAndRemove(id)
        .then(() =>{
           res.redirect('/myReviews')
        })
        .catch(error => {
            console.log('Erro ao deletar review', error)
        })
});

router.post('/myReviews/edit/:id', (req, res) => {
    const { id } = req.params;
    
    const { updatedReview } = req.body;

    Review.findByIdAndUpdate(id, { desc: updatedReview } )
        .then(() => {
            res.redirect(`/myReviews`)
        })
        .catch(error => {
            console.log(error)
        })          
});   

router.get('/addPlace', (req, res) => {
    res.render('addPlace', { currentUser: req.session.currentUser })
}); 

router.post('/addPlace', fileUploader.single('placeImage'), async (req, res) => {
    const { newPlace, placeAddress, placeNumber, placeCity, placeState, placeSite, placeCategory, placeHours, placeDescription } = req.body;
           
    try {
        const placeFromDb = await Place.findOne({ nome: newPlace.toUpperCase() });
        
        if (placeFromDb) {
            return res.render('addPlace', { placeError: '*Lugar já cadastrado' }); 
        }

        const response = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}&address=${encodeURI(`${placeAddress},${placeNumber}`)}`);

        const addNewPlace = {
            nome: newPlace.toUpperCase(),
            endereco: placeAddress,
            numero: placeNumber,
            cidade: placeCity,
            estado: placeState,
            site: placeSite,
            horario: placeHours,
            categoria: placeCategory,
            coordenadas: {
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng
            },
            descricao: placeDescription,
            usuario: req.session.currentUser._id,
            imagem: req.file.path
        };
       
        await Place.create(addNewPlace);
       
        
        res.redirect('/dashboard');


    }catch (error) {
        console.log('Erro ao adicionar novo lugar', error)
    }
});

module.exports = router;