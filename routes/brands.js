const express = require('express');
const passport = require('passport');
const router = express.Router();
const brandsCtrl = require('../controllers/brands');

// GET /brands/:brandName
router.get('/:brandName', brandsCtrl.show);

// GET /brands/
router.get('/', brandsCtrl.index);

// PUT /brands/:id
router.put('/:id', brandsCtrl.update);

module.exports = router;