const IceCream = require('../models/icecream');

module.exports = {
  show,
  update
};

function show(req, res) {
  IceCream.find({}, function(err, allIceCreams) {
    IceCream.findOne({_id: req.params.id}, req.user, allIceCreams, function(err, iceCream) {
      res.render('updateOne', { 
        iceCream,
        allIceCreams,
        user: req.user
    })
     });
  });
};

function update(req, res) {
  IceCream.findOneAndUpdate({_id: req.params.id}, req.body, function(err, iceCream) {
    if (!iceCream.flavorImage === req.body.flavorImage) {
      IceCream.updateMany({flavorImage: iceCream.flavorImage}, function(err, iceCreams) {
        iceCreams.flavorImage = req.body.flavorImage;
        iceCreams.save(function(err) {})
      });
    };

    if (!iceCream.brandImage === req.body.brandImage) {
      IceCream.updateMany({brandImage: iceCream.brandImage}, function(err, iceCreams) {
        iceCreams.brandImage = req.body.brandImage;
        iceCreams.save(function(err) {})
      });
    };


    iceCream.description = req.body.description;
    iceCream.image = req.body.image;
    iceCream.url = req.body.url;
    if (req.body.flavor === "Other") iceCream.flavorName = req.body.newFlavor;
    else iceCream.flavorName = req.body.flavor;
    if (req.body.brand === "Other") iceCream.brandName = req.body.newBrand;
    else iceCream.Brand = req.body.brand;
    iceCream.save(function(err) {
      if (err) {
        console.log(err);
      };
      IceCream.find({flavorName: iceCream.flavorName}, function(err, iceCreams) {
        console.log(iceCreams)
        res.render('icecreams', {
          iceCreams,
          user: req.user
        })
      })
    });
  });
};