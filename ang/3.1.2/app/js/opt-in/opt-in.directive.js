'use strict';

angular.module('SignUpApp').directive('optIn', function() {
  return {
    templateUrl: 'js/opt-in/opt-in.html',
    restrict: 'E',
    transclude: true
  };
});