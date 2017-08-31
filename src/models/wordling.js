'use strict';

var mongoose = require('mongoose');

var wordlingSchema = new mongoose.Schema({
    word: String,
    definition: String
});

var model = mongoose.model('Wordling', wordlingSchema);

module.exports = model;