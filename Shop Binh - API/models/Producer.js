var mongoose = require('mongoose');

var ProducerSchema = new mongoose.Schema({
  producerName: String,
  status: {
    type: String,
    default: 'active'
  }
}, {timestamps: true});

mongoose.model('Producer', ProducerSchema);
