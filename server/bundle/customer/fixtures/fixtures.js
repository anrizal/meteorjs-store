/*Dummy Data
 * file: /server/fixtures */

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

Meteor.startup(function () {
  if (Customer.find().count() === 0) {
    Customer.insert({
      customer_id: Random.hexString(20),
      customer_name: 'Frederik I. Dam',
      customer_address: 'Gartnervænget 16 5492 Vissenbjerg',
      customer_phone: '51-51-76-24',
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Customer.insert({
      customer_id: Random.hexString(20),
      customer_name: 'Oskar N. Jacobsen',
      customer_address: 'Vejlebæksvej 14 4105 Ringsted',
      customer_phone: '52-27-98-23',
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Customer.insert({
      customer_id: Random.hexString(20),
      customer_name: 'Christian R. Ravn',
      customer_address: 'Dosseringen 55 9280 Storvorde',
      customer_phone: '23-99-66-71',
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Customer.insert({
      customer_id: Random.hexString(20),
      customer_name: 'Malene T. Kjeldsen',
      customer_address: 'Ribelandevej 31 8654 Bryrup',
      customer_phone: '21-34-10-36',
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Customer.insert({
      customer_id: Random.hexString(20),
      customer_name: 'Oscar L. Brandt',
      customer_address: 'Lykkesholmvej 77 9362 Gandrup',
      customer_phone: '52-29-51-80',
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
    Customer.insert({
      customer_id: Random.hexString(20),
      customer_name: 'Dennis L. Holst',
      customer_address: 'Degnehøjvej 90 3320 Skævinge',
      customer_phone: '30-53-19-14',
      createdAt: randomDate(new Date(2015, 0, 1), new Date())
    });
  }
});
