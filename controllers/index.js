const IceCream = require('../models/icecream');

module.exports = {
    index
};

function index(req, res) {
    IceCream.find({}, function(err, iceCreams) {
        console.log(iceCreams);
        res.render('index', {iceCreams});
      });
};