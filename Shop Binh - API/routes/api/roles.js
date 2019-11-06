var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Role = mongoose.model('Role');
var auth = require('../auth');

router.get('/', function(req, res, next)
{
    Role.find().then(function(role)
    {
      return res.json({data: role});
    }).catch(next);
});

router.post('/', function(req, res, next)
  {
    var role = new Role(req.body.role)
    role.save().then(function(){
      return res.json({data: role});
    }).catch(next);
});

router.put('/:id', function (req, res, next) {
    Role.findByIdAndUpdate(req.params.id, req.body.role,{new:true}).then(role => {
  if (!role) { return res.sendStatus(401); };
  return res.json({ data: role });
}).catch(next);
});

router.get('/:id', auth.required,function(req, res, next)
{
    Role.findById(req.params.id).then(function(role)
    {
      return res.json({data: role});
    }).catch(next);
});

module.exports = router;