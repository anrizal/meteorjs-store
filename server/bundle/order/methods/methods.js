/* All Server side Methods for customer bundle */

//reduce product quantity
var reduceProductQuantity = function (productID, qty) {
  Product.update({product_id: productID},
      { $inc: { product_stock: -1*qty} });
};
//insert to Mongo
var insertOrderToMongo = function (syn) {
  Order.insert({
    order_id: syn['order_id'],
    product_id: syn['product_id'],
    customer_id: syn['customer_id'],
    quantity: parseInt(syn['quantity']),
    createdAt: new Date()
  });
  reduceProductQuantity(syn['product_id'], parseInt(syn['quantity']));
};
//update to Mongo
var updateOrderToMongo = function (syn) {
  Order.update({order_id: syn['order_id']},
  {order_id: syn['order_id'],
    product_id: syn['product_id'],
    customer_id: syn['customer_id'],
    quantity: parseInt(syn['quantity']),
    createdAt: syn['createdAt'],
    updatedAt: new Date()
  });
};

Meteor.methods({
  upsertOrder: function (Ord) {
    if (Order.find({"order_id": Ord.order_id}).count() === 0) {
      //insert new document
      insertOrderToMongo(Ord);
      return {msg: 'Order inserted succesfully', type: 'success', style: 'growl-top-left'};
    } else {
      //update
      updateOrderToMongo(Ord);
      return {msg: 'Order updated succesfully', type: 'success', style: 'growl-top-left'};
    }
  },
  deleteOrder: function (orderID) {
    Order.remove({order_id: orderID});
  }
});
