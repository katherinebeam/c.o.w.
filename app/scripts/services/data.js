'use strict';

function DataService ($http, $q) {

  this.getWordlings = function(cb) {
    $http.get('/api/wordlings').then(cb);
  };

  this.deleteWordling = function(wordling) {
    if (!wordling._id) {
      return $q.resolve();
    }
    return $http.delete('/api/wordlings/' + wordling._id).then(function() {
      console.log("I deleted the " + wordling.word + " wordling!");
    });
  };

  this.saveWordlings = function(wordlings) {
    var queue = [];
    wordlings.forEach(function(wordling) {
      var request;
      if(!wordling._id) {
        request = $http.post('/api/wordlings', wordling);
      } else {
        request = $http.put('/api/wordlings/' + wordling._id, wordling).then(function(result) {
          wordling = result.data.wordling;
          return wordling;
        });
      }
      queue.push(request);
    });
    return $q.all(queue).then(function(results) {
      console.log("I saved " + wordlings.length + " wordlings!");
    });
  };

}

module.exports = DataService;