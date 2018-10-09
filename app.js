'use strict';

const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const app = express();

// local imports
const route = require('./routes') // import all routes

// to log http status codes to console
app.use(logger('dev'));

// parse incoming requests to json 
app.use(jsonParser());

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
    console.log('Express server is listening on port', port);
});