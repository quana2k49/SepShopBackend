var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
  typeContent: String,
  status: {
    type: String,
    default: 'active'
  },
  image: String
}, { timestamps: true });

mongoose.model('Type', TypeSchema);
