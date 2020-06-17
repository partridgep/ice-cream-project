const IceCream = require('../models/icecream');
const User = require('../models/user');

module.exports = {
    show
};

// function that gets called when clicking on user in nav bar
function show(req, res) {
    console.log(req.user);
    // render homepage
    res.render('user', {
        user: req.user
      });
  };