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
        //  push the review into the movie's review array
        iceCream.reviews.push(req.body);
        // find user that's rating the ice cream
        User.findById(req.user, function(err, reviewer) {
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
        // Find the ice cream
        IceCream.findById(req.params.id, function(err, iceCream) {
            for (review of iceCream.reviews) {
                if (review.reviewedBy.toString() === req.user.id.toString()) {
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
    IceCream.findById(req.params.id, function(err, iceCream) {
        for (review of iceCream.reviews) {
            if (review.reviewedBy.toString() === req.user.id.toString()) {
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
    //find the ice cream that was reviewed
    IceCream.findById(req.params.id, function(err, iceCream) {
        // locate user's review
        for (review of iceCream.reviews) {
            if (review.reviewedBy.toString() === req.user.id.toString()) {
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
    //find the ice cream that was reviewed
    IceCream.findById(req.params.id, function(err, iceCream) {
        //find the user review for that ice cream
        for (i=0; i<iceCream.reviews.length; i++) {
            if (iceCream.reviews[i].reviewedBy.toString() === req.user.id.toString()) {
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
                    reviewer.ratedIceCreams.splice(i, 1);
                };
            };
            //save reviewer
            reviewer.save(function(err) {console.log(err)});
        });
        // save the ice cream
        iceCream.save(function(err) {
            // redirect the user
            res.redirect(`/flavors/${iceCream.flavorName}`);
        });
    });
};

