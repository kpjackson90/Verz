const mongoose = require('mongoose');
const {errorName} = require('../utils/errorConstants');
const {Schema} = mongoose;

//Review these
// var uniqueValidator = require('mongoose-unique-validator');
// var slug = require('slug');

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
    //Decide if to remove this data object
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
    //Look into this
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
  {timestamps: true}
);

PostSchema.statics.snap = function(id) {
  const Post = mongoose.model('post');

  return Post.findById(id).then(post => {
    ++post.snaps;
    return post.save();
  });
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
    const comment = new Comment({content, post});
    post.comments.push(comment);
    return Promise.all([comment.save(), post.save()]).then(
      ([comment, post]) => post
    );
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
    const existingUser = await User.findOne({_id: id});
    const {posts} = existingUser;

    const existingPost = await Promise.all(
      posts.map(async post_id => await this.findOne({_id: post_id}))
    );

    return existingPost;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

PostSchema.statics.addPost = async function({title, body, tags, userId}) {
  try {
    const User = mongoose.model('user');
    const [newPost, existingUser] = await Promise.all([
      this.create({title, body, tags, author: userId}),
      User.findOne({_id: userId})
    ]);

    const {posts} = existingUser;
    posts.unshift(newPost._id);
    await existingUser.updateOne({$set: {posts}});

    return newPost;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

PostSchema.statics.findAuthor = async function(id) {
  try {
    const User = mongoose.model('user');
    const {author} = await this.findById(id);
    const user = await User.findOne({_id: author});
    return user;
  } catch (err) {
    throw new Error(errorName.RESOURCE_NOT_FOUND);
  }
};

mongoose.model('post', PostSchema);
