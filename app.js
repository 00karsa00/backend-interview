const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const todoList = require('./src/todoListRouter');
const viewRouter = require('./src/viewRouter')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/todoList', todoList);
app.use('/',viewRouter)


app.listen(8081, () => {
    console.log('Server Start on Port 8081');
})

