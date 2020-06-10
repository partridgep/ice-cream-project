const IceCream = require('../models/icecream');

module.exports = {
  index,
  show,
  update
};

function show(req, res) {
  IceCream.find({ brandName: req.params.brandName }, function(err, iceCreams) {
    res.render('brandsFlavors', { 
      iceCreams,
      user: req.user
     });
  });
};

function index(req, res) {
  IceCream.find({}, function(err, iceCreams) {
    res.render('brands', { 
      iceCreams,
      user: req.user
    });
  });
};

function update(req, res) {
  console.log('updating');
  IceCream.findOneAndUpdate({_id: req.params.id}, req.body, function(err, iceCream) {
    console.log(req.body);
    console.log(req.body.brandImage);
    iceCream.brandImage = req.body.brandImage;
    iceCream.save(function(err) {
      if (err) {
        console.log(err);
      };
      return res.redirect('/brands');
    })
  });
};



