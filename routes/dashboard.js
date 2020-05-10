const express = require('express');

const router = express.Router();

// @Dashboard route
// on this page we are searching user on db & res send userName

router.get('/', (req, res) => {
  res.send('dashboard page');
});

module.exports = router;
