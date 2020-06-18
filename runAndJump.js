var character, ground;
var score = 0;
var obstacles = [];
var obstaclespeed = 2;
var frequency = 100;
var dead = false;

function setup() {
	createCanvas(600, 600);
	character = new Character(60, height/2);
	ground = new Ground(width/2, height-20);
	obstacles.push(new Obstacle(0.90 * width, ground.y - ground.height/2 - 20, obstaclespeed));
}

function draw() {
	background(255, 204, 0);
	if(character.y + character.size/2 > ground.y - ground.height/2) {
		character.y = ground.y - ground.height/2 - character.size/2;
	}
	if(!gameOver()) character.show();
	if(!gameOver()) ground.show();
	for(var i = obstacles.length-1; i >= 0; i--) {
		if(!gameOver()) obstacles[i].show();
		if(obstacles[i].x < -100) obstacles.splice(i, 1);
		if(character.x + character.size/2 > obstacles[i].x - obstacles[i].width/2) {
			if(!obstacles[i].cleared) {
				score++;
				obstacles[i].cleared = true;
			}
			if(character.x - character.size/2 < obstacles[i].x + obstacles[i].width/2) {
				if(character.y + character.size/2 > obstacles[i].y - obstacles[i].height/2) {
					dead = true;
				}
			}
		}
	}

	// score
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
	stroke('red');
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
	rectMode(CENTER);
  rect(this.x, this.y, this.size, this.size);
}

function Obstacle(x, y, speed) {
this.x = x;
this.y = y;
this.cleared = false;
this.speed = speed;
}

Obstacle.prototype.width = 15;
Obstacle.prototype.height = 25;
Obstacle.prototype.color = 'blue';

Obstacle.prototype.show = function() {
fill('blue');
noStroke();
rectMode(CENTER);
rect(this.x, this.y, 15, 25);
this.x -= this.speed;
}
