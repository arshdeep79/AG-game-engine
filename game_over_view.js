function game_over_view(game){
  view.call(this,game);
  this.drawables = {};
}

game_over_view.prototype = new view();
game_over_view.prototype.constructor = view;

game_over_view.prototype.init = function(){

  this.drawables = {
    menu:[
      new text({text  : '<< Start Over',
                x : (this.game.config.screen.width/2) - (this.game.screen.get_text_dimensions('<< Start Over').width/2),
                y : 100,
                max_width  : 1000}),
    ]
  };
};


game_over_view.prototype.update = function(){

  if(this.game.input.mouse.get_last_click()){
    var collision = this.game.collision;
    if(collision.if_point_in_rect(
      this.game.input.mouse.get_last_click(),
      {
        x : (this.game.config.screen.width/2) - (this.game.screen.get_text_dimensions('<< Start Over').width/2),
        y : 100-20,
        height : 20,
        width :this.game.screen.get_text_dimensions('<< Start Over').width
      }
    ))
      this.game.do_action('quit');
  }
};

