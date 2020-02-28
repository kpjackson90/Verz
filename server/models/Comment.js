/* eslint-disable no-plusplus */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  },
  snaps: {
    type: Number,
    default: 0
  },
  unsnaps: {
    type: Number,
    default: 0
  }
});

// eslint-disable-next-line func-names
CommentSchema.statics.snap = async function(id) {
  const Comment = mongoose.model('comment');

  const comment = await Comment.findById(id);
  // eslint-disable-next-line no-plusplus
  ++comment.snaps;
  return comment.save();
};

CommentSchema.statics.unsnap = async function(id) {
  const Comment = mongoose.model('comment');

  const comment = await Comment.findById(id);
  ++comment.unsnaps;
  return comment.save();
};

mongoose.model('comment', CommentSchema);
