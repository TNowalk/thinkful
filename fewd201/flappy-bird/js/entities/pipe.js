'use strict';

var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent = require('../components/physics/physics');

var Pipe = function(width, height, top) {
  this.size = {
    width: width,
    height: height
  };

  this.components = {
    graphics: new graphicsComponent.PipeGraphicsComponent(this),
    physics: new physicsComponent.PhysicsComponent(this)
  };

  var x = 1;
  var y = 0;

  if (top) {
    y = 1 - this.size.height;
  }

  this.components.physics.position.x = x;
  this.components.physics.position.y = y;

  this.components.physics.velocity.x = -0.4;
};

exports.Pipe = Pipe;