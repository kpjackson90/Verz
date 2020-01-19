const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
require('./Post');
const Post = mongoose.model('post');
const Schema = mongoose.Schema;
const {errorName} = require('../utils/errorConstants');
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  userImage: {
    type: String
  },
  bio: {
    type: String
  },
  image: {
    type: String
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ],
  location: {
    type: String
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.statics.favorite = async function({id, userId}) {
  try {
    /*Find post in database based on Id
     check if user already favorite post.
     if not then add Post to the front of user array*/
    const [favoritePost, existingUser] = await Promise.all([
      Post.findOne({_id: id}),
      this.findOne({_id: userId})
    ]);

    const {favorites} = existingUser;
    const existingFavorite = favorites.indexOf(favoritePost._id);

    if (existingFavorite >= 0) {
      throw new Error(errorName.DUPLICATE_FAVORITE);
    }

    favorites.unshift(favoritePost._id);
    await existingUser.updateOne({$set: {favorites}});

    return favoritePost;
  } catch (err) {
    if (err.message === 'DUPLICATE_FAVORITE') {
      throw err;
    }
    throw new Error(errorName.MISSING_POST);
  }
};

UserSchema.statics.unFavorite = async function({id, userId}) {
  try {
    /**Retrieve post and user. If post is not found, an error is thrown */
    const [favoritePost, existingUser] = await Promise.all([
      Post.findOne({_id: id}),
      this.findOne({_id: userId})
    ]);

    /**get array of favorites. Search and remove this post
     *  Check length of this array to determine if post was found
     * Update the database with the current favorites
     */
    const {favorites} = existingUser;
    const initialLength = favorites.length;
    const newFavorites = favorites.filter(post => post != id);
    const finalLength = newFavorites.length;

    if (initialLength !== finalLength) {
      await existingUser.updateOne({$set: {favorites: newFavorites}});
      return favoritePost;
    }
    throw Error;
  } catch (err) {
    throw new Error(errorName.MISSING_POST);
  }
};

mongoose.model('user', UserSchema);
