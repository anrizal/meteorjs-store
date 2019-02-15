/*
 * Customer Form
 * 
 * file: /client/customerPage/controller/customerForm.js
 */

//set session default value if it is empty
Template.customerForm.rendered = function () {
  var Customer = Session.get("Customers"); //get widget config from session if exist
  if (_.isEmpty(Customer)) {
    var config = {
      customer_id: Random.hexString(20),
      customer_name: '',
      customer_address: '',
      customer_phone: ''
    };
    Session.set("Customers", config);
  }
};

//HELPERS 
Template.customerForm.helpers({
  customerID: function () {
    if (!_.isEmpty(Session.get('Customers'))) {
      return Session.get('Customers').customer_id;
    }
  },
  //helpers for customer name field
  customerName: function () {
    var CN = {};
    if (!_.isEmpty(Session.get('Customers'))) {
      var CNi = Session.get('Customers').customer_name;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(CNi)) {
        CN = {value: CNi, class: 'active'};
      }
    }
    return CN;
  },
  //helpers for customer address field
  customerAddress: function () {
    var CA = {};
    if (!_.isEmpty(Session.get('Customers'))) {
      var CAi = Session.get('Customers').customer_address;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(CAi)) {
        CA = {value: CAi, class: 'active'};
      }
    }
    return CA;
  },
  //helpers for customer phone field
  customerPhone: function () {
    var CP = {};
    if (!_.isEmpty(Session.get('Customers'))) {
      var CPi = Session.get('Customers').customer_phone;
      //check if the content is empty or not, we are using underscore lib's function
      if (!_.isEmpty(CPi)) {
        CP = {value: CPi, class: 'active'};
      }
    }
    return CP;
  }
});

//Events
Template.customerForm.events({
  //save form changes in session
  'change': function (e, t) {
    //get customer from session
    var Customers = Session.get('Customers');
    //update customer name value in session if it not empty
    if (!_.isEmpty(t.find("input[name=customer_name]").value)) {
      Customers.customer_name = t.find("input[name=customer_name]").value.split(',');
    }
    //update customer address value in session if it not empty
    if (!_.isEmpty(t.find("input[name=customer_address]").value)) {
      Customers.customer_address = t.find("input[name=customer_address]").value.toLowerCase();
    }
    //update customer phone value in session if it not empty
    if (!_.isEmpty(t.find("input[name=customer_phone]").value)) {
      Customers.customer_phone = t.find("input[name=customer_phone]").value.toLowerCase();
    }
    Session.set("Customers", Customers);
  },
  'click .saveCustomerBtn': function (e) {
    //get Customers from session
    var Customers = Session.get('Customers');
    //form ID
    var customerID = e.currentTarget.id.split("_")[1];
    //compare if the form ID match with the customer id
    if (customerID === Customers.customer_id) {
      Meteor.call('upsertCustomer', Customers, function (err, report) {
        if (err) {
          Bert.alert("Error: " + err.reason, 'danger', 'growl-top-left');
          console.log("error occured on receiving data on server. ", err);
        } else {
          Bert.alert(report.msg, report.type, report.style);
          FlowRouter.redirect('/customer');
        }
      });
    } else {
      Bert.alert("Something wrong when trying to save. Please refresh the page", 'danger', 'growl-top-left');
      console.log("Something wrong when trying to save. Please refresh the page");
    }
  }

});