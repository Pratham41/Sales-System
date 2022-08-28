// JSONWEBTOKEN
const jwt = require('jsonwebtoken');
// MODEL
const User = require('../model/user');

// PROTECT MIDDLEWARE
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // GETTING TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // VERIFYING TOKEN
      req.user = await User.findById(decoded.id); // FINDING USER

      next();
    } catch (error) {
      return res.status(401).json('unauthorized user ');
    }
  }
  if (!token) {
    return res.status(401).json('no token found');
  }
};

// CHECKING WHETHER USER IS ADMIN
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json('Not an admin');
  }
};