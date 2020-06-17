const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexCtrl = require('../controllers/index');

// GET /new
router.get('/new', indexCtrl.new);

// POST /
router.post('/', indexCtrl.create);

// GET /
router.get('/', indexCtrl.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  ));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successReturnToOrRedirect: '/login',
      failureRedirect : '/'
    }
  ));

router.get('/login', function(req, res) {
  if (req.referer === 'http://localhost:3000/') {
    res.redirect('/');
  } else {
    res.redirect(req.referer);
  };
})

// OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;