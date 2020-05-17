const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const { host } = req.headers;
  const { originalUrl } = req;

  const shortUrl = `http://${host}${originalUrl}`;

  try {
    const matchUser = await User.findOne({ 'links.shortenURL': shortUrl }).select('-password');
    const fullUrl = matchUser.links.find((el) => el.shortenURL === shortUrl).fullURL;

    const { links } = matchUser;

    const urlDataObj = links.find((el) => el.shortenURL === shortUrl);

    urlDataObj.numOfTrans += 1;

    await User.updateOne({ 'links.shortenURL': shortUrl }, { links });

    res.redirect(fullUrl);
  } catch (err) {
    res.json({ errors: [{ msg: 'Full URL will not found' }] });
  }
});

module.exports = router;
