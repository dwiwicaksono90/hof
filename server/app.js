var express = require('express');
var path = require('path');
const cors = require('cors')
require('dotenv').config()

//DB
const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect(process.env.DB, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('> DB Connected')
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var threadsRouter = require('./routes/threads')
var answersRouter = require('./routes/answers')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/threads', threadsRouter);
app.use('/answers', answersRouter)


module.exports = app;
