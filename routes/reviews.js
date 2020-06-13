const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

//define our route
// POST reviews/:id/rating
router.post('/:id/rating', reviewsCtrl.addRating);

// PUT reviews/:id/rating
router.put('/:id/rating', reviewsCtrl.updateRating);

module.exports = router;