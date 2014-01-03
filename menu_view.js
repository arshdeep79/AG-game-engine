function menu_view(game){
  view.call(this,game);
  this.drawables = {};
}

menu_view.prototype = new view();
menu_view.prototype.constructor = view;

menu_view.prototype.init = function(){
  this.drawables = {
    'static':[
      new graphic({
        element : this.game.media.graphics.menu_bg.element,
        width   : this.game.media.graphics.menu_bg.width,
        height  : this.game.media.graphics.menu_bg.height,
        x       : 0,
        y       : 0
      }),
      new graphic({
        element : this.game.media.graphics.game_logo.element,
        width   : this.game.media.graphics.game_logo.width,
        height  : this.game.media.graphics.game_logo.height,
        x       : this.game.config.screen.width/2- this.game.media.graphics.game_logo.width/2,
        y       : 50
      })
    ],
    menu:[
      new graphic({
        element : this.game.media.graphics.play_btn.element,
        width   : this.game.media.graphics.play_btn.width,
        height  : this.game.media.graphics.play_btn.height,
        x       : this.game.config.screen.width/2- this.game.media.graphics.play_btn.width/2,
        y       : 300
      })
    ]
  };
};


menu_view.prototype.update = function(){

  if(this.game.input.mouse.get_last_click()){
    var collision = this.game.collision;
    if(collision.if_point_in_rect(
      this.game.input.mouse.get_last_click(),
      this.drawables.menu[0]
    )){
      this.game.do_action('start_game');
    }
  }
};

