const IceCream = require('../models/icecream');

module.exports = {
  index
};

function index(req, res) {
  IceCream.find({}, function(err, iceCreams) {
    res.render('flavors', { iceCreams });
  });
};

