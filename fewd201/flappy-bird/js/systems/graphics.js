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

  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];

    if (!('graphics' in entity.components)) {
      continue;
    }

    entity.components.graphics.draw(this.context);
  }

  // Continue the render loop
  window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;