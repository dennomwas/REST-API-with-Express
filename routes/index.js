'use strict';

const express = require('express');
const router = express.Router();

// GET /questions 
// Route to all questions
router.get('/', (req, res) => {
    res.json({
        response: "You sent a Get request"
    })
});

// POST /questions 
// Route to create questions
router.post('/', (req, res) => {
    res.json({
        response: "You sent a POST request",
        body: req.body
    })
});

// GET /questions/:id 
// Route to a specific question
router.get('/:id', (req, res) => {
    res.json({
        response: "You sent a GET request to ID:" + req.params.id
    })
});

module.exports = router;