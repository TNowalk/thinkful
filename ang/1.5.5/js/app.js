'use strict';

angular.module('InstagramSearcher', ['infinite-scroll', 'masonry']);

angular.module('InstagramSearcher').constant('API_URL', 'https://api.instagram.com/v1/tags/{tag}/media/recent');

/**
 * Instagram service
 */
angular.module('InstagramSearcher').factory('InstagramService', ['$q', '$http', 'API_URL', function($q, $http, API_URL) {
  var s = {
    /**
     * Flag if initial search complete
     * @type {Boolean}
     */
    searched: false,

    /**
     * Flag if currently loading results
     * @type {Boolean}
     */
    loading: false,

    /**
     * Current query
     * @type {null|string}
     */
    query: null,

    /**
     * Array of images
     * @type {Array}
     */
    images: [],

    /**
     * Max tag ID to be used for paginated results
     * @type null|int
     */
    maxTagId: null,

    /**
     * Last error message
     * @type {String}
     */
    lastError: '',

    /**
     * Indicates if last search had an error
     * @type {Boolean}
     */
    hasError: false,

    /**
     * Search Instagram API
     * @param  String q Query string
     * @return $promise Angular promise
     */
    search: function(q) {
      q = q || null;

      // If nothing passed, this is a .next() call
      if (q === null) {
        if (s.query === null) {
          // No searches yet
          return;
        }
        q = s.query;
      } else {
        // This is a new search query, reset some flags
        s.query = q;
        s.searched = false;
        s.images = [];
      }

      // Set loading flag
      s.loading = true;

      // Set up deferred promise
      var deferred = $q.defer();

      // Set up config for GET params
      var config = {
        params: {
          callback: 'JSON_CALLBACK',
          client_id: '2986d0941e7f430db5544c19f30adbe3'
        }
      };

      // If max tag ID is set, then grab the next set of results
      if (s.maxTagId !== null) {
        config.params.max_tag_id = s.maxTagId;
      }

      // Reset error message and flag
      s.lastError = '';
      s.hasError  = false;

      // Set current query
      s.query = q;

      // Make HTTP request
      var req = $http.jsonp(API_URL.replace('{tag}', q), config);

      // Create success callback
      req.success(function(data) {
        // Set next max tag ID
        s.maxTagId = data.pagination.next_max_tag_id;

        // Loop through images and push them into the array
        angular.forEach(data.data, function(image) {
          s.images.push(image);
        });

        // Reset loading flag
        s.loading = false;

        // Set searched flag
        s.searched = true;

        // Resolve the promise
        deferred.resolve(data);
      });

      // Create error callback
      req.error(function(err) {
        // Set last error string
        s.lastError = err;

        // Set error flag
        s.hasError = true;

        // Reset loading flag
        s.loading = false;

        // Set searched flag
        s.searched = true;

        // Reject the promise
        deferred.reject(err);
      });

      // Return the promise
      return deferred.promise;
    },

    /**
     * Load the next set of results for the current query
     */
    next: function() {
      // Prevent searches from stacking up
      if (s.loading) {
        return;
      }

      s.search();
    }
  };

  return s;
}]);

/**
 * Search controller
 */
angular.module('InstagramSearcher').controller('SearchCtrl', ['$scope', 'InstagramService', function($scope, InstagramService) {
  $scope.query = '';

  /**
   * Call Instagram Service
   * @return {[type]} [description]
   */
  $scope.search = function() {
    if ($scope.searchForm.$valid) {
      InstagramService.search($scope.query);
      $scope.query = '';
    }
  };
}]);

/**
 * Results controller
 */
angular.module('InstagramSearcher').controller('ResultsCtrl', ['$scope', 'InstagramService', function($scope, InstagramService) {
  $scope.instagram = InstagramService;
}]);
