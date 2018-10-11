'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// sorting by vote and updated at helper function
const sortAnswers = (objectA, objectB) => {
    if (objectA.votes === objectB.votes) {
        return objectB.updatedAt - objectA.updatedAt;
    }
    return objectB - objectA;
};

// model schemas
const AnswerSchema = new Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    votes: {
        type: Number,
        default: 0
    }
});

AnswerSchema.method('update', (updates, callback) => {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
});

AnswerSchema.method('vote', (vote, callback) => {
    if (vote === 'up') {
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);
});

const QuestionSchema = new Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    answers: [AnswerSchema]
});

QuestionSchema.pre('save', next => {
    if (this.answers) {
        this.answers.sort(sortAnswers);
    }
    next();
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;