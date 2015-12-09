'use strict';

/**
 * Factory for Countries endpoint: http://api.geonames.org/countryInfoJSON
 */
angular.module('CountriesApp').factory('CountriesFactory', ['$q', '$http', 'GEONAMES_USERNAME', function($q, $http, GEONAMES_USERNAME) {
  // Create an object to store properties and methods for the factory.
  // An object is created to avoid using this inside the object, this
  // will get lost in the context of the functions and we won't be able
  // to access any property/methods of the object using the this keyword
  var c = {
    // API endpoint
    endpoint: 'http://api.geonames.org/countryInfoJSON',

    // A place to cache the results from the API call
    cache: null,

    // Function to get the data
    get: function()  {
      if (!c.cache) {
        var config = {
          params: {
            username: GEONAMES_USERNAME
          }
        };
        // Return the promise of the $http.get
        return $http.get(c.endpoint, config).then(function(res) {
          // Stuff the Countries in the cache
          c.cache = res.data.geonames;

          // Return here will pass the countries into the next .then() which
          // is in the CountriesCtrl
          return c.cache;
        });
      }

      // If we got here, then our cache was set.  We can't just pass back the
      // data because the controller is expecting a promise, so we need to
      // create a promise and resolve it with the cached data

      // Create deferred object
      var deferred = $q.defer();

      // Resolve the promise
      deferred.resolve(c.cache);

      // Return the promise
      return deferred.promise;
    }
  };

  // Return the object
  return c;
}]);