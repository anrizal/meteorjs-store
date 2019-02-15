/*
 * Helper function
 * file: /lib/utils/client/helper_functions.js
 */

getObjbyProperty = function getObjWhenPropertyEquals(obj, prop, val) {
  for (var i = 0, l = obj.length; i < l; i++) {
    // check the obj has the property before comparing it
    if (typeof obj[i][prop] === 'undefined')
      continue;

    // if the obj property equals our test value, return the obj
    if (obj[i][prop] === val)
      return obj[i];
  }
  // didn't find an object with the property
  return false;
};
