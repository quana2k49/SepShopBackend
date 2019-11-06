var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Item = mongoose.model('Item');
var auth = require('../auth');

router.get('/', function (req, res, next) {
  Item.find().populate({
    path: 'itemType',
    select: 'typeContent'
  }).populate({
    path: 'producer',
    select: 'producerName'
  }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});

router.get('/listItem/:id', function (req, res, next) {
  Item.find({ itemType: req.params.id }).populate({
    path: 'itemType',
    select: 'typeContent'
  }).populate({
    path: 'producer',
    select: 'producerName'
  }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});

router.get('/top3', function (req, res, next) {
  Item.find().sort({ purchaseNumber: -1 }).limit(3).populate({
    path: 'itemType',
    select: 'typeContent'
  }).populate({
    path: 'producer',
    select: 'producerName'
  }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});

router.get('/top8', function (req, res, next) {
  Item.find().sort({ purchaseNumber: -1 }).limit(8).populate({
    path: 'itemType',
    select: 'typeContent'
  }).populate({
    path: 'producer',
    select: 'producerName'
  }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});

router.get('/newItems', function (req, res, next) {
  Item.find().sort({ createdAt: -1 }).limit(5).populate({
    path: 'itemType',
    select: 'typeContent'
  }).populate({
    path: 'producer',
    select: 'producerName'
  }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});

router.get('/anotherItems/:id', function (req, res, next) {
  Item.find({ itemType: req.params.id }).limit(8).skip(2).populate({
    path: 'itemType',
    select: 'typeContent'
  }).populate({
    path: 'producer',
    select: 'producerName'
  }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});

router.get('/search', function (req, res, next) {
  Item.find({ itemName: { $regex: '.*' + req.query.q + '.*' } }).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
})

router.get('/recommentItems', function (req, res, next) {
  Item.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    Item.find().skip(random).populate({
      path: 'itemType',
      select: 'typeContent'
    }).populate({
      path: 'producer',
      select: 'producerName'
    }).then(function (item) {
      return res.json({ data: item });
    }).catch(next);
  })
});

router.post('/', function (req, res, next) {
  var item = new Item(req.body.item)
  item.save().then(function () {
    return res.json({ data: item });
  }).catch(next);
});

router.put('/:id', function (req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body.item, { new: true }).then(item => {
    if (!item) { return res.sendStatus(401); };
    return res.json({ data: item });
  }).catch(next);
});

router.get('/:id', function (req, res, next) {
  Item.findById(req.params.id).then(function (item) {
    return res.json({ data: item });
  }).catch(next);
});



module.exports = router;