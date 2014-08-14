(function(angular) {
  'use strict';

  angular.module('MultiplicationApp', []);
  angular.module('MultiplicationApp')
    .controller('MultiplicationCtrl', ['$scope', function($scope) {
      $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }]);
})(angular);
