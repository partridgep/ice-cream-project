const IceCream = require('../models/icecream');

//___________Exports________________//

module.exports = {
  show,
  update
};

//___________RESTful Functions (get called in Router)________________//

// function that gets called when user clicks on 'Edit' button for particular ice cream 
function show(req, res) {
  //first we'll need properties of ALL ice creams to pass through
  //in case user wants to modify to any of those
  IceCream.find({}, function (err, allIceCreams) {
    //then locate the ice cream to be updated
    IceCream.findOne({ _id: req.params.id }, function (err, iceCream) {
      //render edit page
      res.render('updateOne', {
        iceCream,
        allIceCreams,
        user: req.user
      });
    });
  });
};

// function that gets called when user hits submit button on updating particular ice cream
function update(req, res) {
  console.log(req.body);
  //locate ice cream in question
  IceCream.findById(req.params.id, function (err, iceCream) {
    //first, check if the flavor image has been changed
    if (iceCream.flavorImage !== req.body.flavorImage) {
      //if the flavor image has been changed on this one, it should apply to ALL ice creams of that flavor
      IceCream.find({ flavorImage: iceCream.flavorImage, flavorName: iceCream.flavorName }, function (err, sameFlavorImage) {
        //iterate through all ice creams with that same flavor image and update
        for (i of sameFlavorImage) {
          i.flavorImage = req.body.flavorImage;
          i.save(function (err) { console.log(err) });
        };
      });
    };

    //second, check if the brand image has been changed
    if (iceCream.brandImage !== req.body.brandImage) {
      //similarly, if the brand image has been changed on this one, it should apply to ALL ice creams of that flavor
      IceCream.find({ brandImage: iceCream.brandImage, brandName: iceCream.brandName }, function (err, sameBrandImage) {
        //iterate through all ice creams with that same brand image and update
        for (i of sameBrandImage) {
          i.brandImage = req.body.brandImage;
          i.save(function (err) { console.log(err) });
        };
      });
    };

    //now all other fields should be updated
    //we don't need to check if the user has modified them or not
    //if they have not, they will default to their same value
    iceCream.description = req.body.description;
    iceCream.image = req.body.image;
    iceCream.url = req.body.url;
    //if user has entered a new flavor or brand, check for "Other" value
    if (req.body.flavor === "Other") iceCream.flavorName = req.body.newFlavor;
    else iceCream.flavorName = req.body.flavor;
    if (req.body.brand === "Other") iceCream.brandName = req.body.newBrand;
    else iceCream.Brand = req.body.brand;
    //save data
    iceCream.save(function (err) {
      if (err) {
        console.log(err);
      };
      //redirect to page of ice creams of same flavor
      IceCream.find({ flavorName: iceCream.flavorName }, function (err, iceCreams) {
        res.render('icecreams', {
          iceCreams,
          user: req.user
        });
      });
    });
  });
};