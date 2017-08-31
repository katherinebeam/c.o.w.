'use strict';

function MainController ($scope, dataService) {

  dataService.getWordlings(function(response){
    var wordlings = response.data.wordlings;
    $scope.wordlings = wordlings;
  });

  $scope.addWordling = function() {
    $scope.wordlings.unshift({word: "This is a new wordling.",
                      definition: "Define it."});
  };

}

module.exports = MainController;