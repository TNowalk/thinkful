'use strict';

/**
 * Controller for Countries.  Takes two dependencies, $scope and CountriesFactory.
 * CountriesFactory gets stored in th variable Countries.
 */
angular.module('CountriesApp').controller('CountryCtrl', ['$scope', '$q', '$location', '$route', 'CountryFactory', function($scope, $q, $location, $route, Country) {
  // Set an inital loading state to trigger a UI loading element
  $scope.loading = true;

  // Load the country details first
  Country.get($route.current.params.id).then(function(country) {
    // Once we have the country details, stick it in the scope
    $scope.country = country;

    // We're going to need to track all the rest of the promises, so create an array to hold them
    var promises = [];

    // Get the list of countries, stuff it in the promises array.  We pass in
    // the country object returned by the Country.get promise.  This way the
    // factory can search by the country code and capital name
    promises.push(Country.capital(country.countryCode, country.capital));

    // Now, grab the neighbors.  Same thing as before, we pass in some data
    // from the country object.  We stuff the promise in our promises array
    promises.push(Country.neighbors(country.geonameId));

    // $q.all takes an array of promises.  Only when all of the passed promises
    // are resolved successfully will the .then function of the .all be executed.
    // Doing this, we can ensure that all of our API calls were successful before
    // trying to show the data.  All of the results of the promise are stuffed
    // into the res variable which is an array.  The index matches of the res
    // matches the index of the promises.  For example, the first promise is at
    // index 0 in promises, so the results for that promise will be in res[0].
    $q.all(promises).then(function(res) {
      // Set the capital results into the scope
      $scope.capital = res[0];

      // Set the neighbors results into the scope.  It was the second promise
      // we added to the promises array so it was at index 1, so we need to
      // look in res[1] for the right data
      $scope.neighbors = res[1];

      // Update loading state to hide loading element and show table
      $scope.loading = false;
    });
  });

  // Function that will jump to a country view
  $scope.goToCountry = function(country) {
    if (country.countryCode) {
      $location.path('/countries/' + country.countryCode + '/capital');
    }
  };

  // Send the flag and map functions to the scope so they can be used in the UI
  $scope.flag = Country.flag;
  $scope.map = Country.map;
}]);