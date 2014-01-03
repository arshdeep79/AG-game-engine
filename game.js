/**
 * Main game class
 */
function ag_game(){
  this.config = {
    FPS : 60,
    screen : {
      width   : 800,
      height  : 600
    }
  };
  this.drawables = [];
  this.frame_count = 2;
  this.performance = {
    delta : 0
  };
  this.views = {};
  this.active_view_index = '';
}

//init screen and other objects
ag_game.prototype.init = function(){
  this.init_screen();
  this.init_input();
  this.init_collision();
  this.init_performance();
};

ag_game.prototype.get_active_view = function(){
  return this.views[this.active_view_index];
}

ag_game.prototype.init_performance = function(){
  var self = this;
  setInterval(function(){
    var html = ['<table width="100px">'];
    for(key in self.performance){
      html.concat([
        '<tr>',
          '<td>',key,'</td>',
          '<td>',self.performance[key],'</td>',
        '</tr>']);
    }
    html.push('</table>');
    document.getElementById('performance').innerHTML = html.join('');
  },1000);
};
//while initializing screen, child class can override with their own implementations of screen.
ag_game.prototype.init_screen = function(){
  this.screen = new canvas(this.config.screen);
};
ag_game.prototype.init_input = function(){
  this.input = {
    'keyboard' : new keyboard(),
    'mouse' : new mouse(this.screen)
  };
};
ag_game.prototype.init_collision = function(){
  this.collision = new collision();
};

ag_game.prototype.load_content = function(){};
ag_game.prototype.update = function(){
  this.get_active_view().update();
  this.get_active_view().do_timelines();
  
  //flush all inputs
  for(input_type in this.input)
    this.input[input_type].clear_buffer();
  
};

ag_game.prototype.draw = function(){
  this.screen.clear();
  
  var drawables = this.get_active_view().drawables,
      self = this;
      
  for(element_type in drawables){
    drawables[element_type].forEach(function(element){
      element.draw(self.screen);
    });
  }
  
  //update framecount
  this.frame_count = this.frame_count+1;
  if(this.frame_count > this.config.FPS)
    this.frame_count=1;
};


ag_game.prototype.run = function(){
  var self = this;
  
  this.init();
  this.load_content();
  
  var current_time = new Date().getTime();
  self.performance.total_time = 0;
  
  setInterval(function(){
    var new_time = new Date().getTime();
    self.performance.frame_time = new_time - current_time;
    self.performance.fps = 1000/self.performance.frame_time;
    self.performance.delta = self.performance.frame_time/1000;
    self.performance.total_time += self.performance.delta;
    current_time = new_time;
    
    self.update();
    self.draw();
  },1);
};