'use strict';

/**
 * Config block to create routes specific to the countries
 */
angular.module('CountriesApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/countries', {
      templateUrl: 'js/countries/countries.html',
      controller: 'CountriesCtrl'
    });
}]);