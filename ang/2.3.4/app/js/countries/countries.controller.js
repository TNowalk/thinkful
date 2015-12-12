'use strict';

/**
 * Controller for Countries.  Takes two dependencies, $scope and CountriesFactory.
 * CountriesFactory gets stored in th variable Countries.
 */
angular.module('CountriesApp').controller('CountriesCtrl', ['$scope', '$location', 'CountriesFactory', function($scope, $location, Countries) {
  // Set an inital loading state to trigger a UI loading element
  $scope.loading = true;

  // Get the list of countries
  Countries.get().then(function(res) {
    // Set the results into the scope
    $scope.countries = res;

    // Update loading state to hide loading element and show table
    $scope.loading = false;
  });

  // Function that will jump to a country view
  $scope.goToCountry = function(country) {
    if (country.countryCode) {
      $location.path('/countries/' + country.countryCode + '/capital');
    }
  };
}]);