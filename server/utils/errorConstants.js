exports.errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID: 'INVALID',
  EP_NOT_PROVIDED: 'EP_NOT_PROVIDED',
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  DUPLICATE_FAVORITE: 'DUPLICATE_FAVORITE',
  DUPLICATE_FOLLOWER: 'DUPLICATE_FOLLOWER',
  NOT_FOLLOWING: 'NOT_FOLLOWING',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  INCORRECT_IMAGE_FORMAT: 'INCORRECT_IMAGE_FORMAT'
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
  DUPLICATE_FOLLOWER: {
    message: 'You are already following this user',
    statusCode: 400
  },
  NOT_FOLLOWING: {
    message: 'You are not following this user',
    statusCode: 400
  },
  RESOURCE_NOT_FOUND: {
    message: 'Not Found',
    statusCode: 404
  },
  INCORRECT_IMAGE_FORMAT: {
    message: 'Image format is incorrect',
    statusCode: 400
  }
};
