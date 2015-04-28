'use strict';

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function() {
  console.info('Drawing a bird');
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;