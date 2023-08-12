const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/users.schema');

const service = new UsersService();


router.get('/', getUsers);
router.get('/:username', validatorHandler(getUserSchema, 'params'), findUser);
router.post('/', validatorHandler(createUserSchema, 'body'), createUser);
router.patch('/:username', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), updateUser);
router.put('/:username', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), updateUser);
router.delete('/:username', validatorHandler(getUserSchema, 'params'), deleteUser);

// ************************************************************************************
// ************************************************************************************

async function getUsers(req, res, next) {
  try {
    const users = await service.show();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function findUser(req, res, next) {
  try {
    const { username } = req.params;
    const user = await service.find(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const body = req.body;
    await service.create(body);
    res.status(201).json({ message: 'Item created successfully', body });
  } catch (error) {
    next(error)
  }
}

async function updateUser (req, res, next) {
  try {
    const { username } = req.params;
    const body = req.body;
    await service.update(username, body);
    res.status(202).json({ message: 'Item updated successfully', body });
  } catch (error) {
    next(error);
  }
}

async function deleteUser (req, res, next) {
  try {
    const { username } = req.params;
    await service.delete(username);
    res.status(202).json({ message: 'Item deleted successfully', username });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
