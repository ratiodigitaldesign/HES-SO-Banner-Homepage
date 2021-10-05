"use strict";

//Diameter of one particle
let particleSize = 3;
//Total particles
let particleSum = 80;
//Distance the line gets drawn
let lineMaxDist = 100;
let particles = [];

var width, height, canvasDiv;
let sketch = function (p) {
  p.setup = function () {
    canvasDiv = document.getElementById("sketch");
    width = canvasDiv.offsetWidth;
    height = canvasDiv.offsetHeight;
    p.createCanvas(width, height);
    p.stroke(255);
    p.fill(255);
    p.noFill();

    createParticle(width);
  };

  p.draw = function () {
    //p.background(0, 150);
    p.clear();
    //Move and display particles
    particles.forEach((particle) => {
      particle.move();
      particle.connect();
      particle.display();
    });
  };

  p.windowResized = function () {
    width = canvasDiv.offsetWidth;
    height = canvasDiv.offsetHeight;
    p.resizeCanvas(width, height);
    createParticle(width);
  };

  class Particle {
    constructor() {
      this.x = Math.floor(Math.random() * width);
      this.y = Math.floor(Math.random() * height);
      this.xSpeed = Math.random() * 0.7;
      this.ySpeed = Math.random() * 0.7;
    }

    move() {
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x <= 0) this.xSpeed *= -1;
      if (this.x > width) this.xSpeed *= -1;
      if (this.y <= 0) this.ySpeed *= -1;
      if (this.y > height) this.ySpeed *= -1;
    }

    connect() {
      particles.forEach((particle) => {
        let distance = p.dist(this.x, this.y, particle.x, particle.y);
        if (distance < lineMaxDist) {
          p.stroke(
            p.color(255, 255, 255, p.map(distance, 0, lineMaxDist, 100, 0))
          );
          p.strokeWeight(p.map(distance, 0, lineMaxDist, 2, 0));
          p.line(this.x, this.y, particle.x, particle.y);
        }
      });
    }

    display() {
      p.noStroke();
      p.ellipse(this.x, this.y, particleSize);
    }
  }

  function createParticle(width) {
    particles = [];
    for (let i = 0; i < width * 0.05; i++) {
      particles.push(new Particle());
    }
  }
};

new p5(sketch, "sketch");
