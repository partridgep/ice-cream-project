const IceCream = require('../models/icecream');

module.exports = {
  index,
  show,
  update
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

function update(req, res) {
  console.log('updating');
  IceCream.findOneAndUpdate({_id: req.params.id}, req.body, function(err, iceCream) {
    console.log(req.body);
    console.log(req.body.flavorImage);
    iceCream.flavorImage = req.body.flavorImage;
    iceCream.save(function(err) {
      if (err) {
        console.log(err);
      };
      return res.redirect('/flavors');
    })
  });
};



