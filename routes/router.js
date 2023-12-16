const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();

// PAGES
router.get('/', (req, res) => {
    res.render('Home', {myVariable:"Variable added"});
});

router.get('/about', (req, res) => {
    res.render('About');
});




// ADD PAGE
router.get('/add', (req, res) => {
    res.render('Add');
});

// EDIT PAGE
router.get('/diary/edit/:id', (req, res) => {
    Diary.findOne({
        _id:req.params.id
    }).then((data) => {
        res.render('Edit', {data:data})
    }).catch((error) => console.log(error));
});

// GET ALL
router.get('/diary', (req, res) => {
    Diary.find().then((data) => {
        res.render('Diary', {data: data});
    }).catch((error) => console.log(error));
});

// GET ONE
router.get('/diary/:id', (req, res) => {
    Diary.findOne({
        _id:req.params.id
    }).then((data) => {
        res.render('Page', {data:data})
    }).catch((error) => console.log(error));
});

// POST
router.post('/diary/post', (req, res) => {

    const Data = new Diary({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })
    Data.save().then(() => {
        res.redirect('/diary');
    }).catch((error) => console.log(error));
});

// UPDATE
router.put('/diary/edit/:id', (req, res) => {
    Diary.findOne({
        _id:req.params.id
    }).then((data) => {
        data.title = req.body.title,
        data.description = req.body.description,
        data.date = req.body.date

        data.save().then(() =>{
            res.redirect('/diary');
        }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
});

// DELETE
router.delete('/diary/delete/:id', (req, res) => {
    Diary.deleteOne({
        _id: req.params.id
    }).then(() => {
       res.redirect('/diary');
    }).catch((error) => console.log(error));
});

module.exports = router;