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

// GET /questions/:qID 
// Route to a specific question
router.get('/:qID', (req, res) => {
    res.json({
        response: "You sent a GET request to qID:" + req.params.qID
    })
});

// POST /questions/:qID/answers 
// Route to post an answer to a question
router.post('/:qID/answers', (req, res) => {
    res.json({
        response: "You sent a POST request",
        body: req.body,
        questionID: req.params.qID
    })
});

// GET /questions/:qID/answers/:aID
// Route to a specific answer to a question
router.get('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: `You sent a GET request to /${req.params.qID}/answers/${req.params.aID}`,
        questionID: req.params.qID,
        answerID: req.params.aID
    })
});

// PUT /questions/:qID/answers/:aID
// Route to update a specific answer to a question
router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: `You sent a PUT request to /${req.params.qID}/answers/${req.params.aID}`,
        questionID: req.params.qID,
        body: req.body,
        answerID: req.params.aID
    })
});

// DELETE /questions/:qID/answers/:aID
// Route to delete a specific answer to a question
router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: `You sent a DELETE request to /${req.params.qID}/answers/${req.params.aID}`,
        questionID: req.params.qID,
        answerID: req.params.aID
    })
});

// GET /questions/:qID/answers/:aID/vote-up
// Route to vote a specific answer to a question
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        const err = new Error('Not Found!');
        err.status = 404;
        next(err);
    }
    next()
}, (req, res) => {
    res.json({
        response: `You sent a Vote request to /${req.params.qID}/answers/${req.params.aID}/vote-${req.params.dir}`,
        questionID: req.params.qID,
        answerID: req.params.aID,
        vote: req.params.dir
    })
});

module.exports = router;