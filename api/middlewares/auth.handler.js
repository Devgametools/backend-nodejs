const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

function checkUser() {
  return (req, res, next) => {
    const user = req.user;
    const { username } = req.params;
    if (user.sub === username) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

function checkCustomer() {
  return (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    if (user.cid === id) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiKey, checkRoles, checkUser, checkCustomer };
