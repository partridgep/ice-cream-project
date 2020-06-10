const express = require('express');
const passport = require('passport');
const router = express.Router();
const brandsCtrl = require('../controllers/brands');

router.get('/:brandName', brandsCtrl.show);

router.get('/', brandsCtrl.index);

router.put('/:id', brandsCtrl.update);

module.exports = router;