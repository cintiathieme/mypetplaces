const express = require('express');

const Place = require('../models/Place');
const User = require('../models/User');
const Review = require('../models/Review');

const fileUploader = require('../configs/cloudinary.config');

const router = express();


router.get('/dashboard', (req, res) => {
    const currentUser = req.session.currentUser;

    res.render('dashboard', { currentUser: req.session.currentUser });

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
        
        const places = await Review.find({ lugar: id })
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

router.post('/addPlace', fileUploader.single('newImage'), async (req, res) => {
    const { newPlace, newAdress, newSite, newCategory, newDescription } = req.body;
           
    try {
        const placeFromDb = await Place.findOne({ nome: newPlace });
        
        if (placeFromDb) {
            return res.render('addPlace', { placeError: 'Lugar já cadastrado' }); 
        }

        const addNewPlace = {
            nome: newPlace.toUpperCase(),
            endereco: newAdress,
            site: newSite,
            categoria: newCategory,
            descricao: newDescription,
            user: req.session.currentUser._id,
            image: req.file.path
        };
       
        await Place.create(addNewPlace);
        
        res.redirect('/dashboard');


    }catch (error) {
        console.log('Erro ao adicionar novo lugar', error)
    }
});

module.exports = router;