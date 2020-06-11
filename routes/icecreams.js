const express = require('express');
const passport = require('passport');
const router = express.Router();
const iceCreamCtrl = require('../controllers/icecreams');

router.get('/:id', iceCreamCtrl.show);

router.put('/:id', iceCreamCtrl.update);

module.exports = router;