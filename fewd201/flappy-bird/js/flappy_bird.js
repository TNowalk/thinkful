'use strict';

var GraphicsSystem = require('./systems/graphics');
var PhysicsSystem = require('./systems/physics');
var InputSystem = require('./systems/inputs');
var PipeSystem = require('./systems/pipes');

var Bird = require('./entities/bird');

var FlappyBird = function() {
  this.entities = [new Bird()];

  this.graphics = new GraphicsSystem(this.entities);
  this.physics = new PhysicsSystem(this.entities);
  this.inputs = new InputSystem(this.entities);
  this.pipes = new PipeSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.inputs.run();
  this.pipes.run();
};

module.exports = FlappyBird;