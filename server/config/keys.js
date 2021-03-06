/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./ci');
} else if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dev');
}
