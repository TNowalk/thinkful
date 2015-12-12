'use strict';

/**
 * Factory for Country endpoint: http://api.geonames.org/countryInfoJSON
 */
angular.module('CountriesApp').factory('CountryFactory', ['$http', 'GEONAMES_USERNAME', function($http, GEONAMES_USERNAME) {
  // Create an object to store properties and methods for the factory.
  // An object is created to avoid using this inside the object, this
  // will get lost in the context of the functions and we won't be able
  // to access any property/methods of the object using the this keyword
  var c = {
    // API endpoints
    endpoints: {
      country: 'http://api.geonames.org/countryInfoJSON',
      search: 'http://api.geonames.org/search',
      neighbors: 'http://api.geonames.org/neighbours',
      flag: 'http://www.geonames.org/flags/x/{%s}.gif',
      map: 'http://www.geonames.org/img/country/250/{%s}.png'
    },

    // Function to get the data for the supplied country
    get: function(country)  {
      var config = {
        params: {
          username: GEONAMES_USERNAME,
          country: country
        }
      };

      // Return the promise of the $http.get
      return $http.get(c.endpoints.country, config).then(function(res) {
        // Return here will pass the countries into the next .then() which
        // is in the CountriesCtrl. It's possible that this endpoint
        // will return more than one result, so for simplicity sake we'll just
        // return the first result here.
        return res.data.geonames[0];
      });
    },

    // Function to get the capital data for the supplied country
    capital: function(countryCode, capital)  {
      var config = {
        params: {
          username: GEONAMES_USERNAME,
          q: capital,
          name_equals: capital, // jshint ignore:line
          country: countryCode,
          isNameRequired: true,
          type: 'JSON'
        }
      };

      // Return the promise of the $http.get
      return $http.get(c.endpoints.search, config).then(function(res) {
        // Return here will pass the data into the next .then() which
        // is in the CountriesCtrl.  It's possible that the search endpoint
        // will return more than one result, so for simplicity sake we'll just
        // return the first result here.
        return res.data.geonames[0];
      });
    },

    // Function to get the neighbor data for the supplied country
    neighbors: function(geonameId)  {
      var config = {
        params: {
          username: GEONAMES_USERNAME,
          geonameId: geonameId,
          type: 'JSON'
        }
      };

      // Return the promise of the $http.get
      return $http.get(c.endpoints.neighbors, config).then(function(res) {
        // Return here will pass the data into the next .then() which
        // is in the CountriesCtrl.  It's possible that the search endpoint
        // will return more than one result, but this time we want all of those
        // results so we'll return the whole array.
        return res.data.geonames;
      });
    },

    // Function to generate the Flag source URL for the flag.
    flag: function(countryCode) {
      if (countryCode) {
        // Replace the placeholder with the lower case country code
        return c.endpoints.flag.replace('{%s}', countryCode.toLowerCase());
      }
    },

    // Function to generate the Map source URL for the flag.
    map: function(countryCode) {
      if (countryCode) {
        // Replace the placeholder with the upper case country code
        return c.endpoints.map.replace('{%s}', countryCode.toUpperCase());
      }
    }
  };

  // Return the object
  return c;
}]);