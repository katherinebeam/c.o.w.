'use strict';

function WordlingDirective () {
  return {
    templateUrl: 'templates/wordling.html',
    replace: true,
    controller: 'wordlingsController'
  }
}

module.exports = WordlingDirective;