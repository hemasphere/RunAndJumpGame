var character, ground;
var score = 0;
var obstacles = [];
var obstaclespeed = 2.3;
var frequency = 100;
var dead = false;

function setup() {
	// Create canvas
	createCanvas(600, 600);

	// Create char
	character = new Character(60, height/2);

	// Create ground
	ground = new Ground(width/2, height-20);

	// Create first obstacle
	obstacles.push(new Obstacle(0.90 * width, ground.y - ground.height/2 - 20, obstaclespeed));
}

function draw() {
	background(255, 204, 0);

	// Collision with ground
	if(character.y + character.size/2 > ground.y - ground.height/2) {
		character.y = ground.y - ground.height/2 - character.size/2;
	}

	// Show character
	if(!gameOver()) character.show();

	// Show ground
	if(!gameOver()) ground.show();

	// Obstacle loop
	for(var i = obstacles.length-1; i >= 0; i--) {
		// Show obstacle
		if(!gameOver()) obstacles[i].show();

		// Delete off screen obstacles
		if(obstacles[i].x < -100) obstacles.splice(i, 1);

		// Character collision with obstacle (left side)
		if(character.x + character.size/2 > obstacles[i].x - obstacles[i].width/2) {

			// Add score
			if(!obstacles[i].cleared) {
				score++;
				obstacles[i].cleared = true;
			}

			// Character collision with obstacle (right side)
			if(character.x - character.size/2 < obstacles[i].x + obstacles[i].width/2) {
				// Character collision with obstacle (top)
				if(character.y + character.size/2 > obstacles[i].y - obstacles[i].height/2) {
					dead = true;
				}
			}
		}
	}

	// Show score
	textSize(50);
	textAlign(CENTER);
	fill(255);
	text('Score ' + score, width/2, 50);

	// Draw game over
	if(gameOver()) {
		fill('#fae');
		stroke(51);
		text("Game Over", width/2, 144);
		textSize(25);
		noStroke();
		fill(255);
		text("[space] to reset", width/2, 169);
	}

	// Create new obstacle every ... frames
	if(frameCount % frequency == 0) {
		if(!gameOver()) obstacles.push(new Obstacle(width, ground.y - ground.height/2 - 20, obstaclespeed));
	}
}

function gameOver() {
	if(dead) return true;
	else return false;
}

function keyPressed() {
	if(keyCode == 32){
		if(gameOver()) location.reload();
		else doJump();
	}
}

function mousePressed() {
	doJump();
}

function doJump() {
	if(character.y > ground.y - ground.height/2 - character.size/2) character.jump();
}

function Character(x, y) {
	this.x = x;
	this.y = y;
	this.pull = 5;
	this.push = 0;
	this.size = 50;
}

Character.prototype.show = function() {
	fill("#fae");
	noStroke();
	rectMode(CENTER);
	ellipse(this.x, this.y, this.size, this.size);

	this.y += this.pull;
	this.y -= this.push;
	if(this.push) this.push--;
}

Character.prototype.jump = function() {
	character.push = 20;
}
function Ground(x, y) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = 50;
}

Ground.prototype.show = function() {
	fill(0);
	noStroke();
	rectMode(CENTER);
  rect(this.x, this.y, this.size, this.size);
}

function Obstacle(x, y, speed) {
this.x = x;
this.y = y;
this.cleared = false;
this.speed = speed;
}

Obstacle.prototype.width = 25;
Obstacle.prototype.height = 40;
Obstacle.prototype.color = 'blue';

Obstacle.prototype.show = function() {
fill(this.color);
rectMode(CENTER);
rect(this.x, this.y, this.width, this.height);

// Move to left
this.x -= this.speed;
}
