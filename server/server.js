var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
    res.send({
        todos});    
    }, (e) => {
    res.status(400).send(e);    
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
    
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};

//var newTodo = new Todo({
//    text: 'Cook dinner'
//});

//var otherTodo = new Todo({
//});
//
//otherTodo.save().then((doc) => {
//    console.log(JSON.stringify(doc, undefined, 2));
//}, (e) => {
//    console.log('Unable . to save', e);
//});


//newTodo.save().then((doc) => {
//    console.log('Saved todo', doc)
//}, (e) => {
//    console.log('Unable to save todo')
//});


//User
//email - require it - trim it - set type - set min legnth of 1

//
//var user = new User({
//    email: 'ben@example.com '
//});
//
//user.save().then((doc) => {
//    console.log('User saved', doc);
//}, (e) => {
//    console.log('Unable to save user', e)
//});