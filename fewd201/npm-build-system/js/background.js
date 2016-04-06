var $ = require('jquery');

var makeBackgroundRed = function() {
  $('body').css('background-color', 'red');
};

module.exports = makeBackgroundRed;
