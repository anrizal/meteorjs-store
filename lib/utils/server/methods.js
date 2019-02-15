/*
 * Listing all methods
 * file: /lib/utils/client/methods.js
 */

Meteor.methods({
  getEnvironment: function () {
    return Meteor.settings.env;
  }
});