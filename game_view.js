function game_view(game){
  view.call(this,game);
  this.drawables = {};
  this.sub_timelines = {};
}


game_view.prototype = new view();
game_view.prototype.constructor = view;
game_view.prototype.init = function(){
  this.drawables = {
    background:[
      new graphic({
        element : this.game.media.graphics.bg.element,
        width   : this.game.config.screen.width,
        height  : this.game.config.screen.height,
        x       : 0,
        y       : 0
      })
    ],
    active_box:[],
    other_boxes:[],
  };
  this.generate_new_box();
};


game_view.prototype.generate_new_box = function(){
  this.active_shape = new shape({
    width   : this.game.config.box_size,
    height  : this.game.config.box_size,
    color   : 'black',
    active  : true,
    step    : this.game.config.box_size,
  },this.game.config.box_size*3,0,
  this.game.media.graphics.crate);
  this.active_shape.generate_boxes();
  
  
  if(this.drawables.active_box)
    this.drawables.active_box.length = 0;
  this.drawables.active_box = this.active_shape.dispense_boxes();
};  

game_view.prototype.update = function(){
  var shape = this.active_shape,
      other_boxes = this.drawables.other_boxes,
      previous_x = shape.x,
      previous_y = shape.y
      self=this;
  
  if(this.game.input.keyboard.get()){
    var input = this.game.input.keyboard.get();
    switch(input){
      case('ESC'):
        this.game.do_action('pause');
      break;
      case('UP'):
        var old_form = shape.active_form;
        
        shape.rotate(old_form+1);
        if(this.shape_collided_with(shape,other_boxes)
        ||this.shape_crossed_bounds(shape,{x:0,y:0, width:this.game.config.screen.width,height:this.game.config.screen.height}))
          shape.rotate(old_form);
      break;
      default:
        var old_x = shape.x,
            old_y = shape.y;
        shape.move(input);
        if(this.shape_collided_with(shape,other_boxes)
          ||this.shape_crossed_bounds(shape,{x:0,y:0, width:this.game.config.screen.width,height:this.game.config.screen.height})){
          shape.x = old_x;
          shape.y = old_y;
          shape.generate_boxes();
        }
    };
  }
  
  
  this.step_buffer += ((this.game.config.speed*1000)/1000)*this.game.performance.delta;
  if(this.step_buffer<1){
    this.drawables.active_box = shape.dispense_boxes();
    return;
  }
  
  shape.move('DOWN');
  this.step_buffer = 0;
  
  if(this.shape_collided_with(shape,other_boxes)
    ||this.shape_crossed_bounds(shape,{x:0,y:0, width:this.game.config.screen.width,height:this.game.config.screen.height})){
    
    if(shape.is_bomb){
      //the shock wave
      var wave = {
        x : shape.x-60,
        y : shape.y-60,
        width : 120,
        height : 120,
      };
      
      var positions_to_kill = [];
      
      other_boxes.forEach(function(box){
        if(self.game.collision.if_collided_with(wave , box)){
          positions_to_kill.push(self.drawables.other_boxes.indexOf(box));
        }
      });
      
      positions_to_kill.forEach(function(position){
        if ( ~position ) self.drawables.other_boxes.splice(position, 1);
      });
      
      this.generate_new_box();
      return;
    }
    
    
    shape.move('UP');
    
    /**
     * check if they touched roof
     */
    if(shape.y <= 0){
      this.game.do_action('game_over');
    }
    
    this.drawables.active_box = shape.dispense_boxes();
    
    //this.sub_timelines.bounce_boxes = [];
    
    this.drawables.active_box.forEach(function(box){
      self.drawables.other_boxes.push(box);
      //self.sub_timelines.bounce_boxes.push(self.drawables.other_boxes.push(box));
    });
    this.generate_new_box();
    //check if lines are complete
    var ys = {};
    this.drawables.other_boxes.forEach(function(element, index){
      if(!ys[element.y])
        ys[element.y] = [element];
      else
        ys[element.y].push(element);
    });
    
    var self = this;
    for(index in ys){
      var row = ys[index];
      if(row.length >= self.game.config.screen.width/this.game.config.box_size){
        row.forEach(function(box){
          var position = self.drawables.other_boxes.indexOf(box);
          if ( ~position ) self.drawables.other_boxes.splice(position, 1);
        });
        
        //move all the box on top one step down.
        for(index2 in ys){
          if(index2<index){
            var row2 = ys[index2];
            row2.forEach(function(box){
              box.move('DOWN',1);
            });
          }
        }
      }
    }
  }
  
  
};


game_view.prototype.do_timelines = function(){
  for(timeline_name in this.sub_timelines){
    this[timeline_name].apply(this,this.sub_timelines[timeline_name])
  }
};

game_view.prototype.bounce_boxes = function(){
  var self = this,
      boxes = Array.prototype.slice.call(arguments);
  
 
  boxes.forEach(function(box_index){
    var box = self.drawables.other_boxes[box_index-1];
    
    if(!box.bounce_status)
      box.bounce_status = {
        direction: 'UP',
        position: 0,
      };
    
    var movement = (10)*self.game.performance.delta,
        position = box.bounce_status.position;
        console.log(movement);
    switch(box.bounce_status.direction){
      case('UP'):
        if(position <= -1)
          return box.bounce_status.direction = 'DOWN';
          
        box.bounce_status.position -= movement;
        box.y -= movement;
      break;
      
      case('DOWN'):
        if(position >= 0){
          delete  self.sub_timelines.bounce_boxes;
          delete  box.bounce_status;
          return;
        }
          
        box.bounce_status.position += movement;
        box.y += movement;
      break;
    }
  });
};


game_view.prototype.shape_crossed_bounds = function(shape,window){
  var layout = shape.layouts[shape.active_letter][shape.active_form],
      rows = layout.length,
      cols = layout[0].length;
      
  return this.game.collision.if_crossed_bounds({
    x  : shape.x,
    y  : shape.y,
    height  : rows*shape.rect_config.height,
    width   : cols*shape.rect_config.width
  },window);
};

game_view.prototype.shape_collided_with = function(shape,other_boxes){
  var boxes = shape.dispense_boxes()
      self = this,
      break_exception= {},
      self = this
      collided = false;
      
  try {
    boxes.forEach(function(box,index){
      if(self.game.collision.if_collided_with_any(box,other_boxes)){
        collided=true;
        throw break_exception;
      }
    });
  } catch(e) {
    if (e!==break_exception) throw e;
  }
  return collided;
};