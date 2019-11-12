const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  snaps: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment"
    }
  ]
});

PostSchema.statics.snap = function(id) {
  const Post = mongoose.model("post");

  return Post.findById(id).then(post => {
    ++post.snaps;
    return post.save();
  });
};

PostSchema.statics.addComment = function(id, content) {
  const Comment = mongoose.model("comment");

  return this.findById(id).then(post => {
    const comment = new Comment({ content, post });
    post.comments.push(comment);
    return Promise.all([comment.save(), post.save()]).then(
      ([comment, post]) => post
    );
  });
};

PostSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate("comments")
    .then(post => post.comments);
};

mongoose.model("post", PostSchema);
