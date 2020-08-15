const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth = require('./auth-model')
const restrict = require('./authenticate-middleware')

router.post('/register', (req, res) => {
  // implement registration
  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
