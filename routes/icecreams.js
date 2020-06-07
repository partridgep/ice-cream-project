const express = require('express');
const passport = require('passport');
const router = express.Router();
const iceCreamCtrl = require('../controllers/icecreams');

router.get('/', iceCreamCtrl.index);

module.exports = router;