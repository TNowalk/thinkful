(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new flappyBird.FlappyBird();

  app.run();
});
},{"./flappy_bird":7}],2:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = function(entity) {
  this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
  var position = this.entity.components.physics.position;

  context.save();
  context.translate(position.x, position.y);
  context.beginPath();
  context.arc(0, 0, 0.02, 0, 2 * Math.PI);
  context.fill();
  context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
'use strict';

var PhysicsComponent = function(entity) {
  this.entity = entity;

  this.position = {x: 0, y: 0};
  this.velocity = {x: 0, y: 0};
  this.acceleration = {x: 0, y: 0};
};

PhysicsComponent.prototype.update = function(delta) {
  this.velocity.x += this.acceleration.x * delta;
  this.velocity.y += this.acceleration.y * delta;

  this.position.x += this.velocity.x * delta;
  this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],5:[function(require,module,exports){
'use strict';

var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');

var Bird = function() {
  this.components = {
    graphics: new graphicsComponent.BirdGraphicsComponent(this),
    physics: new physicsComponent.PhysicsComponent(this)
  };

  this.components.physics.position.y = 1;
  this.components.physics.acceleration.y = -2;
};

exports.Bird = Bird;
},{"../components/graphics/bird":2,"../components/physics/physics":4}],6:[function(require,module,exports){
'use strict';

var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent = require('../components/physics/physics');

var Pipe = function(width, height, top) {
  this.size = {
    width: width,
    height: height
  };

  this.components = {
    graphics: new graphicsComponent.PipeGraphicsComponent(this),
    physics: new physicsComponent.PhysicsComponent(this)
  };

  var x = 1;
  var y = 0;

  if (top) {
    y = 1 - this.size.height;
  }

  this.components.physics.position.x = x;
  this.components.physics.position.y = y;

  this.components.physics.velocity.x = -0.4;
};

exports.Pipe = Pipe;
},{"../components/graphics/pipe":3,"../components/physics/physics":4}],7:[function(require,module,exports){
'use strict';

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipes');

var bird = require('./entities/bird');

var FlappyBird = function() {
  this.entities = [new bird.Bird()];

  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.inputs = new inputSystem.InputSystem(this.entities);
  this.pipes = new pipeSystem.PipeSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.inputs.run();
  this.pipes.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":5,"./systems/graphics":8,"./systems/input":9,"./systems/physics":10,"./systems/pipes":11}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict';

var InputSystem = function(entities) {
  this.entities = entities;

  // Canvas is where we get input from
  this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
  this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
  var bird = this.entities[0];
  bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;
},{}],10:[function(require,module,exports){
'use strict';

var PhysicsSystem = function(entities) {
  this.entities = entities;
};

PhysicsSystem.prototype.run = function() {
  // Run the update loop
  window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function() {
  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];

    if (!('physics' in entity.components)) {
      continue;
    }

    entity.components.physics.update(1/60);
  }
};

exports.PhysicsSystem = PhysicsSystem;
},{}],11:[function(require,module,exports){
'use strict';

var pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
  this.entities = entities;
};

PipeSystem.prototype.run = function() {
  this.tick();

  // Run the update loop
  window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function() {
  var gap = 0.4 + Math.random() * 0.2;

  this.entities.push(new pipe.Pipe(0.1, gap));
  this.entities.push(new pipe.Pipe(0.1, 1 - (gap + 0.3), true));
};

exports.PipeSystem = PipeSystem;
},{"../entities/pipe":6}]},{},[1]);
