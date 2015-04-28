(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();

  app.run();
});
},{"./flappy_bird":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

var PipeGraphicsComponent = function(entity) {
  this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function() {
  console.info('Drawing a pipe');
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],4:[function(require,module,exports){
'use strict';

var graphicsComponent = require('../components/graphics/bird');

var Bird = function() {
  console.info('Creating Bird Entity');

  this.components = {
    graphics: new graphicsComponent.BirdGraphicsComponent(this)
  };
};

exports.Bird = Bird;
},{"../components/graphics/bird":2}],5:[function(require,module,exports){
'use strict';

var graphicsComponent = require('../components/graphics/pipe');

var Pipe = function() {
  console.info('Creating Pipe Entity');

  this.components = {
    graphics: new graphicsComponent.PipeGraphicsComponent(this)
  };
};

exports.Pipe = Pipe;
},{"../components/graphics/pipe":3}],6:[function(require,module,exports){
'use strict';

var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
  this.entities = [new bird.Bird()];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":4,"./entities/pipe":5,"./systems/graphics":7}],7:[function(require,module,exports){
'use strict';

var GraphicsSystem = function(entities) {
  this.entities = entities;

  this.canvas = document.getElementById('main-canvas');

  this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
  // Run the render loop
  window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
  // Set the canvas to the correct size if the window is resized
  if (this.canvas.width !== this.canvas.offsetWidth ||
      this.canvas.height !== this.canvas.offsetHeight
  ) {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  // Clear the canvas
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.context.save();
  this.context.translate(this.canvas.width / 2, this.canvas.height);
  this.context.scale(this.canvas.height, -this.canvas.height);

  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];

    if (!('graphics' in entity.components)) {
      continue;
    }

    entity.components.graphics.draw(this.context);
  }

  this.context.restore();

  // Continue the render loop
  window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[1]);
