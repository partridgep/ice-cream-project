const IceCream = require('../models/icecream');
const User = require('../models/user');

module.exports = {
 addRating
};

function addRating(req, res) {
    // Find the ice cream
    IceCream.findById(req.params.id, function(err, iceCream) {
        console.log(req.body);
        console.log(req.user)
        //  push the review into the movie's review array
        iceCream.reviews.push(req.body);
        // find user that's rating the ice cream
        User.findById(req.user, function(err, reviewer) {
            console.log(reviewer);
            // push ice cream into user's array of rated ice creams and save
            reviewer.ratedIceCreams.push(req.params.id);
            reviewer.save(function(err) {console.log(err)});
        });
        // save the ice cream
        iceCream.save(function(err) {
            // redirect the user
            res.redirect(`/flavors/${iceCream.flavorName}`);
        });
    });
};