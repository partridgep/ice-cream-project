const express = require('express');
const passport = require('passport');
const router = express.Router();
const flavorsCtrl = require('../controllers/flavors');

// GET /flavors/:flavorName
router.get('/:flavorName', flavorsCtrl.show);

// GET /flavors/
router.get('/', flavorsCtrl.index);

// PUT /flavors/:id
router.put('/:id', flavorsCtrl.update);

module.exports = router;