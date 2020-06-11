const IceCream = require('../models/icecream');


//___________Constructor Class________________//
// allows us to create objects with values for a new ice cream
// and define which values to use
class iceCreamConstruction {
  constructor(flavor, flavorImage, brand, brandImage, name, addingNewFlavor, addingNewBrand) {
    this.flavor = flavor;
    this.flavorImage = flavorImage;
    this.brand = brand;
    this.brandImage = brandImage;
    this.name = name;
    this.addingNewFlavor = addingNewFlavor;
    this.addingNewBrand = addingNewBrand
  };
};

//___________Exports________________//
module.exports = {
  index,
  new: newIceCream,
  create
};

//___________RESTful Functions (get called in Router)________________//

// function that gets called when landing on home page
function index(req, res) {
  //query ALL ice creams
  IceCream.find({}, function (err, iceCreams) {
    // render homepage
    res.render('index', {
      iceCreams,
      user: req.user
    });
  });
};

// function that gets called when clicking on "Add New Ice Cream"
function newIceCream(req, res) {
  // query ALL ice creams
  IceCream.find({}, function (err, iceCreams) {
    //render form to add new ice cream
    res.render('new', {
      title: 'Add Ice Cream ',
      iceCreams,
      user: req.user
    });
  });
};

// function that gets called when user submits "New Ice Cream" form
function create(req, res) {

  // make new constructor to hold onto some values for the new ice cream
  let iceCreamConstructor = new iceCreamConstruction();
  // initialize booleans
  let addingNewFlavor = false;
  let addingNewBrand = false;

  // if user has opted to enter a new flavor
  if (req.body.flavor === 'Other') {
    // we will set the flavor as the "new flavor" value from the form
    iceCreamConstructor.flavor = req.body.newFlavor;
    // set boolean to true
    addingNewFlavor = true;
  } else {
    // set the flavor as the "flavor" value from the form
    iceCreamConstructor.flavor = req.body.flavor;
  };

  // if user has opted to enter a new brand
  if (req.body.brand === 'Other') {
    // we will set the brand as the "new brand" value from the form
    iceCreamConstructor.brand = req.body.newBrand;
    // set boolean to true
    addingNewBrand = true;
  } else {
    // set the brand as the "brand" value from the form
    iceCreamConstructor.brand = req.body.brand;
  };

  // if user has left "name" field blank
  if (!req.body.name) {
    // auto-generate name as "Flavor (Brand)"
    iceCreamConstructor.name = `${iceCreamConstructor.flavor} (${iceCreamConstructor.brand})`;
  } else {
    // else, append "(Brand)" to flavor name
    iceCreamConstructor.name = `${req.body.name} (${iceCreamConstructor.brand})`;
  };

  // now check if user has entered a new flavor
  if (!addingNewFlavor) {
    // we will need to rely on existing flavor information
    // query to find another ice cream with the same flavor name
    IceCream.findOne({ flavorName: iceCreamConstructor.flavor }, function (err, sameFlavor) {
      // set new ice cream flavor image as same as other ice cream
      iceCreamConstructor.flavorImage = sameFlavor.flavorImage;
      // next, check if adding new brand and save model
      checkForBrandAndSave(iceCreamConstructor, addingNewFlavor, addingNewBrand, req, res);
    });
  } // if adding new flavor
  else {
    // next, check if adding new brand and save model
    checkForBrandAndSave(iceCreamConstructor, addingNewFlavor, addingNewBrand, req, res);
  };
};


//___________Helper Functions (get called by other functions)________________//

// check if user added new brand before creating and saving Ice Cream model
function checkForBrandAndSave(iceCreamConstructor, addingNewFlavor, addingNewBrand, req, res) {
  // check if user has entered a new brand 
  if (!addingNewBrand) {
    // we will need to rely on existing brand information
    // query to find another ice cream with the same brand name
    IceCream.findOne({ brandName: iceCreamConstructor.brand }, function (err, sameBrand) {
      // set new ice cream brand image as same as other ice cream
      iceCreamConstructor.brandImage = sameBrand.brandImage;
      // at this point, we can create a new Ice Cream model
      // we call a helper function to do this for us
      iceCream = createHelper(req.body, iceCreamConstructor);
      // once created, save it
      saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res);
    });
  } // if not adding new brand
  else {
    // no need to gather information from another ice cream
    // go ahead and create Ice Cream model through helper function
    iceCream = createHelper(req.body, iceCreamConstructor);
    // once created, save it
    saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res);
  };
};

// use values from body and constructor to create new Ice Cream model
function createHelper(body, iceCreamConstructor) {
  const iceCream = new IceCream({
    description: body.description,
    image: body.image,
    url: body.url,
    flavorName: iceCreamConstructor.flavor,
    flavorImage: iceCreamConstructor.flavorImage,
    brandName: iceCreamConstructor.brand,
    brandImage: iceCreamConstructor.brandImage,
    name: iceCreamConstructor.name
  });
  return iceCream;
};

// save Ice Cream model once created
function saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res) {
  iceCream.save(function (err) {
    if (err) {
      console.log(err);
      return res.redirect('/new')
    };
    // check if user has added new flavor
    if (addingNewFlavor) {
      // if so, redirect user to new flavor page
      res.render('newFlavor', {
        iceCream,
        title: 'Add Flavor Image',
        user: req.user,
        addingNewBrand
      });
    } // check if user has added new brand
    else if (addingNewBrand) {
      //if so, redirect user to new brand pag
      res.render('newBrand', {
        iceCream,
        title: 'Add Brand Image',
        user: req.user
      })
    } else {
      res.redirect('/');
    };
  });
};


