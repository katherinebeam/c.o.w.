'use strict';

var express = require('express');
var Wordling = require('../models/wordling');

var router = express.Router();

router.get('/wordlings', function(req, res) {
	Wordling.find({}, function(err, wordlings) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({ wordlings: wordlings });
	});
});

router.post('/wordlings', function(req, res) {
	var wordling = req.body;
	Wordling.create(wordling, function(err, wordling) {
		if(err) {
			return res.status(500).json({err: err.message});
		}
		res.json({'wordling': wordling, message: "Wordling created."});
	});
});

router.put('/wordlings/:id', function(req, res) {
	var id = req.params.id;
	var wordling = req.body;
	if(wordling && wordling._id !== id) {
		return res.status(500).json({err: "IDs don't match."});
	}
	Wordling.findByIdAndUpdate(id, wordling, {new: true}, function(err, wordling) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
	});
	res.json({'wordling': wordling, message: "Wordling updated."});
});

router.delete('/wordlings/:id', function(req, res) {
  var id = req.params.id;
  Wordling.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Wordling Deleted' });
  });
});

module.exports = router;