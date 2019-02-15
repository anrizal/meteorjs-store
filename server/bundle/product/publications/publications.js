/* All Publications for Product bundle */

Meteor.publish('Product', function () {
  return Product.find({});
});