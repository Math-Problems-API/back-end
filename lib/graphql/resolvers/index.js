const binary = require('./binary');
const operandTypes = require('./operandTypes');
const presets = require('./presets');

module.exports = {
  ...binary,
  ...operandTypes,
  ...presets
}
