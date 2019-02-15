/*
 * loggedIns
 * 
 * file: /client/main/controller/loggedIn.js
 */

Template.loggedIn.events({
  'click .logout': function () {
    localStorage.removeItem('currentUser');
  }
});

