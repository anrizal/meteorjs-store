/* All Server side Methods for customer bundle */

//insert to Mongo
var insertCustomerToMongo = function (syn) {
  Customer.insert({
    customer_id: syn['customer_id'],
    customer_name: syn['customer_name'],
    customer_address: syn['customer_address'],
    customer_phone: syn['customer_phone'],
    createdAt: new Date()
  });
};
//update to Mongo
var updateCustomerToMongo = function (syn) {
  Customer.update({customer_id: syn['customer_id']},
  {customer_id: syn['customer_id'],
    customer_name: syn['customer_name'],
    customer_address: syn['customer_address'],
    customer_phone: syn['customer_phone'],
    createdAt: syn['createdAt'],
    updatedAt: new Date()
  });
};

Meteor.methods({
  upsertCustomer: function (Cust) {
    if (Customer.find({"customer_id": Cust.customer_id}).count() === 0) {
      //insert new document
      insertCustomerToMongo(Cust);
      return {msg: 'Customer inserted succesfully', type: 'success', style: 'growl-top-left'};
    } else {
      //update
      updateCustomerToMongo(Cust);
      return {msg: 'Customer updated succesfully', type: 'success', style: 'growl-top-left'};
    }
  },
  deleteCustomer: function (customerID) {
    Customer.remove({customer_id: customerID});
  }
});
