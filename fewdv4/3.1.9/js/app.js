$(function() {
  // Loop from 1 to 100
  for (var i = 1; i <= 100; i++) {
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
});