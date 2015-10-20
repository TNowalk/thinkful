'use strict';

var Pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
  this.entities = entities;
};

PipeSystem.prototype.run = function() {
  this.tick();

  // Run the update loop
  window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function() {
  var gap = 0.4 + Math.random() * 0.2;

  this.entities.push(new Pipe(0.1, gap));
  //this.entities.push(new Pipe(0.1, 1 - (gap + 0.3), true));
};

module.exports = PipeSystem;