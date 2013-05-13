var Stage = function(level){
    this.level = level;
    this.ready = false;
    this.waves = 1;
    this.timeChange = 5000;
    this.action;
    this.updateAction;
    this.BOOS;
    this.CREATURES = [];
    this.creaturesLeft = 30;
    
    this.start = function(){
        
        if(this.level == 10){
            this.timeChange = 2000;
            this.action = function(){ this.changeAttackBoss()};
            this.updateAction = function(modifier){ this.updateBoss(modifier)};
        }else{
            this.action = function(){ this.addPackOfCreatures(this.waves); this.waves++;};
            this.updateAction = function(modifier){ this.updateCreatures(modifier);};
        }
    }
    
    this.update = function(modifier){
        var def = GAME.now - modifier > this.timeChange;
        if(this.ready == false && def == true){
            this.ready = true;
        }
        if(this.ready == true){
            this.action();
            this.ready = false;
        }
        
        this.updateAction(modifier);      
    }
    
    this.changeAttackBoss = function(){
        this.BOOS.changeAttack();
    }
    this.addPackOfCreatures = function(quantity){
        for(var i = 0; i < quantity; i++){
            var creature = new creature(this.level);
            this.CREATURES.push(creature);
        }
    }
    this.updateCreatures = function (modifier) {
        for(var i = 0; i<this.CREATURES.length; i++){
            this.CREATURES[i].move(canvas.width, canvas.height / 2, modifier);
        }
        quad.clear();
        quad.insert(this.CREATURES);
    }
    
   
    
    this.updateBoss = function(modifier){
        this.BOOS.move(modifier);
    }
    
    this.draw = function(){
        for(var i = 0; i < this.CREATURES.length; i++){
            this.CREATURES[i].draw();
        }
    }
}