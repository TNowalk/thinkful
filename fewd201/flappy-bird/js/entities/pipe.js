'use strict';

var graphicsComponent = require('../components/graphics/pipe');

var Pipe = function() {
  console.info('Creating Pipe Entity');

  this.components = {
    graphics: new graphicsComponent.PipeGraphicsComponent(this)
  };
};

exports.Pipe = Pipe;