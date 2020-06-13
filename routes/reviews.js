const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST reviews/:id/rating
router.post('/:id/rating', reviewsCtrl.addRating);

// POST reviews/:id
router.post('/:id', reviewsCtrl.addReview);

// PUT reviews/:id
router.put('/:id/update', reviewsCtrl.updateReview);

// PUT reviews/:id/rating
router.put('/:id/rating', reviewsCtrl.updateRating);


module.exports = router;