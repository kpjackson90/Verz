const jwt = require('express-jwt');
const keys = require('../config/keys');

//auth middleware
exports.auth = jwt({
  secret: keys.JWT_SECRET,
  credentialsRequired: false
});
