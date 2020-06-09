const IceCream = require('../models/icecream');

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

    let thisFlavor;
    let thisFlavorImage;
    let addingNewFlavor = false;

    if (req.body.flavor === 'Other') {
      thisFlavor = req.body.newFlavor;
      addingNewFlavor = true;
    } else {
      thisFlavor = req.body.flavor;
    }

    if (!addingNewFlavor) {
      IceCream.findOne({flavor: thisFlavor}, function(err, sameFlavor) {
        thisFlavorImage = sameFlavor.flavorImage;
        iceCream = createHelper(req.body, thisFlavor, thisFlavorImage);
        saveIceCream(iceCream, req, res);
      });
    } else {
      iceCream = createHelper(req.body, thisFlavor, null);
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

