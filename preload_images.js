function preload_images(arr,progress,complete){
    var newimages=[], loadedimages=0
    var postaction=complete?complete:function(){};
    var progress=progress?progress:function(){};
    
    var arr=(typeof arr!="object")? [arr] : arr;
    function imageloadpost(image){
      loadedimages++;
      progress(image,((loadedimages/arr.length)*100));
      if (loadedimages==arr.length){
        postaction(arr); //call postaction and pass in newimages array as parameter
      }
    }
    arr.forEach(function(object,index){
      object.element = new Image();      
      object.element.onload=function(){
        imageloadpost(object)
      };
      object.onerror=function(){
        imageloadpost(object)
      };
      object.element.src = object.src;
    });
}