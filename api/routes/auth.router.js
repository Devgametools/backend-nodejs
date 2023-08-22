const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const service = new AuthService();
const router = express.Router();

router.post('/login', passport.authenticate('local', {session: false}), login);
router.post('/recovery', recover);
router.post('/change-password', changePassword);

// ************************************************************************************
// ************************************************************************************

async function login(req, res, next) {
  try {
    const user = req.user;
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
}

async function recover (req, res, next) {
  try {
    const { identifier } = req.body;
    res.json(await service.sendRecovery(identifier));
  } catch (error) {
    next(error);
  }
}

async function changePassword (req, res, next) {
  try {
    const { token, newPassword } = req.body;
    res.json(service.changePassword(token, newPassword));
  } catch (error) {
    next(error)
  }
}

module.exports = router;
