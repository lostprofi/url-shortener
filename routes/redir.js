const express = require('express');

const router = express.Router();
const User = require('../models/User');

/* router.post('/', tokenMdlware, async (req, res) => {
  // info from token

  const { id } = req.user;

  // info from request body

  const { shortenURL } = req.body;

  try {
    const user = await User.findById(id);

    const { links } = user;

    const isMatchLinksObj = await links.find((el) => (el.shortenURL === shortenURL));

    if (!isMatchLinksObj) {
      throw new Error('Shorten URL does not exist. Please create shortten link');
    }

    const { fullURL } = isMatchLinksObj;

    return res.redirect(fullURL);
  } catch (err) {
    res.json({ errors: [{ msg: `${err.message}` }] });
  }
}); */

router.get('/', async (req, res) => {
  // info from token

  // info from request body

  const { host } = req.headers;
  const { originalUrl } = req;

  const shortUrl = `http://${host}${originalUrl}`;

  try {
    const matchUser = await User.find({ 'links.shortenURL': shortUrl }).select('-password');
    const fullUrl = matchUser[0].links.find((el) => el.shortenURL === shortUrl).fullURL;

    res.redirect(fullUrl);
  } catch (err) {
    res.json({ errors: [{ msg: 'Full URL will not found' }] });
  }
});

module.exports = router;
