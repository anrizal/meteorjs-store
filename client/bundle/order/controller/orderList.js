/*
 * Order List
 * Listing all orders
 * file: /client/orderPage/controller/orderList.js
 */
Template.orderList.helpers({
  getOrders: function() {
    return Order.find({}, {sort: {createdAt: 1}});
  }
});