if(Meteor.isServer){
  Meteor.startup(function(){
    if(Images.find().count()==0){
      for(var i=1;i<=16;i++){
        var image="image_"+i+".jpg";
      Images.insert(
        {
          img_src: image,
          img_alt: "Image number" +i
        }
      );
      console.log("startup.js"+image);
    }
  }});
}
