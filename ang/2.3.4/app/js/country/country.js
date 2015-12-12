'use strict';

/**
 * Config block to create routes specific to a single country
 */
angular.module('CountriesApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/countries/:id/capital', {
      templateUrl: 'js/country/country.html',
      controller: 'CountryCtrl'
    });
}]);