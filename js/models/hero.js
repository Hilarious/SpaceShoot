// GAME OBJECTS
var Hero =  function(){
    this.x =  0;
    this.y =  0;
    this.height =  30;
    this.width=   30;
    this.eated =  0;
    this.speed = 260;
    
    this.shootTime = 0;

    
    
    this.moveUp = function(modifier){
        this.move('up',modifier);
    }
    this.moveDown = function(modifier){
        this.move('down',modifier);
    }
    this.moveLeft = function(modifier){
        this.move('left',modifier);
    }
    this.moveRight = function(modifier){
        this.move('right',modifier);
    }
    
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
            SHOOTS.push(shoot);
        }
    }
    this.reloadComplete = function(){
        var now = Date.now();
        
        if(now - this.shootTime > 500){
            return true;
        }
        return false;
    }
    this.draw = function(){
           if (heroReady) {
            
            context.drawImage(heroImage, this.x, this.y,this.height, this.width);
        }
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
      if (shootReady) {
            
            context.drawImage(shootImage, this.x, this.y,this.height, this.width);
        }
    }
    
    this.remove = function(){
        SHOOTS.splice(this.index, 1);
    }
}