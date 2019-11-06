var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  itemName: String,
  price: Number,
  description: String,
  image: String,
  purchaseNumber: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'active'
  },
  itemType: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', default: null },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', default: null }
}, { timestamps: true });

mongoose.model('Item', ItemSchema);
