function keyboard(){
  this.last_keypress = 0;
  this.definition = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    27: 'ESC'
  };
  var self = this;
  document.onkeydown = function(e){
  
    self.last_keypress = e.keyCode;
  };
}

keyboard.prototype.get = function(){
  return this.definition[this.last_keypress];
};

keyboard.prototype.clear_buffer = function(){
  this.last_keypress = 0 ;
};
