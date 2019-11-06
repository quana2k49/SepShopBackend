var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Producer = mongoose.model('Producer');
var auth = require('../auth');

router.get('/', function(req, res, next)
{
    Producer.find().then(function(producer)
    {
      return res.json({data: producer});
    }).catch(next);
});

router.post('/', function(req, res, next)
  {
    var producer = new Producer(req.body.producer)
    producer.save().then(function(){
      return res.json({data: producer});
    }).catch(next);
});

router.put('/:id', function (req, res, next) {
  Producer.findByIdAndUpdate(req.params.id, req.body.producer,{new:true}).then(producer => {
  if (!producer) { return res.sendStatus(401); };
  return res.json({ data: producer });
}).catch(next);
});

router.get('/:id', auth.required,function(req, res, next)
{
  Producer.findById(req.params.id).then(function(producer)
    {
      return res.json({data: producer});
    }).catch(next);
});

module.exports = router;