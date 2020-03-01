const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeatureSchema = new Schema({
  feature: {
    type: String
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

mongoose.model('feature', FeatureSchema);
