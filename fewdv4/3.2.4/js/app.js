
$(function(){
  var totalGuesses,
      number,
      lastDiff,
      guessListElement = $('#guessList'),
      countElement = $('#count'),
      userGuessElement = $('#userGuess'),
      feedbackElement = $('#feedback')
      guessButton = $('#guessButton');

	/*--- Display information modal box ---*/
	$('.what').click(function(){
  	$('.overlay').fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$('a.close').click(function(){
		$('.overlay').fadeOut(1000);
	});

  $('#guessForm').on('submit', function(e) {
    e.preventDefault();

    // Grab the user guess
    var guess = +$('#userGuess').val();

    // Pass it to the checkGuess function
    checkGuess(guess);

    // Reset the user guess input
    userGuessElement.val('');
  });

  $('.new').on('click', function(e) {
    e.preventDefault();
    newGame();
    return false;
  });

  var generateNumber = function(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  };

  var newGame = function() {
    totalGuesses = 0;
    number = generateNumber(1, 100);
    lastDiff = null;
    setGuessCount(totalGuesses);
    userGuessElement.val('');
    userGuessElement.prop('disabled', false);
    guessButton.prop('disabled', false);
    clearGuesses();
  };

  var checkGuess = function(guess) {
    incrementGuessCount();
    addGuess(guess);

    // Get the difference between the guess and number
    var diff = Math.abs(number - guess);

    // Check for winner
    if (diff === 0) {
      feedbackElement.text('Winner! You guessed ' + guess);
      userGuessElement.prop('disabled', true);
      guessButton.prop('disabled', true);
      return;
    }

    // Check to see if this is the first guess
    if (lastDiff === null) {
      // Provide an absolute feedback on first guess
      if (diff >= 50) {
        feedbackElement.text('Ice Cold');
      } else if (diff >= 30) {
        feedbackElement.text('Cold');
      } else if (diff >= 20) {
        feedbackElement.text('Warm');
      } else if (diff >= 10) {
        feedbackElement.text('Hot');
      } else {
        feedbackElement.text('Very Hot');
      }
    } else {
      // If the new diff is lower than the old, we're making progress
      if (diff < lastDiff) {
        feedbackElement.text('Warmer');
      } else if (diff > lastDiff) {
        feedbackElement.text('Colder');
      } else {
        feedbackElement.text('Same Guess!!');
      }
    }

    // Set lastDiff to use to compare against the next
    lastDiff = diff;
  };

  var incrementGuessCount = function() {
    totalGuesses++;
    setGuessCount(totalGuesses);
  };

  var setGuessCount = function(count) {
    countElement.text(count);
  };

  var addGuess = function(guess) {
    guessListElement.append('<li>' + guess + '</li>');
  };

  var clearGuesses = function() {
    guessListElement.empty();
  };

  // Start a new game
  newGame();
});


