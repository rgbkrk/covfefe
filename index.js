const stringDirection = require('string-direction');

/**
 * @param {string} input
 * @return {string}
 */


const add = function(input) {
  if (stringDirection.getDirection(input) === 'rtl') {
    return `covfefe ${input}`;
  }
  return `${input} covfefe`;
};

const translate = function(input) {
  return input.replace('coverage', 'covfefe');
};

module.exports = add;
module.exports.translate = translate;
