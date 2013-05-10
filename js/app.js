
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var createCreaturesEvery = function( timeout){      
  function createCreature(){
    addCreature(RANDOM.RandomPos());
    timer = setTimeout(createCreature, timeout);
  }  
  var timer = setTimeout(createCreature, timeout);
}

var addXCreatures = function(quantity){
console.log(quantity);
    for(var i = 0; i<quantity ; i++){
        addCreature(RANDOM.RandomPos());
    }
}
var addCreature = function(pos){
    var newCreature = new creature();
    newCreature.x = pos.x;
    newCreature.y = pos.y;
    quad.insert(newCreature);
    creatures.push(newCreature);
}

/** Check if there are nodes occupied for that position **/
var occupied = function(x,y,size){
    var items = DISTANCES.NearPoints({x:x, y:y, height:size, width:size});

    if(items.length > 0){
        return true;
    }else {
        return false;
        
    }
    
}
 var NearCreatures = function(creature){
        var items = DISTANCES.NearPoints(creature);
        var temp = [];
        for(var i = 0; i< items.length; i++){
            if(items[i] == creature || items[i].type == creature.type ){
               
            }else{
                temp.push(items[i]);
            }
        }
        
        return temp;
    }


    var removeCreature = function(creature){
    for(var i = 0; i < creatures.length; i++){
        if(creature.x == creatures[i].x && creature.y == creatures[i].y && creature.type == creatures[i].type ){
        
            creatures.splice(i, 1);
            
        }
    }
}




// Update game objects
var updateCreatures = function (modifier) {
    for(var i = 0; i<creatures.length; i++){
        creatures[i].move(canvas.width, canvas.height, modifier);
    }
    quad.clear();
	quad.insert(creatures);
    
};

var updateHero = function(modifier){
    if (38 in keysDown) { // Player holding up
        
		HERO.moveUp(modifier);
	}
	if (40 in keysDown) { // Player holding down
		HERO.moveDown(modifier);
	}
	if (37 in keysDown) { // Player holding left
		HERO.moveLeft(modifier);
	}
	if (39 in keysDown) { // Player holding right
		HERO.moveRight(modifier);
	}
    if (32 in keysDown) { // Player holding right
		HERO.shoot();
	}
    
    //UPDATE SHOTS
     for(var i = 0; i< SHOOTS.length; i++){
        SHOOTS[i].move(modifier);
        
    }
}


var reset = function () {
	var quad = new QuadTree(bounds);
    SHOOTS = [];
    // = [];
    HERO = new Hero();
    HERO.x = canvas.height/2;
    HERO.y = canvas.width/2;
};


// Draw everything
var render = function () {
	if (bgReady) {
		context.drawImage(bgImage, 0, 0);
	}
   
    HERO.draw();
	
    for(var i = 0; i< SHOOTS.length; i++){
        SHOOTS[i].draw();
    }

	// Score
	context.fillStyle = "green";
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	//context.fillText("Troops destroyed");
};



// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	updateHero(delta / 1000);
	

	then = now;
    requestAnimFrame(main);
    render();
};



var start = function(){
    then = Date.now();
   // Let's play this game!
    reset();
    main();
   // setInterval(main, 1); // Execute as fast as possible
}

//Only place where I do use JQuery. 
var doBindings = function(){
   
    // Handle keyboard controls
    addEventListener("keydown", function (e) {
        console.log(e.keyCode);
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);
    
    start();
}
$(document).ready(function(){
    doBindings();   
});

var keysDown = {};