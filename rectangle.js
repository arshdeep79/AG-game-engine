/**
 * canvas
 */
function rectangle(setup){
  this.width = setup.width;
  this.height = setup.height;
  this.fillStyle = setup.fillStyle;
  this.strokeStyle = setup.strokeStyle;
  this.lineWidth = setup.lineWidth;
  this.step = setup.step;
  this.x = setup.x;
  this.y = setup.y;
  
}

rectangle.prototype.move = function(direction,steps){
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

rectangle.prototype.draw = function(screen){
  screen.draw_rect(this);
};

