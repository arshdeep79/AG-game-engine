function shape(rect_config,x,y,crate){
  this.rect_config = rect_config;
  this.x = x;
  this.y = y;
  this.collision = collision;
  this.crate = crate;
  
  this.letters = ['L','J','S','Z','O','I','T'/*,'U'*/];
  this.layouts = {
    'S' : [
      [[0,1,1],
       [1,1,0]],
       
      [[1,0],
       [1,1],
       [0,1]],
    ],
    'Z' : [
      [[1,1,0],
       [0,1,1]],
       
      [[0,1],
       [1,1],
       [1,0]],
    ],
    'L' : [
      [ [1,0],
        [1,0],
        [1,1]],
        
      [ [1,1,1],
        [1,0,0]],
        
      [ [1,1],
        [0,1],
        [0,1]],
        
      [ [0,0,1],
        [1,1,1]],
    ],
    'J' : [
      [ [0,1],
        [0,1],
        [1,1]],
        
      [ [1,0,0],
        [1,1,1]],
        
      [ [1,1],
        [1,0],
        [1,0]],
        
      [ [1,1,1],
        [0,0,1]],
    ],
    'O' : [
      [ [1,1],
        [1,1]],
    ],
    'I' : [
      [ [1],
        [1],
        [1],
        [1]],
      [ [1,1,1,1]]
    ],
    
    'i' : [
      [ [1],
        [1],
        [1]],
      [ [1,1,1]],
    ],
    /*'U' : [
      [ [1,0,1],
        [1,1,1]],
      [ [1,1],
        [1,0],
        [1,1]],
      [ [1,1,1],
        [1,0,1]],
      [ [1,1],
        [0,1]
        [1,1]],
    ],*/
    'T' : [
      [ [1,1,1],
        [0,1,0]],
      [ [0,1],
        [1,1],
        [0,1]],
      [ [0,1,0],
        [1,1,1]],
      [ [1,0],
        [1,1],
        [1,0]],
    ]
  };
  
  if(!window.bomb_counter)
    window.bomb_counter =1;
  
  /*if(window.bomb_counter%5 == 0){
    this.active_letter = 'O';
    this.is_bomb = true;
    console.log('bomb released');
  }else{*/
    var random_index = Math.floor(Math.random()*this.letters.length);
    this.active_letter = this.letters[random_index];
    this.is_bomb = false;
  /*}
  window.bomb_counter++;*/
  
  this.active_form= 0;
  this.boxes = [];
};

shape.prototype.dispense_boxes = function(){
  return this.boxes;
};

shape.prototype.generate_boxes = function(){
  var self = this;
  this.boxes.length = 0;
  var layout = this.layouts[this.active_letter][this.active_form];
  layout.forEach(function(row, row_index){
    try{
      row.forEach(function(column, column_index){
        if(layout[row_index][column_index]){
          var rect_x = self.x+(column_index*self.rect_config.width),
              rect_y = self.y+(row_index*self.rect_config.width);
          self.boxes.push(new graphic({
                          element     : self.crate.element,
                          width   : self.rect_config.width,
                          height  : self.rect_config.height,
                          step    : self.rect_config.width,
                          x       : rect_x,
                          y       : rect_y
                        }));
        }
      });
    }catch(e){
      console.log(e);
      /*console.log('letter',self.layouts[self.active_letter]);
      console.log('layout',layout);
      console.log('row',row);
      console.log('row_index',row_index);
      console.log('active form:',self.active_form);
      console.log('active_letter:',self.active_letter);*/
    }
  });
};


shape.prototype.rotate = function(form_index){
  //console.log(form_index);
  this.active_form = form_index;
  //console.log('form_index',form_index);
  if(this.layouts[this.active_letter].length <= this.active_form){
    //console.log('no such form');
    //console.log(this.active_form);
    //console.log(this.layouts[this.active_letter].length);
    this.active_form = 0;
    //console.log(this.layouts[this.active_letter][this.active_form]);
  }
  
  //console.log('final active form',this.active_form);
  this.generate_boxes();
};

shape.prototype.move = function(direction){
  switch(direction){
    case('UP'):
      this.y = this.y-this.rect_config.height;
    break;
    case('RIGHT'):
      this.x = this.x+this.rect_config.height;
    break;
    case('DOWN'):
      this.y = this.y+this.rect_config.height;
    break;
    case('LEFT'):
      this.x = this.x-this.rect_config.height;
    break;
  }
  this.generate_boxes();
};





