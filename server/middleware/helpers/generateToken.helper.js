const util = require('util');
const jwt = require('jsonwebtoken');

util.promisify(jwt.sign);

exports.generateToken = async user => {
  return await jwt.sign(user, 'randomJWTstringwasinsertedherefortesting', {
    expiresIn: 10080
  });
};
