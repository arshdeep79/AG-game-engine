function collision(){}

collision.prototype.if_crossed_bounds = function(entity,bounds){
  if((entity.x < bounds.x)
    ||
    (entity.y < bounds.y)
    ||
    (entity.y+entity.height > bounds.height)
    ||
    (entity.x+entity.width > bounds.width))
    return true;
  return false;
};

collision.prototype.if_collided_with = function(objA,objB){
  var left1 = objA.x,
      left2 = objB.x,
      right1 = objA.x+objA.width-1, 
      right2 = objB.x+objB.width-1,
      top1 = objA.y, 
      top2 = objB.y,
      bottom1 = objA.y + objA.height-1, 
      bottom2 = objB.y + objB.height-1;

  if (bottom1 < top2) return false;
  if (top1 > bottom2) return false;
  if (right1 < left2) return false;
  if (left1 > right2) return false;
  return true;
};

collision.prototype.if_collided_with_any = function(entity,other_entities){
  
  var break_exception= {},
      self = this
      collided = false;
  try {
    other_entities.forEach(function(other_entity, index){
      if(self.if_collided_with(entity,other_entity)){
        collided=true;
        throw break_exception;
      }
    });
  } catch(e) {
    if (e!==break_exception) throw e;
  }
  return collided;
  
};

collision.prototype.if_point_in_rect = function(point,rect){
  return((point.x >= rect.x)
          &&
          (point.x <= rect.x+rect.width)
          &&
          (point.y >= rect.y)
          &&
          (point.y <= rect.y+rect.height));
};