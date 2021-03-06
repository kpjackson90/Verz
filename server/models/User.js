/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const Post = mongoose.model('post');
const { Schema } = mongoose;
const { errorName } = require('../utils/errorConstants');
const { uploadImage } = require('../services/image_upload');

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
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  userImage: {
    type: String
  },
  bio: {
    type: String
  },
  image: {
    type: String,
    default: null
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
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
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

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.statics.favorite = async function({ id, userId }) {
  try {
    /* Find post in database based on Id
     check if user already favorite post.
     if not then add Post to the front of user array */
    const [favoritePost, existingUser] = await Promise.all([
      Post.findOne({ _id: id }),
      this.findOne({ _id: userId })
    ]);

    const { favorites } = existingUser;
    const existingFavorite = favorites.indexOf(favoritePost._id);

    /* User already added to favorites. Then remove from favorites */
    if (existingFavorite >= 0) {
      const newFavorites = favorites.filter(user => user !== id);
      await existingUser.updateOne({ $set: { favorites: newFavorites } });
      return favoritePost;
    }

    favorites.unshift(favoritePost._id);
    await existingUser.updateOne({ $set: { favorites } });

    return favoritePost;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

UserSchema.statics.followUser = async function({ id, userId }) {
  try {
    const [existingUser, newFollow] = await Promise.all([
      this.findOne({ _id: userId }),
      this.findOne({ _id: id })
    ]);

    const { following } = existingUser;
    const { followers } = newFollow;
    const alreadyFollowing = following.indexOf(newFollow._id);

    if (alreadyFollowing >= 0) {
      throw new Error(errorName.DUPLICATE_FOLLOWER);
    }

    // existing user follows user. add to following
    following.unshift(newFollow._id);

    // user gets new follower. add to followers
    followers.unshift(existingUser._id);

    await Promise.all([
      await existingUser.updateOne({ $set: { following } }),
      await newFollow.updateOne({ $set: { followers } })
    ]);

    return newFollow;
  } catch (err) {
    if (err.message === 'DUPLICATE_FOLLOWER') {
      throw err;
    }
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

UserSchema.statics.unFollowUser = async function({ id, userId }) {
  try {
    const [existingUser, oldFollow] = await Promise.all([
      this.findOne({ _id: userId }),
      this.findOne({ _id: id })
    ]);

    const { following } = existingUser;
    const { followers } = oldFollow;

    const alreadyFollowing = following.indexOf(oldFollow._id);

    if (alreadyFollowing < 0) {
      throw new Error(errorName.NOT_FOLLOWING);
    }

    const newFollowing = following.filter(user => user !== id);

    const newFollowers = followers.filter(user => user !== userId);

    await Promise.all([
      await existingUser.updateOne({ $set: { following: newFollowing } }),
      await oldFollow.updateOne({ $set: { followers: newFollowers } })
    ]);

    return oldFollow;
  } catch (err) {
    if (err.message === 'You are not following this user') {
      throw err;
    }
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

UserSchema.statics.findFollowing = async function(id) {
  try {
    const { following } = await this.findOne({ _id: id });
    const followedUsers = await Promise.all(
      following.map(async user => await this.findOne({ _id: user }))
    );

    return followedUsers;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

UserSchema.statics.findFollowers = async function(id) {
  try {
    const { followers } = await this.findOne({ _id: id });
    const followingUsers = await Promise.all(
      followers.map(async user => await this.findOne({ _id: user }))
    );

    return followingUsers;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

UserSchema.statics.sharePost = async function({ id, userId }) {
  try {
    const [existingUser, existingPost] = await Promise.all([
      this.findOne({ _id: userId }),
      Post.findOne({ _id: id })
    ]);

    const { posts } = existingUser;
    const { sharedBy } = existingPost;

    posts.unshift(id);
    sharedBy.unshift(userId);

    await Promise.all([
      existingUser.updateOne({ $set: { posts } }),
      existingPost.updateOne({ $set: { sharedBy } })
    ]);

    return existingUser;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

UserSchema.statics.uploadImage = async function({ userId, userImage }) {
  try {
    if (userImage.trim().length <= 0) {
      throw new Error(errorName.NO_IMAGE);
    }

    const existingUser = await this.findOne({ _id: userId });
    const params = {
      username: existingUser.email,
      imagePost: userImage,
      type: 'profile'
    };
    const base64 = await uploadImage(params);

    if (!base64) {
      throw new Error(errorName.INCORRECT_IMAGE_FORMAT);
    }

    await existingUser.updateOne({ $set: { image: base64.secure_url } });
    return existingUser;
  } catch (err) {
    if (err.message === 'NO_IMAGE') {
      return err;
    }
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

mongoose.model('user', UserSchema);
