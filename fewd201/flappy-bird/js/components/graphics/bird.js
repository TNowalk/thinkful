'use strict';

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context, position, size) {
  context.save();
  context.translate(position.x, position.y);
  context.scale(size, size);
  context.beginPath();
  context.arc(0, 0, 1, 0, 2 * Math.PI);
  context.fill();
  context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;