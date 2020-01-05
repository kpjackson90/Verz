const jwt = require("jsonwebtoken");

exports.generateToken = user => {
  return jwt.sign(user, "randomJWTstringwasinsertedherefortesting", {
    expiresIn: 10080
  });
};
