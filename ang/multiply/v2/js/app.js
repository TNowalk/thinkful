(function(angular) {
  'use strict';

  angular.module('MultiplicationApp', []);
  angular.module('MultiplicationApp')
    .controller('MultiplicationCtrl', ['$scope', '$attrs', function($scope, $attrs) {
      /**
       * Populate an array of numbers from 1 to upper limit
       * @param  {int}   x Upper limit of numbers
       * @return {array}   Array of numbers
       */
      var populateNumbers = function(x) {
        var numbers = [];
        for (var i = 1; i <= x; i++) {
          numbers.push(i);
        }
        return numbers;
      };

      /**
       * Multiplies two numbers
       * @param  {int} x First number to multiply
       * @param  {int} y Second number to multiply
       * @return {int}   Product
       */
      $scope.compute = function(x, y) {
        return x * y;
      };

      // Set up a watcher to keep an eye on the numberLimit, so it gets changed
      // at any point we recalculate the numbers array to update the table
      $scope.$watch('numberLimit', function(newLimit) {
        $scope.numbers = populateNumbers(newLimit);
      });

      // Check to see if there was an initial limit set in the attributes,
      // otherwise set default to 10
      $scope.numberLimit = $attrs.initialNumberLimit || 10;

      // Get all the numbers based on the limit
      $scope.numbers = populateNumbers($scope.numberLimit);
    }]);
})(angular);
