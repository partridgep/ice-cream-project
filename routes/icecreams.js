const express = require('express');
const passport = require('passport');
const router = express.Router();
const iceCreamCtrl = require('../controllers/icecreams');

// GET iceCreams/:id
router.get('/:id', iceCreamCtrl.show);

// PUT iceCreams/:id
router.put('/:id', iceCreamCtrl.update);

module.exports = router;