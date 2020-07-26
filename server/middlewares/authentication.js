const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();

const authentication = (req, res, next) => {
  const { access_token } = req.headers;

  if (!access_token) {
    next({name: 'DATA_NOT_FOUND'})
  }
  try {
    const decoded = jwt.verify(access_token, process.env.secretKey);
    req.userData = decoded;
    next();
  }
  catch(err) {
    next(err);
  }
}

module.exports = authentication;
