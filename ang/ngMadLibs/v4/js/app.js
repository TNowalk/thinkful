'use strict';

angular.module('ngMadLibs',[]);
angular.module('ngMadLibs',[]).controller('MainCtrl', ['$scope', function($scope) {
  $scope.submitted = false;

  $scope.submit = function() {

  };

  $scope.reset = function() {
    $scope.submitted = false;
    $scope.data = '';
  };
}]);