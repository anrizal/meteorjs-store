/*
 * Customer List
 * Listing all customers
 * file: /client/customerPage/controller/customerList.js
 */
Template.customerList.helpers({
  getCustomers: function() {
    return Customer.find({}, {sort: {customer_data_text: 1}});
  }
});