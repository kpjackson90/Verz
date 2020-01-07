exports.errorName = {
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID: "INVALID",
  EP_NOT_PROVIDED: "EP_NOT_PROVIDED",
  EMAIL_IN_USE: "EMAIL_IN_USE"
};

exports.errorType = {
  UNAUTHORIZED: {
    message: "Authentication is needed to get requested response.",
    statusCode: 401
  },

  INVALID: {
    message: "Invalid credentials",
    statusCode: 401
  },

  EP_NOT_PROVIDED: {
    message: "Email or password was not provided",
    statusCode: 401
  },

  EMAIL_IN_USE: {
    message: "Email address is already in use",
    statusCode: 401
  }
};
