'use strict';

const express = require('express');
const router = express.Router();

//local imports
const Question = require('../models').Question;

router.param('qID', (req, res, next, id) => {
    Question.findById(id, (err, doc) => {
        if (err) return next(err);
        if (!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});

router.param('aID', (req, res, next, id) => {
    req.answer = req.question.answers.id(id);
    if (!req.answer) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
    }
    return next();

})

// GET /questions 
// Route to all questions
router.get('/', (req, res, next) => {
    Question.find({})
        .sort({createdAt: -1 })
        .exec((err, questions) => {
            if (err) return next(err);
            res.json(questions);
        });
});

// POST /questions 
// Route to create questions
router.post('/', (req, res, next) => {
    const question = new Question(req.body);
    question.save((err, question) => {
        if (err) return next(err);
        res.status(201);
        res.json(question);
    });
});

// GET /questions/:qID 
// Route to a specific question
router.get('/:qID', (req, res) => {
    res.json(req.question);
});

// POST /questions/:qID/answers 
// Route to post an answer to a question
router.post('/:qID/answers', (req, res, next) => {
    req.question.answers.push(req.body);
    req.question.save((err, question) => {
        if (err) return next(err);
        res.status(201);
        res.json(question);
    });
});

// GET /questions/:qID/answers/:aID
// Route to a specific answer to a question
router.get('/:qID/answers/:aID', (req, res) => {
    req.json(res.answers);
});

// PUT /questions/:qID/answers/:aID
// Route to update a specific answer to a question
router.put('/:qID/answers/:aID', (req, res, next) => {
    req.answer.update(req.body, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

// DELETE /questions/:qID/answers/:aID
// Route to delete a specific answer to a question
router.delete('/:qID/answers/:aID', (req, res) => {
    req.answer.remove((err) => {
        req.question.save((err, question) => {
            if (err) return next(err);
            res.status(201);
            res.json(question);
        });
    });
});

// GET /questions/:qID/answers/:aID/vote-up
// Route to vote a specific answer to a question
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        const err = new Error('Not Found!');
        err.status = 404;
        next(err);
    } else {
        req.vote = req.params.dir;
        next();
    }
}, (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
        if (err) return next(err);
        res.json(question);
    });
});

module.exports = router;