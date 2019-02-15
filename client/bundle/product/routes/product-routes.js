/*
 *  Product Page Routes
 * 
 * file: /client/productPage/routes/productPage-routes.js
 */
FlowRouter.route('/product', {
  subscriptions: function () {
    this.register('Products', Meteor.subscribe('Product'));
  },
  action: function () {
    FlowLayout.render('main', {header: 'header', content: 'productPage'});
  },
  name: 'Product List'
});

FlowRouter.route('/product/addproduct', {
  action: function () {
    delete Session.keys['Products'];
    FlowLayout.render('main', {header: 'header', content: 'productForm'});
  },
  name: 'Add New Product'
});

FlowRouter.route('/product/editproduct/:productID', {
  action: function (params) {
    var config = Product.find({product_id: params.productID}).fetch();
    Session.set("Products", config[0]);
    //var WC = Session.get('Products');
    FlowLayout.render('main', {header: 'header', content: 'productForm'});
  },
  name: 'Edit Product'
});

FlowRouter.route('/product/delproduct/:productID', {
  action: function (params) {
    var r = window.confirm("are you sure you want to delete the Product?");
    if (r == true) {
      var config = Product.find({product_id: params.productID}).fetch();
      Meteor.call('deleteProduct', params.productID);
      Bert.alert(config[0]['product_name'] + " is deleted" , 'success', 'growl-top-left');
      FlowRouter.redirect('/product');
    }
    else {
      FlowRouter.redirect('/product');
    }
  },
  name: 'Delete Product'
});