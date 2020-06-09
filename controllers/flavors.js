const IceCream = require('../models/icecream');

module.exports = {
  index,
  show
};

function show(req, res) {
  IceCream.find({ flavorName: req.params.flavorName }, function(err, iceCreams) {
    res.render('icecreams', { 
      iceCreams,
      user: req.user
     });
  });
};

function index(req, res) {
  IceCream.find({}, function(err, iceCreams) {
    res.render('flavors', { 
      iceCreams,
      user: req.user
    });
  });
};


