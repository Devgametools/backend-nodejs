const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const service = new AuthService();
const router = express.Router();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login,
);

router.post('/recovery', recover);

router.post(
  '/recovery-password',
  passport.authenticate('jwt', { session: false }),
  recoveryPassword,
);

// ************************************************************************************
//  *-- AUTH FUNCTIONS --*
// ************************************************************************************

async function login(req, res, next) {
  try {
    const user = req.user;
    const token = await service.signToken(user);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}

async function recover(req, res, next) {
  try {
    const { identifier } = req.body;
    res.json(await service.sendRecovery(identifier));
  } catch (error) {
    next(error);
  }
}

async function recoveryPassword(req, res, next) {
  try {
    const user = req.user;
    const { newPassword } = req.body;
    res.json(await service.recoveryPassword(user.sub, newPassword));
  } catch (error) {
    next(error);
  }
}

module.exports = router;
