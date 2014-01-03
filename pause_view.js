function pause_view(game){
  view.call(this,game);
  this.drawables = {};
}

pause_view.prototype = new view();
pause_view.prototype.constructor = view;

pause_view.prototype.init = function(){

  this.drawables = {
    menu:[
      new text({text  : '<< Quit',
                x : (this.game.config.screen.width/2) - (this.game.screen.get_text_dimensions('<< Quit').width/2),
                y : 100,
                max_width  : 1000}),
                
      new text({text  : '< Resume',
                x : (this.game.config.screen.width/2) - (this.game.screen.get_text_dimensions('< Resume').width/2),
                y : 140,
                max_width  : 1000}),
    ]
  };
};


pause_view.prototype.update = function(){

  if(this.game.input.mouse.get_last_click()){
    var collision = this.game.collision;
    if(collision.if_point_in_rect(
      this.game.input.mouse.get_last_click(),
      {
        x : (this.game.config.screen.width/2) - (this.game.screen.get_text_dimensions('Start Game >').width/2),
        y : 100-20,
        height : 20,
        width :this.game.screen.get_text_dimensions('Start Game >').width
      }
    ))
      this.game.do_action('quit');
    else if(collision.if_point_in_rect(
      this.game.input.mouse.get_last_click(),
      {
        x : (this.game.config.screen.width/2) - (this.game.screen.get_text_dimensions('Start Game >').width/2),
        y : 140-20,
        height : 20,
        width :this.game.screen.get_text_dimensions('Start Game >').width
      }
    ))
      this.game.do_action('resume');
  }
};

