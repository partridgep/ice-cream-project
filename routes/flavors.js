const express = require('express');
const passport = require('passport');
const router = express.Router();
const flavorsCtrl = require('../controllers/flavors');

router.get('/:flavorName', flavorsCtrl.show);

router.get('/', flavorsCtrl.index);

module.exports = router;