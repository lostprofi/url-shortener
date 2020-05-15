const express = require('express');
const tokenMdlware = require('../middlewares/tokenMiddleware');
const User = require('../models/User');

const router = express.Router();

router.post('/', tokenMdlware, async (req, res) => {
// @info from request
  const { shortenURL, description } = req.body;
  // @info from token
  const { id, status } = req.user;

  try {
    if (!status === 'client') {
      return res.status(401).json({ errors: [{ msg: 'Authorization error' }] });
    }

    const user = await User.findById(id);

    const { links } = user;

    const matchLinksObj = links.find((el) => el.shortenURL === shortenURL);

    matchLinksObj.description = description;

    await User.findByIdAndUpdate(id, { links }, { new: true });

    res.status(200).json('Description added');
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
