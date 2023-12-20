const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/', (req, res) => {

    Todo.find().then((data) => {
        res.render('Todo', {data: data});
    }).then(() => console.log(data))
    .catch((error) => console.log(error));
});

router.get('/:id', (req, res) => {
    Todo.findOne({
        _id:req.params.id
    }).then((data) => {
        res.render('Page', {data:data})
    }).catch((error) => console.log(error));
});

router.post('/post', (req, res) => {

    const Data = new Todo({
        title: req.body.title,
        description: req.body.description
    });

    Data.save().then(() => {
        res.redirect('/todo');
    }).catch((error) => console.log(error));
});

router.get('/edit/:id', (req, res) => {

    Todo.findOne({
        _id:req.params.id
    }).then((data) => {
        res.render('Edit', {data:data})
    }).catch((error) => console.log(error));
});

router.put('/edit/:id', (req, res) => {

    Todo.findOne({
        _id:req.params.id
    }).then((data) => {
        data.title = req.body.title,
        data.description = req.body.description

        data.save().then(() =>{
            res.redirect('/todo');
        }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
});

router.delete('/delete/:id', (req, res) => {
    Todo.deleteOne({
        _id: req.params.id
    }).then(() => {
       res.redirect('/todo');
    }).catch((error) => console.log(error));
});

module.exports = router;