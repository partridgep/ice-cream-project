const IceCream = require('../models/icecream');

module.exports = {
    index,
    new: newIceCream
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