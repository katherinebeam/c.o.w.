webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('wordlingsApp', []);

__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('wordlingsApp')
.controller('mainController', function($scope, $log, $interval, dataService){

  $scope.seconds = 0;

  $scope.counter = function() {
    $scope.seconds++;
    $log.log($scope.seconds + ' seconds have passed.');
  }
  $interval($scope.counter, 1000, 10);

  dataService.getWordlings(function(response){
    var wordlings = response.data.wordlings;
    $scope.wordlings =  wordlings;
    });

  $scope.addWordling = function() {
    $scope.wordlings.unshift(
        {
            word: "This is a new wordling.",
            definition: "Defined."
        }
    );
  };

});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('wordlingsApp')
.controller('wordlingsController', function($scope, dataService) {
  $scope.deleteWordling = function(wordling, index) {
    $scope.wordlings.splice(index, 1);
    dataService.deleteWordling(wordling);
  };

  $scope.saveWordlings = function() {
    var filteredWordlings = $scope.wordlings.filter(function(wordling){
      if(wordling.edited) {
        return wordling;
      }
    });
    dataService.saveWordlings(filteredWordlings)
    .finally($scope.resetWordlingState);
  };

  $scope.resetWordlingState = function() {
    $scope.wordlings.forEach(function(wordling) {
      wordling.edited = false;
    });
  };
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('wordlingsApp')
.directive('wordling', function(){
  return {
    templateUrl: 'templates/wordling.html',
    replace: true,
    controller: 'wordlingsController'
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('wordlingsApp')
.service('dataService', function($http, $q) {
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

});


/***/ })
],[1]);