/*
 *  Customer Page Routes
 * 
 * file: /client/customerPage/routes/customerPage-routes.js
 */
FlowRouter.route('/customer', {
  subscriptions: function () {
    this.register('Customers', Meteor.subscribe('Customer'));
  },
  action: function () {
    FlowLayout.render('main', {header: 'header', content: 'customerPage'});
  },
  name: 'Customer List'
});

FlowRouter.route('/customer/addcustomer', {
  action: function () {
    delete Session.keys['Customers'];
    FlowLayout.render('main', {header: 'header', content: 'customerForm'});
  },
  name: 'Add New Customer'
});

FlowRouter.route('/customer/editcustomer/:customerID', {
  action: function (params) {
    var config = Customer.find({customer_id: params.customerID}).fetch();
    Session.set("Customers", config[0]);
    //var WC = Session.get('Customers');
    FlowLayout.render('main', {header: 'header', content: 'customerForm'});
  },
  name: 'Edit Customer'
});

FlowRouter.route('/customer/delcustomer/:customerID', {
  action: function (params) {
    var r = window.confirm("are you sure you want to delete the Customer?");
    if (r == true) {
      var config = Customer.find({customer_id: params.customerID}).fetch();
      Meteor.call('deleteCustomer', params.customerID);
      Bert.alert(config[0]['customer_name'] + " is deleted" , 'success', 'growl-top-left');
      FlowRouter.redirect('/customer');
    }
    else {
      FlowRouter.redirect('/customer');
    }
  },
  name: 'Delete Customer'
});