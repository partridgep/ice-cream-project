const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

// GET /users
router.get('/', usersCtrl.show);

module.exports = router;