var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Type = mongoose.model('Type');
var auth = require('../auth');

router.get('/', function(req, res, next)
{
    Type.find().then(function(type)
    {
      return res.json({data: type});
    }).catch(next);
});

router.post('/', function(req, res, next)
  {
    var type = new Type(req.body.type)
    type.save().then(function(){
      return res.json({data: type});
    }).catch(next);
});

router.put('/:id', function (req, res, next) {
  Type.findByIdAndUpdate(req.params.id, req.body.type,{new:true}).then(type => {
  if (!type) { return res.sendStatus(401); };
  return res.json({ data: type });
}).catch(next);
});

router.get('/:id', auth.required,function(req, res, next)
{
    Type.findById(req.params.id).then(function(type)
    {
      return res.json({data: type});
    }).catch(next);
});

module.exports = router;