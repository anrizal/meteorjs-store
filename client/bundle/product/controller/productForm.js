/*
 * Product Form
 * 
 * file: /client/productPage/controller/productForm.js
 */

//set session default value if it is empty
Template.productForm.rendered = function () {
  var Product = Session.get("Products"); //get widget config from session if exist
  if (_.isEmpty(Product)) {
    var config = {
      product_id: Random.hexString(20),
      product_name: '',
      product_color: '',
      product_stock: ''
    };
    Session.set("Products", config);
  }
};

//HELPERS 
Template.productForm.helpers({
  productID: function () {
    if (!_.isEmpty(Session.get('Products'))) {
      return Session.get('Products').product_id;
    }
  },
  //helpers for product name field
  productName: function () {
    var PN = {};
    if (!_.isEmpty(Session.get('Products'))) {
      var PNi = Session.get('Products').product_name;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(PNi)) {
        PN = {value: PNi, class: 'active'};
      }
    }
    return PN;
  },
  //helpers for product address field
  productColor: function () {
    var PA = {};
    if (!_.isEmpty(Session.get('Products'))) {
      var PAi = Session.get('Products').product_color;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(PAi)) {
        PA = {value: PAi, class: 'active'};
      }
    }
    return PA;
  },
  //helpers for product phone field
  productStock: function () {
    var PS = {};
    if (!_.isEmpty(Session.get('Products'))) {
      var PSi = Session.get('Products').product_stock;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(PSi)) {
        PS = {value: PSi, class: 'active'};
      }
    }
    return PS;
  }
});

//Events
Template.productForm.events({
  //save form changes in session
  'change': function (e, t) {
    //get products from session
    var Products = Session.get('Products');
    //update product name value in session if it not empty
    if (!_.isEmpty(t.find("input[name=product_name]").value)) {
      Products.product_name = t.find("input[name=product_name]").value.split(',');
    }
    //update product address value in session if it not empty
    if (!_.isEmpty(t.find("input[name=product_color]").value)) {
      Products.product_color = t.find("input[name=product_color]").value.toLowerCase();
    }
    //update product phone value in session if it not empty
    if (!_.isEmpty(t.find("input[name=product_stock]").value)) {
      Products.product_stock = t.find("input[name=product_stock]").value.toLowerCase();
    }
    Session.set("Products", Products);
  },
  'click .saveProductBtn': function (e) {
    //get products from session
    var Products = Session.get('Products');
    //form ID
    var productID = e.currentTarget.id.split("_")[1];
    //compare if the form ID match with the product id
    if (productID === Products.product_id) {
      Meteor.call('upsertProduct', Products, function (err, report) {
        if (err) {
          Bert.alert("Error: " + err.reason, 'danger', 'growl-top-left');
          console.log("error occured on receiving data on server. ", err);
        } else {
          Bert.alert(report.msg, report.type, report.style);
          FlowRouter.redirect('/product');
        }
      });
    } else {
      Bert.alert("Something wrong when trying to save. Please refresh the page", 'danger', 'growl-top-left');
      console.log("Something wrong when trying to save. Please refresh the page");
    }
  }

});