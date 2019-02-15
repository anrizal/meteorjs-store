/*Dummy Data
 * file: /server/fixtures */

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

Meteor.startup(function () {
  if (Product.find().count() === 0) {
    Product.insert({
      product_id: Random.hexString(20),
      product_name: 'Wilfa',
      product_color: 'White',
      product_stock: 10,
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Product.insert({
      product_id: Random.hexString(20),
      product_name: 'Cup',
      product_color: 'Black',
      product_stock: 23,
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Product.insert({
      product_id: Random.hexString(20),
      product_name: 'Knife',
      product_color: 'Red',
      product_stock: 71,
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Product.insert({
      product_id: Random.hexString(20),
      product_name: 'Microwave',
      product_color: 'Brown',
      product_stock: 36,
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Product.insert({
      product_id: Random.hexString(20),
      product_name: 'Fridge',
      product_color: 'Yellow',
      product_stock: 80,
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Product.insert({
      product_id: Random.hexString(20),
      product_name: 'Plates',
      product_color: 'Blue',
      product_stock: 14,
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
  }
});
