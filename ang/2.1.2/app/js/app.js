'use strict';

angular.module('OWMApp', ['ngRoute']);

angular.module('OWMApp').value('owmCities', ['New York', 'Dallas', 'Chicago']);

angular.module('OWMApp').run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function() {
    $location.path('/error');
  });
}]);

angular.module('OWMApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl as Home'
    })
    .when('/cities/:city', {
      templateUrl: 'partials/city.html',
      controller: 'CityCtrl as City',
      resolve: {
        city: ['owmCities', '$route', '$location', function(owmCities, $route, $location) {
          var city = $route.current.params.city;
          if(owmCities.indexOf(city) === -1 ) {
            $location.path('/error');
            return;
          }
          return city;
        }]
      }
    })
    .when('/error', {
      template : '<p>Error - Page Not Found</p>'
    })
    .otherwise('/error');
}]);

angular.module('OWMApp').controller('HomeCtrl', [function() {
  this.welcomeMessage = 'Welcome Home';
}]);

angular.module('OWMApp').controller('CityCtrl', ['city', function(city) {
  this.city = city;
}]);