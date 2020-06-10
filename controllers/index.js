const IceCream = require('../models/icecream');

class iceCreamConstruction {
  constructor(flavor, flavorImage, brand, brandImage, name) {
    this.flavor = flavor;
    this.flavorImage = flavorImage;
    this.brand = brand;
    this.brandImage = brandImage;
    this.name = name;
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

    /*let thisFlavor;
    let thisFlavorImage;
    let thisBrand;
    let thisBrandImage;
    let thisName; */
    let iceCreamConstructor = new iceCreamConstruction();
    let addingNewFlavor = false;
    let addingNewBrand = false;

    if (req.body.flavor === 'Other') {
      //thisFlavor = req.body.newFlavor;
      iceCreamConstructor.flavor = req.body.newFlavor;
      addingNewFlavor = true;
    } else {
      //thisFlavor = req.body.flavor;
      iceCreamConstructor.flavor = req.body.flavor;
    };

    if (req.body.brand === 'Other') {
      //thisBrand = req.body.newBrand;
      iceCreamConstructor.brand = req.body.newBrand;
      addingNewBrand = true;
    } else {
      //thisBrand = req.body.brand;
      iceCreamConstructor.brand = req.body.brand;
    };

    if (!req.body.name) {
      //thisName = `${thisFlavor} (${thisBrand})`;
      iceCreamConstructor.name = `${thisFlavor} (${thisBrand})`;
    } else {
      //thisName = `${req.body.name} (${thisBrand})`;
      iceCreamConstructor.name = `${req.body.name} (${thisBrand})`;
    };

    if (!addingNewFlavor) {
      IceCream.findOne({flavor: iceCreamConstructor.flavor}, function(err, sameFlavor) {
        iceCreamConstructor.flavorImage = sameFlavor.flavorImage;
        iceCream = createHelper(req.body, iceCreamConstructor);
        saveIceCream(iceCream, req, res);
      });
    } else {
      iceCream = createHelper(req.body, iceCreamConstructor);
      saveIceCream(iceCream, addingNewFlavor, req, res)
    };
  };
  
  function createHelper(body, thisFlavor, thisFlavorImage) {
    const iceCream = new IceCream({
      description: body.description,
      image: body.image,
      flavorName: thisFlavor,
      flavorImage: thisFlavorImage,
      brandName: body.brand,
      name: body.name
    });
    return iceCream;
  };
  
  function saveIceCream(iceCream, addingNewFlavor, req, res) {
    iceCream.save(function(err) {
      if (err) {
        console.log(err);
        return res.redirect('/new')
      };
      console.log(iceCream);
      if (addingNewFlavor) {
        console.log(req.user);
        res.render('newFlavor'), { 
          iceCream,
          title: 'Add Flavor Image',
          user: req.user
        }
      } else {
        res.redirect('/');
      }
    });
  };

