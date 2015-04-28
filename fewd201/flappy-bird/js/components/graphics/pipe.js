'use strict';

var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.rect(0, 0, this.entity.size.width, this.entity.size.height);
  context.fill();
  context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;