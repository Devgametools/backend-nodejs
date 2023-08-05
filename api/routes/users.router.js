const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');

const service = new UsersService();

router.get('/', getUsers);
router.get('/:username', validatorHandler(getUserSchema, 'params'), findUser);
router.post('/', validatorHandler(createUserSchema, 'body'), createUser);
router.patch('/:username', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), updateUserInfo);
router.delete('/:username', validatorHandler(getUserSchema, 'params'), deleteUser);


// ************************************************************************************
// ************************************************************************************

async function getUsers (req, res, next) {
  try {
    const users = await service.show();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function findUser (req, res, next) {
  try {
    const { username } = req.params;
    const user = await service.findUser(username)
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser (req, res, next) {
  try {
    const body = req.body;
    await service.create(body);
    res.status(201).json({message: "User created succesfully", body});
  } catch (error) {
    next(error);
  }
}

async function updateUserInfo (req, res, next) {
  try {
    const { username } = req.params;
    const body = req.body;
    await service.update(username, body);
    res.status(202).json({message: 'User info update successfully', body});
  } catch (error) {
    next(error);
  }
}

async function deleteUser (req, res, next) {
  try {
    const { username } = req.params;
    await service.delete(username);
    res.status(202).json({message: "User deleted successfully", username});
  } catch (error) {
    next(error);
  }
}

module.exports = router;
