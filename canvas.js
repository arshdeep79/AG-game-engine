/**
 * canvas
 */
function canvas(setup){
  this.element =  document.createElement("canvas");
  this.element.width = setup.width;
  this.element.height = setup.height;
  document.body.appendChild(this.element);
  this.ctx = this.element.getContext('2d');
}

canvas.prototype.clear = function(){
  this.ctx.clearRect(0, 0, this.element.width, this.element.height);
};

canvas.prototype.draw_rect = function(drawable){
  this.ctx.beginPath();
  this.ctx.rect(drawable.x,drawable.y,drawable.width,drawable.height);
  
  if(drawable.fillStyle){
    this.ctx.fillStyle = drawable.fillStyle;
    this.ctx.fill();
  }
  
  if(drawable.strokeStyle){
    this.ctx.strokeStyle = drawable.strokeStyle;
    this.ctx.lineWidth = drawable.lineWidth;
    this.ctx.stroke();
  }
};

canvas.prototype.draw_image = function(drawable){
  this.ctx.drawImage(drawable.element,0,0,drawable.width,drawable.height,drawable.x,drawable.y,drawable.width,drawable.height);
};

canvas.prototype.draw_text = function(drawable){
  this.ctx.font="20px Georgia";
  this.ctx.beginPath();
  this.ctx.fillText(drawable.text,drawable.x,drawable.y,drawable.max_width);
};
canvas.prototype.get_text_dimensions = function(txt){
  this.ctx.font="20px Georgia";
  return this.ctx.measureText(txt)
};
