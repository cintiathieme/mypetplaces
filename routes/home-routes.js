const express = require('express');

const router = express();

router.get('/', (req, res) => {
    res.render('home')
    console.log(JSON.stringify(req.session.currentUser))
});

module.exports = router;
