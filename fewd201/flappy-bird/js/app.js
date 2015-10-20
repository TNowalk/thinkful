(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var FlappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
  var app = new FlappyBird();

  app.run();
});
},{"./flappy_bird":9}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

var RectCollisionComponent = function(entity, size) {
  this.entity = entity;
  this.size = size;
  this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
  if (entity.components.collision.type === 'circle') {
    return this.collideCircle(entity);
  } else if (entity.components.collision.type === 'rect') {
    return this.collideRect(entity);
  }

  return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
  return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
  var positions = {
    current: this.entity.components.physics.position,
    target: entity.components.physics.position
  };

  var sizes = {
    current: this.size,
    target: entity.components.collision.size
  };

  var sides = {
    current: {
      left:   positions.current.x - sizes.current.width / 2,
      right:  positions.current.x + sizes.current.width / 2,
      bottom: positions.current.y - sizes.current.height / 2,
      top:    positions.current.y + sizes.current.height / 2
    },
    target: {
      left:   positions.target.x - sizes.target.width / 2,
      right:  positions.target.x + sizes.target.width / 2,
      bottom: positions.target.y - sizes.target.height / 2,
      top:    positions.target.y + sizes.target.height / 2
    }
  };

  this.canvas = document.getElementById('main-canvas');

  var context = this.canvas.getContext('2d');
  context.save();
  context.translate(positions.current.x, positions.current.y);
  context.beginPath();
  context.rect(0, 0, this.entity.size.width, this.entity.size.height);
  context.stroke();
  context.strokeStyle = "red";
  context.restore();


if (sides.current.left   > sides.target.right  ||
           sides.target.left    > sides.current.right ||
           sides.current.bottom > sides.target.top    ||
           sides.target.bottom  > sides.current.top
  ) {
  // console.log('cl > tr', sides.current.left   > sides.target.right);
  console.log('tl > cr', sides.target.left    > sides.current.right);
  // console.log('cb > tt', sides.current.bottom > sides.target.top);
  console.log(sides);
  console.log(this.entity, entity);
  // console.log('tb > ct', sides.target.bottom  > sides.current.top);

  setTimeout(function() { debugger; }, 100);
}

  return !(sides.current.left   > sides.target.right  ||
           sides.target.left    > sides.current.right ||
           sides.current.bottom > sides.target.top    ||
           sides.target.bottom  > sides.current.top);
};

module.exports = RectCollisionComponent;
},{}],4:[function(require,module,exports){
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

module.exports = BirdGraphicsComponent;
},{}],5:[function(require,module,exports){
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

module.exports = PipeGraphicsComponent;
},{}],6:[function(require,module,exports){
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

module.exports = PhysicsComponent;
},{}],7:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = require('../components/graphics/bird');
var PhysicsComponent = require('../components/physics/physics');
var CollisionComponent = require('../components/collision/circle');

var Bird = function() {
  this.components = {
    graphics:  new BirdGraphicsComponent(this),
    physics:   new PhysicsComponent(this),
    collision: new CollisionComponent(this, 0.02)
  };

  this.components.physics.position.y = 1;
  this.components.physics.acceleration.y = -2;

  this.components.collision.onCollision = this.onCollision.bind(this);
};

Bird.prototype.onCollision = function(entity) {
  console.log('Bird collided with entity', entity);
};

module.exports = Bird;
},{"../components/collision/circle":2,"../components/graphics/bird":4,"../components/physics/physics":6}],8:[function(require,module,exports){
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
},{"../components/collision/rect":3,"../components/graphics/pipe":5,"../components/physics/physics":6}],9:[function(require,module,exports){
'use strict';

var GraphicsSystem = require('./systems/graphics');
var PhysicsSystem = require('./systems/physics');
var InputSystem = require('./systems/inputs');
var PipeSystem = require('./systems/pipes');

var Bird = require('./entities/bird');

var FlappyBird = function() {
  this.entities = [new Bird()];

  this.graphics = new GraphicsSystem(this.entities);
  this.physics = new PhysicsSystem(this.entities);
  this.inputs = new InputSystem(this.entities);
  this.pipes = new PipeSystem(this.entities);
};

FlappyBird.prototype.run = function() {
  this.graphics.run();
  this.physics.run();
  this.inputs.run();
  this.pipes.run();
};

module.exports = FlappyBird;
},{"./entities/bird":7,"./systems/graphics":11,"./systems/inputs":12,"./systems/physics":13,"./systems/pipes":14}],10:[function(require,module,exports){
'use strict';

var CollisionSystem = function(entities) {
  this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
  for (var i = 0; i < this.entities.length; i++) {
    var current = this.entities[i];

    if (!('collision' in current.components)) {
      continue;
    }

    for (var j = i + 1; j < this.entities.length; j++) {
      var target = this.entities[j];

      if (!('collision' in target.components)) {
        continue;
      }

      if (!current.components.collision.collidesWith(target)) {
        continue;
      }

      if (current.components.collision.onCollision) {
        current.components.collision.onCollision(target);
      }

      if (target.components.collision.onCollision) {
        target.components.collision.onCollision(current);
      }
    }
  }
};

module.exports = CollisionSystem;
},{}],11:[function(require,module,exports){
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

module.exports = GraphicsSystem;
},{}],12:[function(require,module,exports){
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

module.exports = InputSystem;
},{}],13:[function(require,module,exports){
'use strict';

var CollisionSystem = require('./collision');

var PhysicsSystem = function(entities) {
  this.entities = entities;
  this.collisionSystem = new CollisionSystem(entities);
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

  this.collisionSystem.tick();
};

module.exports = PhysicsSystem;
},{"./collision":10}],14:[function(require,module,exports){
'use strict';

var Pipe = require('../entities/pipe');

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

  this.entities.push(new Pipe(0.1, gap));
  //this.entities.push(new Pipe(0.1, 1 - (gap + 0.3), true));
};

module.exports = PipeSystem;
},{"../entities/pipe":8}]},{},[1]);
