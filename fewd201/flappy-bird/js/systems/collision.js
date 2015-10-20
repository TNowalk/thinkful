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