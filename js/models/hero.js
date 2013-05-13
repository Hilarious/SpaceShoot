// GAME OBJECTS
var Hero =  function(){
    this.x =  0;
    this.y =  0;
    this.height =  30;
    this.width=   30;
    this.eated =  0;
    this.speed = 260;
    this.SHOOTS = [];
    this.shootTime = 0;

    
    
    this.move = function(type,modifier){
        switch(type){
            case 'up':
           
                this.y -= this.speed * modifier;
            break;
            case 'down':
                this.y += this.speed * modifier;
            break;
            case 'left':
                this.x -= this.speed * modifier;
                console.log(this.x);
            break;
            case 'right':
                this.x += this.speed * modifier;
            break;
        }
    }
    
    this.shoot = function(){
        if(this.reloadComplete()){
            var shoot = new Shoot(this.x, this.y);
            this.shootTime = Date.now();
            this.SHOOTS.push(shoot);
        }
    }
    this.reloadComplete = function(){
        var now = Date.now();
        
        if(now - this.shootTime > 500){
            return true;
        }
        return false;
    }
    
    this.update = function(modifier){
        if (38 in keysDown) { // Player holding up
            
            this.move('up',modifier);
        }
        if (40 in keysDown) { // Player holding down
            this.move('down',modifier);
        }
        if (37 in keysDown) { // Player holding left
            this.move('left',modifier);
        }
        if (39 in keysDown) { // Player holding right
            this.move('right',modifier);
        }
        if (32 in keysDown) { // Player holding right
            this.shoot();
        }
        
        //UPDATE SHOTS
        for(var i = 0; i< this.SHOOTS.length; i++){
            this.SHOOTS[i].move(modifier);
            
        }
    }
    this.draw = function(){
        context.drawImage(resources.get(heroImage), this.x, this.y,this.height, this.width);
    }
    
}

var Shoot = function(x,y,index){
    this.x = x;
    this.y = y;
    this.speed = 200;
    this.height = 10;
    this.index = index;
    this.width = 10;
    this.color = 'rgb(10,255,0)';
    
    this.move = function(modifier){
       // console.log(modifier);
        this.y -= this.speed * modifier;
        if(this.y < 0){
            this.remove();
        }
    }
    this.draw = function(){    
        context.drawImage(resources.get(shootImage), this.x, this.y,this.height, this.width);
        
    }
    
    this.remove = function(){
        for(var i = 0; i<HERO.SHOOTS.length; i++){
            if(HERO.SHOOTS[i] == this){
                HERO.SHOOTS.splice(i, 1);
                break;
            }
        }
        
    }
}