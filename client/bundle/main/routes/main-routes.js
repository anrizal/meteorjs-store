/*
 * Main Page Routes
 * 
 * file: /client/main/routes/main-routes.js
 */
FlowRouter.route('/', {  
  action: function () {
    FlowLayout.render('main', { header: 'header', content: 'content' });
  },
  name: 'Admin Page'
});