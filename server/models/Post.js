const mongoose = require('mongoose');
const {Schema} = mongoose;

require('./User');
const User = mongoose.model('user');

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

PostSchema.statics.findAuthor = async function(id) {
  const {author} = await this.findById(id);

  const a = await User.findOne({_id: author});
  console.log('user', a);
  //return p.author;
};

mongoose.model('post', PostSchema);
