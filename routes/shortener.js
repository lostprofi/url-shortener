const express = require('express');

const router = express.Router();

// shortener URL
// on this url we have post req from input form with full url
// this page have a gen func for shortener
// fullUrl=>hash string after adress (date + hour + base64)=>save on db full & short adress

router.get('/shortener', (req, res) => {
  res.send('shortener');
});

module.exports = router;
