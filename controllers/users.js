const IceCream = require('../models/icecream');
const User = require('../models/user');

module.exports = {
    show
};

// function that gets called when clicking on user in nav bar
function show(req, res) {
    console.log(req.user);
    // render homepage
    if (req.user) {
        User.findById(req.user._id).populate('ratedIceCreams').exec(function(err, me) {
            res.render('user', {
                user: me
              });
        })
    } else {res.render('user', { user: req.user })}
  };