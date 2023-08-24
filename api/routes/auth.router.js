const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const service = new AuthService();
const router = express.Router();

router.post('/login', passport.authenticate('local', {session: false}), login);
router.post('/recovery', recover);
router.post('/change-password/:username', passport.authenticate('jwt', {session: false}), changePassword);

// ************************************************************************************
// ************************************************************************************

async function login(req, res, next) {
  try {
    const user = req.user;
    const token = await service.signToken(user);
    res.json({user, token});
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
    const { identifier, newPassword } = req.body;
    res.json(service.changePassword(identifier, newPassword));
  } catch (error) {
    next(error)
  }
}

module.exports = router;
