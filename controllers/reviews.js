const IceCream = require('../models/icecream');
const User = require('../models/user');

module.exports = {
 addRating,
 updateRating,
 addReview,
 updateReview,
 deleteReview,
 deleteRating
};

function addRating(req, res) {
    // Find the ice cream
    IceCream.findById(req.params.id, function(err, iceCream) {
        console.log(req.body);
        console.log(req.user);
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

function updateReview(req, res) {
    console.log("updating review");
    console.log(req.body);
    console.log(req.body.content);
    IceCream.findById(req.params.id, function(err, iceCream) {
        for (review of iceCream.reviews) {
            if (review.reviewedBy.toString() === req.user.id.toString()) {
                console.log(`found ${req.user.name}'s review!`);
                review.content = req.body.content;
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

function deleteReview(req, res) {
    console.log("deleting review");
    console.log(req.params.id);
    console.log(req.user.name);
    console.log(req.user.id);
    //find the ice cream that was reviews
    IceCream.findById(req.params.id, function(err, iceCream) {
        console.log(`found ${iceCream.name}`);
        // locate user's review
        for (review of iceCream.reviews) {
            if (review.reviewedBy.toString() === req.user.id.toString()) {
                console.log(`found ${req.user.name}'s review:`);
                //reset review content to empty string
                review.content = "";
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

function deleteRating(req, res) {
    console.log("deleting rating");
    console.log(req.params.id);
    console.log(req.user.name);
    console.log(req.user._id);
    //find the ice cream that was reviewed
    IceCream.findById(req.params.id, function(err, iceCream) {
        //find the user review for that ice cream
        for (i=0; i<iceCream.reviews.length; i++) {
            if (iceCream.reviews[i].reviewedBy.toString() === req.user.id.toString()) {
                console.log(`found ${req.user.name}'s review:`);
                console.log(iceCream.reviews[i]);
                console.log(i);
                //remove that review from its array of reviews
                iceCream.reviews.splice(i, 1);
                break;
            };
        };
        // find user that rated the ice cream
        User.findById(req.user, function(err, reviewer) {
            // remove ice cream from user's array of rated ice creams
            for (i=0; i<reviewer.ratedIceCreams.length; i++) {
                if (reviewer.ratedIceCreams[i].toString() === req.params.id.toString()) {
                    console.log(`${reviewer.name} has rated this ice cream`);
                    reviewer.ratedIceCreams.splice(i, 1);
                };
            };
            //save reviewer
            reviewer.save(function(err) {console.log(err)});
            console.log(reviewer);
        });
        // save the ice cream
        iceCream.save(function(err) {
            // redirect the user
            res.redirect(`/flavors/${iceCream.flavorName}`);
        });
    });
};

