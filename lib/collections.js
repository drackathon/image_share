
Images = new Mongo.Collection("images");
//setup security on Images Collection
Images.allow({
  insert:function(userId,doc){

    if(Meteor.user()){//are they logged in?
      if(userId != doc.createdBy){
        return false;
      }else{ // user is logged in, the image has correct userId
        return true;
      }
    }else {//user not logged in
      return false;
    }
  },
  remove:function(userId,doc){
        return true;
  }
});
