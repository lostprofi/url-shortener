const express = require('express');
const { Base64 } = require('js-base64');

const router = express.Router();
const tokenMdlware = require('../middlewares/tokenMiddleware');
const User = require('../models/User');

// shortener URL
// on this route we have post req from input form with full url
// this page have a gen func for shortener
// fullUrl=>hash string after adress (date + hour + base64)=>save on db full & short adress

router.post('/', tokenMdlware, async (req, res) => {
  // info from token
  const { status } = req.user;
  const { id } = req.user;
  // info from request
  const { fullURL } = req.body;

  try {
    if (!status === 'client') {
      return res.status(401).json({ errors: [{ msg: 'Authorization error' }] });
    }

    const user = await User.findById(id);

    const { links } = user;

    const isExistFullURLObj = links.find((el) => el.fullURL === fullURL);

    if (!isExistFullURLObj) {
      const enc = Base64.encode(fullURL);

      const date = new Date();

      const [second, hour, day] = [date.getSeconds(), date.getHours(), date.getDay()];

      const shortenURL = `https://msurl/${enc.substr(11, 4)}${day}${hour}${second}`;

      const linksObj = {
        fullURL,
        shortenURL,
      };

      links.push(linksObj);

      await User.findByIdAndUpdate(id, { links }, { new: true });

      return res.send(shortenURL);
    }

    return res.send(isExistFullURLObj.shortenURL);

  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
