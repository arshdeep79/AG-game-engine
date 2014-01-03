function loading_view(game){
  view.call(this,game);
  this.drawables = {};
  this.loading_status = 0;
  this.progress_bar_width = 200;
  this.progress_bar_height = 10;
}

loading_view.prototype = new view();
loading_view.prototype.constructor = view;

loading_view.prototype.init = function(){
  this.drawables = {
    logo: [
      new graphic({
        element : this.game.media.graphics.powered_by.element,
        width   : this.game.media.graphics.powered_by.width,
        height  : this.game.media.graphics.powered_by.height,
        x  : (this.game.config.screen.width/2)-(this.game.media.graphics.powered_by.width/2),
        y  : (this.game.config.screen.height/2)-(10+this.game.media.graphics.powered_by.height)
      })
    ],
    loader: [
      new rectangle({
        width   : 0,
        height  : this.progress_bar_height,
        fillStyle  : 'black',
        x  : (this.game.config.screen.width/2)-(this.progress_bar_width/2),
        y  : (this.game.config.screen.height/2)+10
      }),
      
      new rectangle({
        width   : this.progress_bar_width+10,
        height  : this.progress_bar_height+10,
        strokeStyle  : 'black',
        lineWidth  : 2,
        x  : (this.game.config.screen.width/2)-(this.progress_bar_width/2)-5,
        y  : (this.game.config.screen.height/2)+10-5
      })
    ]
  };
  
  //load images
  var self = this;
  preload_images([
    {
      id  : 'crate',
      src : 'crate.png',
      width : 30,
      height : 30,
    },
    {
      id  : 'bg',
      src : 'bg.png',
      width : 360,
      height : 510,
    },
    {
      id  : 'menu_bg',
      src : 'menu-bg.png',
      width : 360,
      height : 510,
    },
    {
      id  : 'game_logo',
      src : 'game-logo.png',
      width : 204,
      height : 153,
    },
    {
      id  : 'play_btn',
      src : 'play-btn.png',
      width : 142,
      height : 77,
    },
    {
      id  : 'bomb',
      src : 'bomb.png',
      width : 60,
      height : 60,
    }
  ]
  ,function(file,progress){
    self.game.media.graphics[file.id] = file;
    self.drawables.loader[0].width = (progress/100)*self.progress_bar_width;
  }
  ,function(){
    self.game.do_action('launch');
  });
};



