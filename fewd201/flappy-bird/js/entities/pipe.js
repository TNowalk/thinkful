'use strict';

var PipeGraphicsComponent = require('../components/graphics/pipe');
var PhysicsComponent = require('../components/physics/physics');
var CollisionComponent = require('../components/collision/rect');

var Pipe = function(width, height, top) {
  this.size = {
    width: width,
    height: height
  };

  this.components = {
    graphics: new PipeGraphicsComponent(this),
    physics: new PhysicsComponent(this),
    collision: new CollisionComponent(this, {width: width, height: height})
  };

  var x = 1;
  var y = 0;

  if (top) {
    y = 1 - this.size.height;
  }

  this.components.physics.position.x = x;
  this.components.physics.position.y = y;

  this.components.physics.velocity.x = -0.4;

  this.components.collision.onCollision = this.onCollision.bind(this);
};

Pipe.prototype.onCollision = function(entity) {
  // console.log('Pipe collided with entity', entity);
};

module.exports = Pipe;