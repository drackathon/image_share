if (Meteor.isClient) {
 var img_data = [
   { img_src: "ch4_convent.jpg",
   img_alt: "Convent" },
   { img_src: "ch4_church.jpg",
   img_alt: "Church" },
   { img_src: "ch4_fish1.jpg",
   img_alt: "Dust" }
];
 Template.images.helpers({images:img_data});
}

if (Meteor.isServer) {
  console.log("I am the service");
}
