const IceCream = require('../models/icecream');

//___________Exports________________//

module.exports = {
  index,
  show,
  update,
  goToFlavors
};

//___________RESTful Functions (get called in Router)________________//

// function that gets called when user selects a brand
function show(req, res) {
  // query all ice creams of the same brand
  IceCream.find({ brandName: req.params.brandName }, function (err, iceCreams) {
    // render view for that flavor
    res.render('brandsFlavors', {
      iceCreams,
      user: req.user
    });
  });
};

// function that gets called when user chooses to select by brand
function index(req, res) {
  // query ALL ice creams
  IceCream.find({}, function (err, iceCreams) {
    // render view of brands
    res.render('brands', {
      iceCreams,
      user: req.user
    });
  });
};

// function that gets called when user enters new brand when adding new ice cream
function update(req, res) {
  //find ice cream in question to update
  IceCream.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, iceCream) {
    // save brand image as link entered
    iceCream.brandImage = req.body.brandImage;
    // save info
    iceCream.save(function (err) {
      if (err) {e.log(err);};
      // redirect user to view of brands
      return res.redirect('/brands');
    })
  });
};

function goToFlavors(req, res) {
    // query all ice creams of the same flavor
    IceCream.find({ flavorName: req.params.flavorName }).populate("reviews.reviewedBy").exec( function (err, iceCreams) {
      IceCream.find({ brandName: req.params.brandName, flavorName: req.params.flavorName}).populate("reviews.reviewedBy").exec( function (err, brandsIceCreams) {
        // render view for that flavor
        res.render('brandsIceCreams', {
          iceCreams,
          brandsIceCreams,
          user: req.user
        });
      });
    });
}



