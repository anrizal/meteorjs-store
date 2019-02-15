/* All Server side Methods for product bundle */

//insert to Mongo
var insertProductToMongo = function (syn) {
  Product.insert({
    product_id: syn['product_id'],
    product_name: syn['product_name'],
    product_color: syn['product_color'],
    product_stock: parseInt(syn['product_stock']),
    createdAt: new Date()
  });
};
//update to Mongo
var updateProductToMongo = function (syn) {
  Product.update({product_id: syn['product_id']},
  {product_id: syn['product_id'],
    product_name: syn['product_name'],
    product_color: syn['product_color'],
    product_stock: parseInt(syn['product_stock']),
    createdAt: syn['createdAt'],
    updatedAt: new Date()
  });
};

Meteor.methods({
  upsertProduct: function (Prod) {
    if (Product.find({"product_id": Prod.product_id}).count() === 0) {
      //insert new document
      insertProductToMongo(Prod);
      return {msg: 'Product inserted succesfully', type: 'success', style: 'growl-top-left'};
    } else {
      //update
      updateProductToMongo(Prod);
      return {msg: 'Product updated succesfully', type: 'success', style: 'growl-top-left'};
    }
  },
  deleteProduct: function (productID) {
    Product.remove({product_id: productID});
  }
});
