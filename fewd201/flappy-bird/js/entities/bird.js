'use strict';

var BirdGraphicsComponent = require('../components/graphics/bird');
var PhysicsComponent = require('../components/physics/physics');
var CollisionComponent = require('../components/collision/circle');

var Bird = function() {
  this.components = {
    graphics:  new BirdGraphicsComponent(this),
    physics:   new PhysicsComponent(this),
    collision: new CollisionComponent(this, 0.02)
  };

  this.components.physics.position.y = 1;
  this.components.physics.acceleration.y = -2;

  this.components.collision.onCollision = this.onCollision.bind(this);
};

Bird.prototype.onCollision = function(entity) {
  console.log('Bird collided with entity', entity);
};

module.exports = Bird;