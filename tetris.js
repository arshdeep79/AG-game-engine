/**
 * tetris game class
 */
function tetris(){
  ag_game.call(this);
  this.config.screen = {
    width:360,
    height:510
  };
  this.config.box_size = 30;
  this.config.speed = 2;
  this.step_buffer = 0;
  this.views = {
    loading : new loading_view(this),
    menu : new menu_view(this),
    game : new game_view(this),
    pause : new pause_view(this),
    game_over : new game_over_view(this)
  };
  this.active_view_index = 'loading';
  this.media = {
    graphics:{}
  };
}

tetris.prototype = new ag_game();
tetris.prototype.constructor = ag_game;

tetris.prototype.init = function(){
  ag_game.prototype.init.call(this);
  this.get_active_view().init();
};

tetris.prototype.do_action = function(action){
  switch(action){
    case('start_game'):
      this.active_view_index = 'game';
      this.get_active_view().init();
    break;
    case('pause'):
      this.active_view_index = 'pause';
      this.get_active_view().init();
    break;
    case('resume'):
      this.active_view_index = 'game';
    break;
    case('quit'):
    case('launch'):
      this.active_view_index = 'menu';
      this.get_active_view().init();
    break;
    case('game_over'):
      this.active_view_index = 'game_over';
      this.get_active_view().init();
    break;
  }
};

tetris.prototype.update = function(){
  ag_game.prototype.update.call(this);
}

tetris.prototype.draw = function(){
  ag_game.prototype.draw.call(this);
}


tetris.prototype.run = function(){
  var self = this;
  preload_images([
    {
      id  : 'powered_by',
      src : 'powered-by-150-X-47.png',
      width : 150,
      height : 47,
    }
  ]
  ,function(file,progress){
    self.media.graphics[file.id] = file;
  }
  ,function(){
    //console.log(self.media);
    ag_game.prototype.run.call(self);
  });
  
};