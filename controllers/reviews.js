const IceCream = require('../models/icecream');
const User = require('../models/user');

module.exports = {
 addRating,
 updateRating,
 addReview
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

function updateRating(req, res) {
    console.log(req.body);
    console.log("updating rating");
    console.log(req.body.rating);
    console.log(req.body.reviewedBy);
    IceCream.findById(req.params.id, function(err, iceCream) {
        for (review of iceCream.reviews) {
            if (review.reviewedBy.toString() === req.user.id.toString()) {
                console.log(`found ${req.user.name}'s review!`);
                review.rating = req.body.rating;
                break;
            };
        };
        // save the ice cream
        iceCream.save(function(err) {
            // redirect the user
            res.redirect(`/flavors/${iceCream.flavorName}`);
        });
    });
};

function addReview(req, res) {
    console.log(req.body);
    console.log("Adding review");
        // Find the ice cream
        IceCream.findById(req.params.id, function(err, iceCream) {
            console.log(req.user)
            for (review of iceCream.reviews) {
                if (review.reviewedBy.toString() === req.user.id.toString()) {
                    console.log(`found ${req.user.name}'s review!`);
                    review.content = req.body.content;
                    break;
                }
            };
            // save the ice cream
            iceCream.save(function(err) {
            // redirect the user
            res.redirect(`/flavors/${iceCream.flavorName}`);
        });
    });
};