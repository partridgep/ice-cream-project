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

// DELETE reviews/:id
router.delete('/:id', reviewsCtrl.deleteReview);

// DELETE reviews/:id/rating
router.delete('/:id/rating', reviewsCtrl.deleteRating);


module.exports = router;