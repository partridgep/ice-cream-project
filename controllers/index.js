const IceCream = require('../models/icecream');

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

module.exports = {
    index,
    new: newIceCream,
    create
};

function index(req, res) {
    IceCream.find({}, function(err, iceCreams) {
        console.log(iceCreams);
        res.render('index', {
            iceCreams,
            user: req.user});
      });
};

function newIceCream(req, res) {
    IceCream.find({}, function(err, iceCreams) {
        res.render('new', { 
            title: 'Add Ice Cream ',
            iceCreams,
            user: req.user});
    });
};

function create(req, res) {

    console.log('adding new')
    console.log(req.body);
    console.log(req.body.brand);
    console.log(req.body.brandName);

    let iceCreamConstructor = new iceCreamConstruction();
    let addingNewFlavor = false;
    let addingNewBrand = false;

    if (req.body.flavor === 'Other') {
      iceCreamConstructor.flavor = req.body.newFlavor;
      addingNewFlavor = true;
    } else {
      iceCreamConstructor.flavor = req.body.flavor;
    };

    if (req.body.brand === 'Other') {
      iceCreamConstructor.brand = req.body.newBrand;
      addingNewBrand = true;
    } else {
      iceCreamConstructor.brand = req.body.brand;
    };

    if (!req.body.name) {
      iceCreamConstructor.name = `${iceCreamConstructor.flavor} (${iceCreamConstructor.brand})`;
    } else {
      iceCreamConstructor.name = `${req.body.name} (${iceCreamConstructor.brand})`;
    };

    if (!addingNewFlavor) {
      IceCream.findOne({flavor: iceCreamConstructor.flavor}, function(err, sameFlavor) {
        iceCreamConstructor.flavorImage = sameFlavor.flavorImage;
        iceCream = createHelper(req.body, iceCreamConstructor);
        saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res);
      });
    } else {
      iceCream = createHelper(req.body, iceCreamConstructor);
      saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res);
    };
  };
  
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
  
  function saveIceCream(iceCream, addingNewFlavor, addingNewBrand, req, res) {
    iceCream.save(function(err) {
      if (err) {
        console.log(err);
        return res.redirect('/new')
      };
      console.log(iceCream);
      if (addingNewFlavor) {
        res.render('newFlavor', { 
          iceCream,
          title: 'Add Flavor Image',
          user: req.user
        });
      } else {
        res.redirect('/');
      }
    });
  };

