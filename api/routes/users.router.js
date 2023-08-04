const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');

const service = new UsersService();

router.get('/', getUsers);
router.get('/:username', findUser);
router.post('/', createUser);
router.patch('/:username', updateUserInfo);
router.delete('/:username', deleteUser);


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
    res.status(201).json(body);
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
