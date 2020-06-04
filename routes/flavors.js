const express = require('express');
const router = express.Router();
const flavorsCtrl = require('../controllers/flavors');

router.get('/', flavorsCtrl.index);

module.exports = router;