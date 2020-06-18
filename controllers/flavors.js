const IceCream = require('../models/icecream');

//___________Exports________________//

module.exports = {
  index,
  show,
  update
};

//___________RESTful Functions (get called in Router)________________//

// function that gets called when user selects a flavor
function show(req, res) {
  // query all ice creams of the same flavor
  IceCream.find({ flavorName: req.params.flavorName }).populate("reviews.reviewedBy").exec( function (err, iceCreams) {
    // render view for that flavor
    res.render('icecreams', {
      iceCreams,
      user: req.user
    });
  });
};

// function that gets called when user chooses to select by flavor
function index(req, res) {
  // query ALL ice creams
  IceCream.find({}, function (err, iceCreams) {
    // render view of flavors
    res.render('flavors', {
      iceCreams,
      user: req.user
    });
  });
};

// function that gets called when user enters new flavor when adding new ice cream
function update(req, res) {
  //find ice cream in question to update
  IceCream.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, iceCream) {
    // save flavor image as link entered
    iceCream.flavorImage = req.body.flavorImage;
    //save info
    iceCream.save(function (err) {
      if (err) {console.log(err)};
      // next, check if user has entered new brand as well
      if (req.body.addingNewBrand === 'true') {
        //if so, redirect user to New Brand page
        res.render('newBrand', {
          iceCream,
          title: 'Add Brand Image',
          user: req.user
        });
      } else {
        //otherwise, redirect user to flavors page
        return res.redirect('/flavors');
      };
    });
  });
};



