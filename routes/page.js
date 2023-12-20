const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Home');
});

router.get('/add', (req, res) => {
    res.render('Add');
});

module.exports = router;