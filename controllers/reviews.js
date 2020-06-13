const IceCream = require('../models/icecream');

module.exports = {
 addRating
};

function addRating(req, res) {
    // Find the ice cream
    IceCream.findById(req.params.id, function(err, iceCream) {
        console.log(req.body);
        console.log(req.user)
        // we push the review into the movie's review array
        iceCream.reviews.push(req.body);
        // save the movie
        iceCream.save(function(err) {
            // redirect the user
            res.redirect(`/flavors/${iceCream.flavorName}`);
        });
    });
};