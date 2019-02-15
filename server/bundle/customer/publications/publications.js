/* All Publications for Customer bundle */

Meteor.publish('Customer', function () {
  return Customer.find({});
});