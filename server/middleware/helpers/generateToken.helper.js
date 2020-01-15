const util = require('util');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

util.promisify(jwt.sign);

exports.generateToken = async user => {
  // return await jwt.sign(user, 'randomJWTstringwasinsertedherefortesting', {
  //   expiresIn: 10080
  // });

  return await jwt.sign(user, keys.JWT_SECRET, {
    expiresIn: 10080
  });
};
