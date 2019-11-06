var mongoose = require('mongoose');

var billDetail = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    count: Number
}, { timestamps: true })
var BillSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    itemList: [billDetail],
    price: Number
}, { timestamps: true });

mongoose.model('Bill', BillSchema);
