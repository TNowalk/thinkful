'use strict';

var graphicsComponent = require('../components/graphics/bird');

var Bird = function() {
  console.info('Creating Bird Entity');

  this.components = {
    graphics: new graphicsComponent.BirdGraphicsComponent(this)
  };
};

exports.Bird = Bird;