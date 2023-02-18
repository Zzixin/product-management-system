const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
  // let adminValue = user.admin;
  const accessToken = sign({ email: user.email, id: user.id }, 'secretKey', {
    expiresIn: '3hr',
  });
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];
  if (!accessToken) {
    req.id = undefined;
    return next();
  }
  try {
    const validToken = verify(accessToken, 'secretKey');
    if (validToken) {
      req.authenticated = true;
      req.id = validToken.id;
      req.email = validToken.email;
      return next();
    }
  } catch (err) {
    // return res.status(400).json({ error: err });
    req.id = undefined;
    return next();
  }
};

module.exports = { createToken, validateToken };
