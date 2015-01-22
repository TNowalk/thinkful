$(function() {
  var promptUser = function() {
    var input;

    while(isNaN(input) || input < 0) {
      input = prompt('Please choose a valid integer greater than zero');
    }

    // Call the fizzBuzz function
    fizzBuzz(+input);
  };

  var fizzBuzz = function(n) {
    // Loop from 1 to n
    for (var i = 1; i <= n; i++) {
      // 15 is divisible by both 3 and 5, so we can use that
      if (i % 15 === 0) {
        $('body').append('<p>fizz buzz</p>');
      } else if (i % 3 === 0) {
        $('body').append('<p>fizz</p>');
      } else if (i % 5 === 0) {
        $('body').append('<p>buzz</p>');
      } else {
        $('body').append('<p>' + i + '</p>');
      }
    }
  };

  // Prompt User
  promptUser();
});