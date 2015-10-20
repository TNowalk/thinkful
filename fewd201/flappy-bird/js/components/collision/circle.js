'use strict';

var CircleCollisionComponent = function(entity, radius) {
  this.entity = entity;
  this.radius = radius;
  this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type === 'circle') {
    return this.collideCircle(entity);
  } else if (entity.components.collision.type === 'rect') {
    return this.collideRect(entity);
  }

  return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
  var positions = {
    current: this.entity.components.physics.position,
    target: entity.components.physics.position
  };

  var diff = {
    x: positions.current.x - positions.target.x,
    y: positions.current.y - positions.target.y
  };

  var distance = Math.pow(diff.x, 2) * Math.pow(diff.y, 2);

  var radiusSum = this.radius + entity.components.collision.radius;

  return distance < Math.pow(radiusSum, 2);
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
  var clamp = function(value, low, high) {
    if (value < low) {
      return low;
    } else if (value > high) {
      return high;
    }

    return value;
  };

  var positions = {
    current: this.entity.components.physics.position,
    target: entity.components.physics.position
  };

  var targetSize = entity.components.collision.size;

  var closest = {
    x: clamp(positions.current.x, positions.target.x - (targetSize.width / 2), positions.target.width + (targetSize.x / 2)),
    y: clamp(positions.current.y, positions.target.y - (targetSize.height / 2), positions.target.height + (targetSize.y / 2))
  };

  var diff = {
    x: positions.current.x - closest.x,
    y: positions.current.y - closest.y
  };

  var distance = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);

  return distance < Math.pow(this.radius, 2);
};

module.exports = CircleCollisionComponent;