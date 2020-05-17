const express = require('express');
const tokenMdlware = require('../middlewares/tokenMiddleware');
const User = require('../models/User');

const router = express.Router();

router.post('/', tokenMdlware, async (req, res) => {
// @info from request
  const { shortenURL, tag } = req.body;
  // @info from token
  const { id, status } = req.user;

  try {
    if (!status === 'client') {
      return res.status(401).json({ errors: [{ msg: 'Authorization error' }] });
    }

    const user = await User.findById(id);

    const { links } = user;

    const matchLinksObj = links.find((el) => el.shortenURL === shortenURL);

    matchLinksObj.tags.push(tag);

    await User.findByIdAndUpdate(id, { links }, { new: true });

    return res.status(200).json('Tag added');
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.get('/', async (req, res) => {
  const tag = req.query.t;

  const matchUsersArr = await User.where('links.tags', tag);

  const matchFullLinksArr = matchUsersArr.map((el) => el.links.map((el) => {
    if (el.tags.find((el) => el === tag)) {
      return el.shortenURL;
    }
  }));

  return res.send(matchFullLinksArr);
});

module.exports = router;
