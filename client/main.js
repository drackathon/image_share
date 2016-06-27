Session.set("imageLimit",8);
lastScrollTop = 0;
$(window).scroll(function(event){
  // Test if we are near the bottom of the window
  if($(window).scrollTop() + $(window).height() > $(document).height()-100){
    //Where are we in the page?
    var scrollTop = $(this).scrollTop();
    // test if we are going down
    if(scrollTop >= lastScrollTop){
      // yes we are heading down....
      Session.set("imageLimit",Session.get('imageLimit')+4);
    }
    lastScrollTop = scrollTop;
  }

});

Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});

Template.body.helpers({username:function(event){
  if(Meteor.user()){
    return Meteor.user().username;
  }else {
    return "anonymous internet user";
  }
}});


Template.images.helpers({
  images:function(){
    if(Session.get("userFilter")){ //User selects Filter!
      return Images.find({createdBy:Session.get("userFilter")},{sort:{createdOn:-1, rating:-1}});
    }else{
      return Images.find({},{sort:{createdOn:-1, rating:-1}, limit:Session.get("imageLimit")});
    }
  },
  filtering_images:function(){
    if(Session.get("userFilter")){
      return true;
    }else{
      return false;
    }
  },
  getFilterUser:function(){
    var user= Meteor.users.findOne({_id:Session.get("userFilter")});
    if(user){
      return user.username;
    }else{
      return "anon";
    }
  },
  getUser:function(user_id){
    var usr= Meteor.users.findOne({_id:user_id});

    if(usr){
      console.log("User:"+usr.username);
      return usr.username;
    }else {
      console.log("User-id:"+user_id);
      return "anon";
    }
  }
});


Template.images.events({
  'click .js-image':function(event){
    console.log(event);
    $(event.target).css("width","50px");
  },
  'click .js-del-image':function(event){
    var image_id = this._id;
    console.log("image_share.js: "+image_id);
    $("#"+image_id).hide('slow',function(){
      Images.remove({"_id":image_id});
    });
  },
  'click .js-rate-image':function(event){
    var rating=$(event.currentTarget).data("userrating");
    var image_id=this.id;
    console.log("rated: "+rating+" for image: "+image_id);
    Images.update({_id:image_id},{$set: {rating:rating}});
  },
  'click .js-show-image-form':function(event){
    console.log("modal");
    $("#image_add_form").modal('show');
  },
  'click .js-set-image-filter':function(event){
    Session.set("userFilter", this.createdBy);
  },
  'click .js-unset-image-filter':function(event){
    Session.set("userFilter", undefined);
  }
});


Template.image_add_form.events({
  'submit .js-add-image':function(event){
    var img_src= event.target.img_src.value;
    var img_alt= event.target.img_alt.value;
    console.log("src:"+img_src+" alt:"+img_alt);
    if(Meteor.user()){
      console.log(">>>>" +Meteor.user()._id);
      Images.insert({
        "img_src":img_src,
        "img_alt":img_alt,
        createdOn:new Date(),
        createdBy: Meteor.user()._id
      });
    }
    $("#image_add_form").modal('hide');
    return false;
  }
});
