'use strict';

var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function() {
  console.info('Drawing a pipe');
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;