const stringDirection = require('string-direction')
/**
 * @param {string} input
 * @return {string}
 */
module.exports = function (input) {
  if (stringDirection.getDirection(input) === 'rtl') {
    return `covfefe ${input}`
  }
  return `${input} covfefe`
}
