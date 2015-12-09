'use strict';

// Create module (app)
angular.module('CountriesApp', ['ngRoute']);

// Set a constant (value that won't change) that will be available throughout the app
angular.module('CountriesApp').constant('GEONAMES_USERNAME', 'tnowalk');

// Run block for module
angular.module('CountriesApp').run(['$rootScope', '$location', function($rootScope, $location) {
  // If the route fails, route to /404
  $rootScope.$on('$routeChangeError', function() {
    $location.path('/404');
  });
}]);

// Config block for app
angular.module('CountriesApp').config(['$routeProvider', function($routeProvider) {
  // Set up the routes
  $routeProvider
    .when('/', {
      templateUrl: 'js/home/home.html'
    })
    .when('/404', {
      template : '<p>Error - Page Not Found</p>'
    })
    .otherwise('/404');
}]);