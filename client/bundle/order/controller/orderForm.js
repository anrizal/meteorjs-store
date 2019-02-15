/*
 * Order Form
 * 
 * file: /client/orderPage/controller/orderForm.js
 */

//set session default value if it is empty
Template.orderForm.rendered = function () {
  var Order = Session.get("Orders"); //get widget config from session if exist
  if (_.isEmpty(Order)) {
    var config = {
      order_id: Random.hexString(20),
      customer_id: '',
      product_id: '',
      quantity: ''
    };
    Session.set("Orders", config);
  }
};

//HELPERS 
Template.orderForm.helpers({
  orderID: function () {
    if (!_.isEmpty(Session.get('Orders'))) {
      return Session.get('Orders').order_id;
    }
  },
  //helpers for order name selector
  custNameSelect: function() {
    //initiate the select list
    var cNS = [{cnLabel: 'Choose Customer Name', disabled: 'disabled'}]
    //get customer list
    cNSM = Customer.find({}, {sort: {customer_name: 1}});
    //append to the select list
    cNSM.forEach(function(item) {
      cNS.push({cnVal: item.customer_id, cnLabel: item.customer_name});
    });

    if (!_.isEmpty(Session.get('Orders'))) {
      //set selected option
      var OCns = Session.get('Orders').customer_name;
    }
    //check if the content is empty or not, we are using underscore lib's function
    if (_.isEmpty(OCns)) {
      cNS[0].selected = 'selected';
    } else {
      //search inside tC to find sTS that has the same value as WCst using our custom function found in lib folder
      var obj = getObjbyProperty(cNS, 'cnVal', OCns);
      //if the object found assign selected
      obj.selected = obj && 'selected';
    }
    return cNS;
  },
  prodNameSelect: function() {
    //initiate the select list
    var pNS = [{pnLabel: 'Choose Product Name', disabled: 'disabled'}]
    //get customer list
    pNSM = Product.find({}, {sort: {product_name: 1}});
    //append to the select list
    pNSM.forEach(function(item) {
      pNS.push({pnVal: item.product_id, pnLabel: item.product_name});
    });

    if (!_.isEmpty(Session.get('Orders'))) {
      //set selected option
      var OPns = Session.get('Orders').product_name;
    }
    //check if the content is empty or not, we are using underscore lib's function
    if (_.isEmpty(OPns)) {
      pNS[0].selected = 'selected';
    } else {
      //search inside tC to find sTS that has the same value as WCst using our custom function found in lib folder
      var obj = getObjbyProperty(pNS, 'pnVal', OPns);
      //if the object found assign selected
      obj.selected = obj && 'selected';
    }
    return pNS;
  },
  //helpers for order phone field
  quantity: function () {
    var QT = {};
    if (!_.isEmpty(Session.get('Orders'))) {
      var QTY = Session.get('Orders').order_phone;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(QTY)) {
        QT = {value: QTY, class: 'active'};
      }
    }
    return QT;
  }
});

//Events
Template.orderForm.events({
  //save form changes in session
  'change': function (e, t) {
    //get order from session
    var Orders = Session.get('Orders');
    //update customer name value in session if it not empty
    if (!_.isEmpty($(t.find("select[name=customer_name]")).val())) {
      Orders.customer_id = t.find("select[name=customer_name]").value;
    }
    //update product name value in session if it not empty
    if (!_.isEmpty($(t.find("select[name=product_name]")).val())) {
      Orders.product_id = t.find("select[name=product_name]").value;
    }
    //update quantity value in session if it not empty
    if (!_.isEmpty(t.find("input[name=quantity]").value)) {
      Orders.quantity = t.find("input[name=quantity]").value.toLowerCase();
    }
    Session.set("Orders", Orders);
  },
  'click .saveOrderBtn': function (e) {
    //get Orders from session
    var Orders = Session.get('Orders');
    //form ID
    var orderID = e.currentTarget.id.split("_")[1];
    //compare if the form ID match with the order id
    if (orderID === Orders.order_id) {
      Meteor.call('upsertOrder', Orders, function (err, report) {
        if (err) {
          Bert.alert("Error: " + err.reason, 'danger', 'growl-top-left');
          console.log("error occured on receiving data on server. ", err);
        } else {
          Bert.alert(report.msg, report.type, report.style);
          FlowRouter.redirect('/order');
        }
      });
    } else {
      Bert.alert("Something wrong when trying to save. Please refresh the page", 'danger', 'growl-top-left');
      console.log("Something wrong when trying to save. Please refresh the page");
    }
  }

});