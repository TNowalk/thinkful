// For more information on IIFE, read here: http://gregfranko.com/blog/i-love-my-iife/
(function($) {
  'use strict';

  const URL = 'https://www.googleapis.com/youtube/v3/search';
  const KEY = 'AIzaSyBBwBu10r17Cly5Kg_nRoFlejoaFAqgX5o';

  var loading = $('<div class="loading text-center">' +
                     '<i class="fa fa-refresh fa-spin"></i>' +
                   '</div>');

  /**
   * Searc YouTube API for query
   * @param {string}   q      Query string to search for
   * @param {function} cb     Callback function
   * @param {string}   target HTML selector
   */
  var videoSearch = function(q, cb, target) {
    // Show loading message
    $(target).html(loading);

    // Set up parameters, all required for API
    var params = {
      part: 'snippet',
      key: KEY,
      q: q,
      maxResults: 25
    };

    // Get JSON data from API, results will be stored in res
    $.getJSON(URL, params, function(res) {
      // Execute the callback with the results
      cb(res.items, target);
    });
  };

  /**
   * Display thumbnail, title, and descriptions of results
   * @param {array}  data   Array of video objects from API
   * @param {string} target HTML selector
   */
  var displayThumbnails = function(data, target) {
    // Hide loading message
    $(target).empty();

    // If there are videos
    if (data.length) {
      // Loop through each video
      $.each(data, function(idx, video) {
        /**
         * HTML to be produced
         *
         * <div class="media">
         *   <div class="media-left">
         *     <a href="#">
         *       <img class="media-object" src="..." alt="...">
         *     </a>
         *   </div>
         *   <div class="media-body">
         *     <h4 class="media-heading">Media heading</h4>
         *     ...
         *   </div>
         * </div>
         */
        var html =
          '<div class="media">' +
            '<div class="media-left">' +
              '<a href="https://www.youtube.com/watch?v=' + video.id.videoId + '" target="_blank">' +
                '<img class="media-object" src="' + video.snippet.thumbnails.default.url + '" alt="' + video.snippet.title + '">' +
              '</a>' +
            '</div>' +
            '<div class="media-body">' +
              '<h4 class="media-heading">' +
                '<a href="https://www.youtube.com/watch?v=' + video.id.videoId + '" target="_blank">' +
                  video.snippet.title +
                '</a>' +
              '</h4>' +
              video.snippet.description +
            '</div>' +
          '</div>';

        // Set the HTML of the results div
        $(target).append(html);
      });
    }
  };

  /**
   * Event listener for submit on form
   */
  $('#search-form').on('submit', function() {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Grab the value in the search bar
    var q = $('#search-query').val();

    // If not empty, then perform search
    if (q.trim().length > 0) {
      videoSearch(q.trim(), displayThumbnails, '.results');
    }
  })
})(jQuery);