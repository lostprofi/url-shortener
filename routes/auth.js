const express = require('express');

const router = express.Router();

// @auth route: search email in db and check enter password with password on db
// if ok return token

router.get('/auth', (req, res) => {
  res.send('Auth page');
});

module.exports = router;
