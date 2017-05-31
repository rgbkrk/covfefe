const stringDirection = require('string-direction');

/**
 * @param {string} input
 * @return {string}
 */


exports.add = function(input) {
  if (stringDirection.getDirection(input) === 'rtl') {
    return `covfefe ${input}`;
  }
  return `${input} covfefe`;
};

exports.translate = function(input) {
  return input.replace('coverage', 'covfefe');
};
