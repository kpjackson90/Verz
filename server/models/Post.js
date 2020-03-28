/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const { errorName } = require('../utils/errorConstants');
const { uploadImage } = require('../services/image_upload');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true
    },
    description: {
      type: String
    },
    body: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    },
    snaps: {
      type: Number,
      default: 0
    },
    unsnaps: {
      type: Number,
      default: 0
    },
    favorites_count: {
      type: Number,
      default: 0
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    tags: [
      {
        type: String,
        unique: true
      }
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }
    ],
    sharedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  { timestamps: true }
);

PostSchema.statics.snap = async function(id) {
  const Post = mongoose.model('post');

  const post = await Post.findById(id);
  ++post.snaps;
  return post.save();
};

PostSchema.statics.unsnap = function(id) {
  const Post = mongoose.model('post');

  return Post.findById(id).then(post => {
    ++post.unsnaps;
    return post.save();
  });
};

PostSchema.statics.addComment = function(id, content) {
  const Comment = mongoose.model('comment');

  return this.findById(id).then(post => {
    const comment = new Comment({ content, post });
    post.comments.push(comment);
    return Promise.all([comment.save(), post.save()]).then(([, post]) => post);
  });
};

PostSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(post => post.comments);
};

PostSchema.statics.getTags = function(id) {
  return this.findById(id)
    .populate('tags')
    .then(post => post.tags);
};

PostSchema.statics.fetchPost = async function(id) {
  try {
    const User = mongoose.model('user');
    const existingUser = await User.findOne({ _id: id });
    const { posts } = existingUser;

    const existingPost = await Promise.all(
      posts.map(async postId => await this.findOne({ _id: postId }))
    );

    return existingPost;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

PostSchema.statics.addPost = async function({ title, body, imagePost, tags, userId }) {
  try {
    let base64;
    let postParams = {
      title,
      body,
      tags,
      author: userId
    };
    const User = mongoose.model('user');

    if (imagePost.trim().length > 0) {
      const params = {
        userId,
        imagePost,
        type: 'post'
      };
      base64 = await uploadImage(params);
      if (!base64) {
        throw new Error(errorName.INCORRECT_IMAGE_FORMAT);
      }
    }

    if (base64) {
      postParams = {
        ...postParams,
        image: base64.secure_url
      };
    } else {
      postParams = {
        ...postParams,
        image: null
      };
    }

    const [newPost, existingUser] = await Promise.all([
      this.create(postParams),
      User.findOne({ _id: userId })
    ]);

    const { posts } = existingUser;
    posts.unshift(newPost._id);
    await existingUser.updateOne({ $set: { posts } });

    return newPost;
  } catch (err) {
    if (err.message === 'INCORRECT_IMAGE_FORMAT') {
      return err;
    }
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

PostSchema.statics.findAuthor = async function(id) {
  try {
    const User = mongoose.model('user');
    const { author } = await this.findById(id);
    const user = await User.findOne({ _id: author });
    return user;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

mongoose.model('post', PostSchema);
