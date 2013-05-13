
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
    STAGE.CREATURES.push(newCreature);
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
    for(var i = 0; i < STAGE.CREATURES.length; i++){
        if(creature.x == STAGE.CREATURES[i].x && creature.y == STAGE.CREATURES[i].y && creature.type == STAGE.CREATURES[i].type ){
        
            STAGE.CREATURES.splice(i, 1);
            
        }
    }
}
var Game = function(){
    this.now = Date.now();
    this.then;
    
    this.reset = function(){
        var quad = new QuadTree(bounds);
        STAGE = new Stage(1);
        STAGE.start();
        HERO = new Hero();
        HERO.x = canvas.height/2;
        HERO.y = canvas.width/2;
    }
    
    this.render = function(){
        context.drawImage(resources.get(backgroundImage), 0, 0);
	
        STAGE.draw();
        
        HERO.draw();
        
        for(var i = 0; i< HERO.SHOOTS.length; i++){
            HERO.SHOOTS[i].draw();
        }
        context.fillStyle = "green";
        context.font = "24px Helvetica";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText("Stage: " + STAGE.level + " Troops Left: " + STAGE.troopsLeft, 0 , 10);
    }
    
    this.update = function(modifier){
         //Update movements
        HERO.update(modifier);
        STAGE.update(modifier);
	
    
    }
}



// The main game loop
var main = function () {
	GAME.now = Date.now();
	var delta = GAME.now - GAME.then;

    GAME.update(delta/1000);
	//updateBonuses(delta / 1000);

	GAME.then = GAME.now;
    //raf is better than set interval
    requestAnimFrame(main);
    //Render after raf its better
    GAME.render();
};



var start = function(){
   
    GAME.reset();
    //Main loop
    main();
}

//Only place where I do use JQuery. 
var doBindings = function(){
     GAME = new Game();
     
    document.getElementById('play-again').addEventListener('click', function() {
        GAME.reset();
    });
    // Handle keyboard controls
    addEventListener("keydown", function (e) {
        
        e.preventDefault();
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        e.preventDefault();
        delete keysDown[e.keyCode];
    }, false);

    $(window).bind("resize", recalculateCanvas);
    
}




$(document).ready(function(){
    doBindings(); 
    resources.onReady(start);
    
});

var keysDown = {};