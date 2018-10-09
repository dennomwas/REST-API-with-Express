'use strict';

const express = require('express');
const jsonParser = require('body-parser').json;
const app = express();

// local imports
const route = require('./routes')

// define server port
const port = process.env.PORT || 3000;

// parse incoming json requests
app.use(jsonParser());

// create main routes
app.use('/questions', route);

// run the express server
app.listen(port, () => {
    console.log('Express server is listening on port', port);
});