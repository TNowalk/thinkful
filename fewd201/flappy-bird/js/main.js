'use strict';

var FlappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new FlappyBird();

  app.run();
});