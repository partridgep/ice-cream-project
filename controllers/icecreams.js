const IceCream = require('../models/icecream');

module.exports = {
  show
};

function show(req, res) {
  IceCream.find({}, function(err, allIceCreams) {
    console.log(req.params.id)
    IceCream.findOne({_id: req.params.id}, req.user, allIceCreams, function(err, iceCream) {
      console.log(iceCream.name)
      for (i of allIceCreams) {
        console.log(i.name);
      }
      res.render('updateOne', { 
        iceCream,
        allIceCreams,
        user: req.user
    })
     });
  });
};