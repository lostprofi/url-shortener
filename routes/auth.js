const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// @auth route: search email in db and check enter password with password on db
// if ok return token

router.post('/',
  [
    check('email', 'Please enter correct email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(422).json({ errors: [{ msg: 'User is not registered' }] });
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);

      if (!isMatchPassword) {
        return res.status(401).json({ errors: [{ msg: 'Please enter correct password' }] });
      }

      const payload = {
        user: {
          id: user.id,
          status: 'client',
        },
      };

      jwt.sign(payload, config.get('JWTSecretKey'), (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });

    } catch (err) {
      return res.status(500).send('Server error');
    }
  });

module.exports = router;
