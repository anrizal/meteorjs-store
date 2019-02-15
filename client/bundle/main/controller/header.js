/*
 * Header
 * 
 * file: /client/main/controller/header.js
 */
Template.header.helpers({  
  routeName: function () {
    return FlowRouter.getRouteName();
  }
});