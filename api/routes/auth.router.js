const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const userService = require('../services/users.service');

const service = new userService();
const router = express.Router();

router.post('/login', passport.authenticate('local', {session: false}), login);

async function login(req, res, next) {
  try {
    const user = req.user;
    if (!user.username) {
      const customer = await service.emailLogin(user.email);
      const payload = {
        sub: customer.user.username,
        role: customer.user.role,
        cid: customer.id
      }
      const token = jwt.sign(payload, config.jwtSecret);
      delete customer.user.dataValues.password;
      res.json({customer, token});
    } else {
      const payload = {
        sub: user.username,
        role: user.role,
        cid: user.customerId
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({user, token});
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
