const express = require('express');
const router = express.Router();
const iceCreamCtrl = require('../controllers/icecreams');

router.get('/', iceCreamCtrl.index);

module.exports = router;