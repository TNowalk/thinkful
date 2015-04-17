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
      if (res.items == undefined) {
        $(target).html($.templates.error.render({msg: 'Invalid results'}));
      } else {
        cb(tags, target, res.items);
      }
    }).fail(function(xhr, err) {
      $(target).html($.templates.error.render({msg: err}));
    });
  };

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
      if (res.items == undefined) {
        $(target).html($.templates.error.render({msg: 'Invalid results'}));
      } else {
        cb(tag, target, res.items);
      }
    }).fail(function(xhr, err) {
      $(target).html($.templates.error.render({msg: err}));
    });
  };

  var displayUnansweredQuestions = function(tags, target, questions) {
    // Template data for questions
    var questionsData = {
      totalResults: questions.length,
      tags: tags.split(';')
    };

    // Render the questions template
    var questionsHtml = $.templates.questions.render(questionsData);

    // Display the questions container
    $(target).html(questionsHtml);

    // Find the .questions element to add the questions to
    var resultTarget = $(target).find('.questions');

    // Loop through each of the questions and display them
    $.each(questions, function(idx, question) {
      // Call the displayQuestion function, pass the question and the div
      // we want to add it to
      displayQuestion(question, resultTarget);
    });
  };

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

  var displayQuestion = function(question, target) {
    // When looping in jsRender, it's expecting each value in the array
    // to be an object.  So we ned to set that up
    var tags = [];

    $.each(question.tags, function(idx, tag) {
      tags.push({
        tag: tag
      });
    });

    // Overwrite the tags with array of objects instead of array of values
    question.tags = tags;

    // Set up the moment
    // var ago = moment().unix(qustion.)

    // Render question template
    var questionHtml = $.templates.question.render(question);

    // Add it to the target
    $(target).append(questionHtml);
  };
})(jQuery);