const express = require('express');
const { Base64 } = require('js-base64');
const { validationResult, check } = require('express-validator');


const router = express.Router();
const tokenMdlware = require('../middlewares/tokenMiddleware');
const User = require('../models/User');

// shortener URL
// on this route we have post req from input form with full url
// this page have a gen func for shortener
// fullUrl=>hash string after adress (date + hour + base64)=>save on db full & short adress

router.post('/', tokenMdlware, [
  check('fullURL', 'Please enter URL').isURL(),
], async (req, res) => {
  // info from token
  const { status } = req.user;
  const { id } = req.user;
  // info from request
  const { fullURL } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }

  try {
    if (!status === 'client') {
      return res.status(401).json({ errors: [{ msg: 'Authorization error' }] });
    }

    const user = await User.findById(id);

    const { links } = user;


    const isExistFullURLObj = links.find((el) => el.fullURL === fullURL);

    if (isExistFullURLObj) {
      return res.status(200).send(isExistFullURLObj);
    }

    const enc = Base64.encode(fullURL);

    const date = new Date();

    const [second, hour, day] = [date.getSeconds(), date.getHours(), date.getDay()];

    const shortenURL = `http://localhost:5000/redir?U=${enc.substr(11, 1)}${day}${hour}${second}`;

    const linksObj = {
      fullURL,
      shortenURL,
      description: '',
      tags: [],
      numOfTrans: null,
    };

    links.push(linksObj);

    await User.findByIdAndUpdate(id, { links }, { new: true });

    return res.status(201).send(linksObj);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.get('/', tokenMdlware, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);

    const URLDataArr = user.links;

    return res.status(201).send(URLDataArr);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
