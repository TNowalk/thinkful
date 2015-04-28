'use strict';

var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');

var Bird = function() {
  this.components = {
    graphics: new graphicsComponent.BirdGraphicsComponent(this),
    physics: new physicsComponent.PhysicsComponent(this)
  };

  this.components.physics.position.y = 1;
  this.components.physics.acceleration.y = -2;
};

exports.Bird = Bird;