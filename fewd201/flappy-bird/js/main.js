'use strict';

var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();

  app.run();
});