/*
 *  Order Page Routes
 * 
 * file: /client/orderPage/routes/orderPage-routes.js
 */
FlowRouter.route('/order', {
  subscriptions: function () {
    this.register('Orders', Meteor.subscribe('Order'));
  },
  action: function () {
    FlowLayout.render('main', {header: 'header', content: 'orderPage'});
  },
  name: 'Order List'
});

FlowRouter.route('/order/addorder', {
  subscriptions: function () {
    this.register('Products', Meteor.subscribe('Product'));
    this.register('Customers', Meteor.subscribe('Customer'));
  },
  action: function () {
    delete Session.keys['Orders'];
    FlowLayout.render('main', {header: 'header', content: 'orderForm'});
  },
  name: 'Add New Order'
});

FlowRouter.route('/order/editorder/:orderID', {
  action: function (params) {
    var config = Order.find({order_id: params.orderID}).fetch();
    Session.set("Orders", config[0]);
    //var WC = Session.get('Orders');
    FlowLayout.render('main', {header: 'header', content: 'orderForm'});
  },
  name: 'Edit Order'
});

FlowRouter.route('/order/delorder/:orderID', {
  action: function (params) {
    var r = window.confirm("are you sure you want to delete the Order?");
    if (r == true) {
      var config = Order.find({order_id: params.orderID}).fetch();
      Meteor.call('deleteOrder', params.orderID);
      Bert.alert("Order number: " + config[0]['order_id'] + " is deleted" , 'success', 'growl-top-left');
      FlowRouter.redirect('/order');
    }
    else {
      FlowRouter.redirect('/order');
    }
  },
  name: 'Delete Order'
});