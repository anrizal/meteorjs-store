/*
* nav
* 
* file: /client/main/controller/nav.js
*/

Template.nav.events({
    'click .logout': function () {
        localStorage.removeItem('currentUser');
    }
});