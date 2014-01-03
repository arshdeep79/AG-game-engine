function mouse(screen){
  this.e = false;
  var self = this;
  this.screen = screen;
  screen.element.addEventListener('click', function(e){
    self.e = e;
  });  
}

mouse.prototype.get_last_click = function(){
  if(!this.e)
    return false;
    
  var rect = this.screen.element.getBoundingClientRect();
  return {
    x: this.e.clientX - rect.left,
    y: this.e.clientY - rect.top
  };  
};

mouse.prototype.clear_buffer = function(){
  this.e = false;
};

