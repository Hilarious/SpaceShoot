//GLOBALS
// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width =  $('#game').width() - 40;
canvas.height = (window.innerHeight ) - 130;
document.getElementById('game').appendChild(canvas);

var recalculateCanvas = function(){
    canvas.width =  $('#game').width() - 40;
    canvas.height = (window.innerHeight ) - 130;
}

//Load IMG Resources
resources.load([
    //'img/sprites.png',
    //'img/terrain.png',
    'img/background.jpg',
    'img/hero.png',
    'img/Missile.png'
]);

var backgroundImage = 'img/background.jpg';
var heroImage  = 'img/hero.png' ;
var shootImage = 'img/Missile.png' ;



//Quad tree
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}
var quad = new QuadTree(bounds);



//CREATURE OPTIONS
var startingHeight = 4;
var startingWidth = 4;

var GAME;
var STAGE;