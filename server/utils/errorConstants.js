exports.errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID: 'INVALID',
  EP_NOT_PROVIDED: 'EP_NOT_PROVIDED',
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  DUPLICATE_FAVORITE: 'DUPLICATE_FAVORITE',
  MISSING_POST: 'MISSING_POST'
};

exports.errorType = {
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response.',
    statusCode: 401
  },

  INVALID: {
    message: 'Invalid credentials',
    statusCode: 401
  },

  EP_NOT_PROVIDED: {
    message: 'Email or password was not provided',
    statusCode: 401
  },

  EMAIL_IN_USE: {
    message: 'Email address is already in use',
    statusCode: 401
  },

  DUPLICATE_FAVORITE: {
    message: 'Item already added to your list of favorites',
    statusCode: 422
  },
  MISSING_POST: {
    message: 'This post does not exist',
    statusCode: 404
  }
};
