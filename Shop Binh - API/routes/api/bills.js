var mongoose = require('mongoose');
var router = require('express').Router();
var Bill = mongoose.model('Bill');
var auth = require('../auth');

router.get('/', function (req, res, next) {
  Bill.find().populate({
    path: 'user', select: 'username email'
  }).populate({
    path: 'itemList',
    populate: {
      path: 'item', select: 'price itemName producer',
      populate: { path: 'producer', select: 'producerName' }
    }
  }).then(function (bill) {
    return res.json({ data: bill });
  }).catch(next);
});

router.post('/', function (req, res, next) {
  var bill = new Bill(req.body.bill)
  bill.save().then(function () {
    return res.json({ data: bill });
  }).catch(next);
});

router.put('/:id', function (req, res, next) {
  Bill.findByIdAndUpdate(req.params.id, req.body.bill, { new: true }).populate({
    path: 'user', select: 'username email'
  }).populate({
    path: 'itemList',
    populate: {
      path: 'item', select: 'price itemName producer',
      populate: { path: 'producer', select: 'producerName' }
    }
  })
    .then(bill => {
      if (!bill) { return res.sendStatus(401); };
      return res.json({ data: bill });
    }).catch(next);
});

router.get('/:id', function (req, res, next) {
  Bill.findById(req.params.id).populate({
    path: 'user', select: 'username email'
  }).populate({
    path: 'itemList',
    populate: {
      path: 'item', select: 'price itemName producer',
      populate: { path: 'producer', select: 'producerName' }
    }
  }).then(function (bill) {
    return res.json({ data: bill });
  }).catch(next);
});

module.exports = router;