const express = require('express');
const passport = require('passport');
const router = express.Router();
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { getUserSchema } = require('../schemas/users.schema');

const uService = new UsersService();

router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  checkRoles('sysadmin'),
  getUsers,
);

router.get(
  '/users/:username',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  findUser,
);

// ************************************************************************************
// ************************************************************************************

async function getUsers(req, res, next) {
  try {
    const users = await uService.show();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function findUser(req, res, next) {
  try {
    const { username } = req.params;
    const user = await uService.find(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
