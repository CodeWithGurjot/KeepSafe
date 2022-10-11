const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
  //Get user from jwt and send id to req object
  const token = req.header('authToken');
  if (!token) {
    res.status(401).send('Invalid token request');
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send('Invalid token request')
    }
  }
}

module.exports = fetchuser
