const config = require('config');

const jwt = require('jsonwebtoken');

const tokenMdlware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  try {
    const decoded = jwt.verify(token, config.get('JWTSecretKey'));

    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Token not valid' }] });
  }
};

module.exports = tokenMdlware;
