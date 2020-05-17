const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.post('/', [

  check('name', 'Please enter your name').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),

],
async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    name, email, password, links,
  } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already register' }] });
    }

    user = new User({
      name, email, _password: password, links,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.save();
    return res.send('User register');
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
