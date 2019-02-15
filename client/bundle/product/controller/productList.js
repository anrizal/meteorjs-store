/*
 * Product List
 * Listing all products
 * file: /client/productPage/controller/productList.js
 */
Template.productList.helpers({
  getProducts: function() {
    return Product.find({}, {sort: {product_name: 1}});
  }
});