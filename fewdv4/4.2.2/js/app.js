// For more information on IIFE, read here: http://gregfranko.com/blog/i-love-my-iife/
(function($) {
  'use strict';

  const UNANSWERED_URL = 'http://api.stackexchange.com/2.2/questions/unanswered';
  const INSPIRATION_URL = 'http://api.stackexchange.com/2.2/tags/{%s}/top-answerers/all_time';

  // Load templates
  $.templates({
    loading: '#loading-template',
    error: '#error-template',
    questions: '#questions-template',
    question: '#question-template',
    inspiration: '#inspiration-template',
    answerer: '#answerer-template'
  });

  // Converter for nice date/times
  $.views.converters({
    ago: function(time) {
      return moment.unix(time).fromNow();
    },
    toUpperCase: function(str) {
      return str.toUpperCase();
    },
    kFormat: function(num) {
      return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
    }
  });

  // Loading template is static, so we can store it in a variable
  var loadingHtml = $.templates.loading.render();

  // Clear the content when the tab is changed
  $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
    $('.unanswered-results, .inspiration-results').empty();
  });

  // Event listener for unanswered form submission
  $('.unanswered-getter').on('submit', function() {
    // Stop the browser from submitting the form and refreshing the page
    event.preventDefault();

    // Grab the tags
    var tags = $(this).find('#tags').val();

    // Reset input
    $(this).find('#tags').val('').blur();

    // Replace any commas or spaces with a semi-colon.  This is the
    // delimiter that the API is expecting
    tags = tags.replace(/,|\s+/, ';');

    // Set string to all capitals
    tags = tags.toUpperCase();

    // Get unanswered questions
    getUnansweredQuestions(tags, '.unanswered-results', displayUnansweredQuestions);
  });

  // Event listener for inspiration form submission
  $('.inspiration-getter').on('submit', function() {
    // Stop the browser from submitting the form and refreshing the page
    event.preventDefault();

    // Grab the tag
    var tag = $(this).find('#tag').val();

    // Reset input
    $(this).find('#tag').val('').blur();

    // Set the tag to lowercase
    tag = tag.toLowerCase();

    // Get the answerers
    getInspiration(tag, '.inspiration-results', displayInspiration)
  });

  /**
   * Gets a list of questions on Stack overflow for the provided tags
   * that don't have an accepted answer yet
   * @param  {array}    tags   Array of tags
   * @param  {string}   target Target HTML selector
   * @param  {Function} cb     Callback function
   * @return null
   */
  var getUnansweredQuestions = function(tags, target, cb) {
    // Show a loading message
    $(target).html(loadingHtml);

    // Set up the GET parameters that the API requires
    var params = {
      tagged: tags,          // These are the tags we're looking up
      site: 'stackoverflow', // The Stack Exchange site to look in
      order: 'desc',         // Order of the results
      sort: 'creation'       // Sort by creation date
    };

    // Make the AJAX call
    $.ajax({
      url: UNANSWERED_URL,
      data: params,
      dataType: 'jsonp',
      type: 'GET'
    }).done(function(res) {
      // If we got bad results, show error message
      if (res.items == undefined) {
        $(target).html($.templates.error.render({msg: 'Invalid results'}));
      } else {
        // Otherwise, execute callback function
        cb(tags, target, res.items);
      }
    }).fail(function(xhr, err) {
      // If the AJAX call failed, show error message
      $(target).html($.templates.error.render({msg: err}));
    });
  };

  /**
   * Gets a list of top answerers for the provided tag
   * @param  {string}   tag    Tag name to look up
   * @param  {string}   target Target HTML selector
   * @param  {Function} cb     Callback function
   * @return null
   */
  var getInspiration = function(tag, target, cb) {
    // Show a loading message
    $(target).html(loadingHtml);

    // Set up the GET parameters that the API requires
    var params = {
      site: 'stackoverflow' // The Stack Exchange site to look in
    };

    // Need to inject the tag into the URL
    var url = INSPIRATION_URL.replace('{%s}', tag);

    // Make the AJAX call
    $.ajax({
      url: url,
      data: params,
      dataType: 'jsonp',
      type: 'GET'
    }).done(function(res) {
      // If we got bad results, show error message
      if (res.items == undefined) {
        $(target).html($.templates.error.render({msg: 'Invalid results'}));
      } else {
        // Otherwise, execute callback function
        cb(tag, target, res.items);
      }
    }).fail(function(xhr, err) {
      // If the AJAX call failed, show error message
      $(target).html($.templates.error.render({msg: err}));
    });
  };

  /**
   * Display the provided questions in the DOM
   * @param  {array}  tags      Array of tags
   * @param  {string} target    Target HTML selector
   * @param  {array}  questions Array of question objects
   * @return null
   */
  var displayUnansweredQuestions = function(tags, target, questions) {
    // Template data for questions
    var questionsData = {
      totalResults: questions.length,
      tags: tags.split(';'),
      questions: questions
    };

    // Render the questions template
    var questionsHtml = $.templates.questions.render(questionsData);

    // Display the questions container
    $(target).html(questionsHtml);

    // Find the .questions element to add the questions to
    var resultTarget = $(target).find('.questions');
  };

  /**
   * Display the provided answerers in the DOM
   * @param  {string} tag       The tag that was lookd up
   * @param  {string} target    Target HTML selector
   * @param  {array}  answerers Array of answerer objects
   * @return null
   */
  var displayInspiration = function(tag, target, answerers) {
    // Template data for inspiration
    var inspirationData = {
      totalResults: answerers.length,
      tag: tag,
      answerers: answerers
    };

    // Render the inspiration template
    var inspirationHtml = $.templates.inspiration.render(inspirationData);

    // Display the inspiration container
    $(target).html(inspirationHtml);

    // Create tooltips
    $('[data-toggle="tooltip"]').tooltip()
  };
})(jQuery);