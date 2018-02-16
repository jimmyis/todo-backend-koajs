module.exports = function (config) {
  return require('mysql2/promise').createPool(config)
}