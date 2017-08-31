'use strict';

function WordlingsController ($scope, dataService) {

  $scope.deleteWordling = function(wordling, index) {
    dataService.deleteWordling(wordling).then(function() {
      $scope.wordlings.splice(index, 1);
    });
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
}

module.exports = WordlingsController;