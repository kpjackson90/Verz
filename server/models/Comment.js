const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
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

CommentSchema.statics.snap = function(id) {
  const Comment = mongoose.model("comment");

  return Comment.findById(id).then(comment => {
    ++comment.snaps;
    return comment.save();
  });
};

CommentSchema.statics.unsnap = function(id) {
  const Comment = mongoose.model("comment");

  return Comment.findById(id).then(comment => {
    ++comment.unsnaps;
    return comment.save();
  });
};

mongoose.model("comment", CommentSchema);
