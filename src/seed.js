'use strict';

var Wordling = require('./models/wordling.js');

var wordlings = [
    'Toe',
    'Thomas',
    'Volcano'
];

wordlings.forEach(function(wordling, index) {
    Wordling.find({'word': wordling}, function(err, wordlings) {
        if(!err && !wordlings.length) {
            Wordling.create({wordling: wordling});
        }
    })
});