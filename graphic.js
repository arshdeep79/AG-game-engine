/**
 * canvas
 */
function graphic(setup){
  this.element = setup.element;
  this.width = setup.width;
  this.height = setup.height;
  this.step = setup.step;
  this.x = setup.x;
  this.y = setup.y;
  
}

graphic.prototype.move = function(direction,steps){
  switch(direction){
    case ('LEFT'):
      this.x -= steps*this.step;
    break;
    case ('RIGHT'):
      this.x += steps*this.step;
    break;
    case ('UP'):
      this.y -= steps*this.step;
    break;
    case ('DOWN'):
      this.y += steps*this.step;
    break;
  }
};

graphic.prototype.draw = function(screen){
  screen.draw_image(this);
};

