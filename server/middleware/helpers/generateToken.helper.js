const jwt = require("jsonwebtoken");

exports.generateToken = user => {
  return jwt.sign(user, "your_jwt_secret", {
    expiresIn: 10080
  });
};
