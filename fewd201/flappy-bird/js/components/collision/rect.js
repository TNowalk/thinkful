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