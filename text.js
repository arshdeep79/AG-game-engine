/**
 * canvas
 */
function text(setup){
  this.text = setup.text;
  this.x = setup.x;
  this.y = setup.y;
  this.max_width = setup.max_width;
}

text.prototype.draw = function(screen){
  screen.draw_text(this);
};

