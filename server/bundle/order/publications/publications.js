/* All Publications for Order bundle */

Meteor.publish('Order', function () {
  ReactiveAggregate(this, Order, [
    {
      $lookup: {
        from: "Customer",
        localField: "customer_id",
        foreignField: "customer_id",
        as: "customerData"
      }
    },
    {
      $lookup: {
        from: "Product",
        localField: "product_id",
        foreignField: "product_id",
        as: "productData"
      }
    },
    { $unwind: { path: "$customerData", preserveNullAndEmptyArrays: true }},
    { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true }}
  ]);
});