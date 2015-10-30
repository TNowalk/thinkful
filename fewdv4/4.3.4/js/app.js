// For more information on IIFE, read here: http://gregfranko.com/blog/i-love-my-iife/
(function($) {
  'use strict';

  const TMDB_API_KEY = 'ea0cef364431ca33c45f96adaeacaeab';
  const TMDB_API_URL = 'https://api.themoviedb.org/3/';
  const TMDB_IMG_URL = 'http://image.tmdb.org/t/p/w300';

  // Set up the default GET parameters that the API requires
  var defaultParams = {
    api_key: TMDB_API_KEY // API Key
  };

  // Load templates
  $.templates({
    loading: '#loading-template',
    leftMenu: '#left-menu-template',
    movieSection: '#movie-section-template'
  });

  // Loading template is static, so we can store it in a variable
  var loadingHtml = $.templates.loading.render();

  // Load the menu
  loadMenu('.left-menu');

  // Load Home Page
  loadHomePage('.main-content');

  $('.left-menu').on('click', '.list-group-item', function() {
    event.preventDefault();

    $('.left-menu .list-group-item').removeClass('active');

    $(this).addClass('active');

    var id = $(this).data('id');

    if (id === 'home') {
      loadHomePage('.main-content');
    } else {
      loadGenre('.main-content', id, $(this).text());
    }
  });

  function loadMenu(target) {
    // Set content of menu to loading
    $(target).html(loadingHtml);

    // Make the AJAX call
    $.ajax({
      url: TMDB_API_URL + 'genre/movie/list',
      data: defaultParams,
      type: 'GET'
    }).done(function(res) {
      // If we got bad results, show error message
      if (res.genres !== undefined) {
        $(target).html($.templates.leftMenu.render(res));
      }
    });
  }

  function loadHomePage(target) {
    // Set content to loading
    $(target).html(loadingHtml);

    var data = {};

    $.when(
      $.get(TMDB_API_URL + 'movie/now_playing', defaultParams, function(res) {
        data.nowPlaying = res;
      }),
      $.get(TMDB_API_URL + 'movie/popular', defaultParams, function(res) {
        data.popular = res;
      }),
      $.get(TMDB_API_URL + 'movie/upcoming', defaultParams, function(res) {
        data.upcoming = res;
      })
    ).then(function() {
      $(target).empty();

      if (data.nowPlaying.results.length) {
        for (var i = 0; i < data.nowPlaying.results.length; i++) {
          if (!data.nowPlaying.results[i].poster_path) {
            data.nowPlaying.results.splice(i, 1);
          } else {
            data.nowPlaying.results[i].posterSrc = TMDB_IMG_URL + data.nowPlaying.results[i].poster_path;
          }
        }

        $(target).append($.templates.movieSection.render({
          title: 'Now Playing',
          movies: data.nowPlaying.results.slice(0, 8)
        }));
      }

      if (data.popular.results.length) {
        for (var i = 0; i < data.popular.results.length; i++) {
          if (!data.popular.results[i].poster_path) {
            data.popular.results.splice(i, 1);
          } else {
            data.popular.results[i].posterSrc = TMDB_IMG_URL + data.popular.results[i].poster_path;
          }
        }

        $(target).append($.templates.movieSection.render({
          title: 'Popular',
          movies: data.popular.results.slice(0, 8)
        }));
      }

      if (data.upcoming.results.length) {
        for (var i = 0; i < data.upcoming.results.length; i++) {
          if (!data.upcoming.results[i].poster_path) {
            data.upcoming.results.splice(i, 1);
          } else {
            data.upcoming.results[i].posterSrc = TMDB_IMG_URL + data.upcoming.results[i].poster_path;
          }
        }
        $(target).append($.templates.movieSection.render({
          title: 'Upcoming',
          movies: data.upcoming.results.slice(0, 8)
        }));
      }
    });
  }

  function loadGenre(target, id, name) {
    // Set content to loading
    $(target).html(loadingHtml);

    $.get(TMDB_API_URL + 'genre/' + id + '/movies', defaultParams, function(res) {
      $(target).empty();

      if (res.results.length) {
        for (var i = 0; i < res.results.length; i++) {
          if (!res.results[i].poster_path) {
            res.results.splice(i, 1);
          } else {
            res.results[i].posterSrc = TMDB_IMG_URL + res.results[i].poster_path;
          }
        }

        $(target).append($.templates.movieSection.render({
          title: name,
          movies: res.results
        }));
      }
    });
  }
})(jQuery);