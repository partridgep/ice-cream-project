const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/index');


router.get('/', indexCtrl.index);

module.exports = router;