/*
 * Content
 * 
 * file: /client/main/controller/content.js
 */
Template.content.events({
     'click a': function () {
      Meteor.logout(function() {});
     }
});
