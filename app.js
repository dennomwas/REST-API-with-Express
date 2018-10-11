'use strict';

const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();

// local imports
const route = require('./routes') // import all routes

// to log http status codes to console
app.use(logger('dev'));

// parse incoming requests to json 
app.use(jsonParser());

// Mongodb connection using mongoose
mongoose.connect('mongodb://localhost:27017/question-and-answer', {
    useNewUrlParser: true
});
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('connection error:', err);
});

db.once('open', () => {
    console.log('db connection successful!')
});

// set up interaction with browsers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if ( req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});

// create our routes
app.use('/questions', route);

// catch 404 errors
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handlers
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// define server port
const port = process.env.PORT || 3000;

// run the express server
app.listen(port, () => {
    console.log('Express server is listening on localhost:',port);
});