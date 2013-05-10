//GLOBALS
// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
document.getElementById('game').appendChild(canvas);




// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.jpg";
//bgImage.src = "img/bg.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "img/hero.png";

// Missile image
var shootReady = false;
var shootImage = new Image();
shootImage.onload = function () {
	shootReady = true;
};
shootImage.src = "img/Missile.png";

//Quad tree
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}
var quad = new QuadTree(bounds);


var then;


//CREATURE OPTIONS
var startingHeight = 4;
var startingWidth = 4;


var SHOOTS = [];
