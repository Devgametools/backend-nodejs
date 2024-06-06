const express = require('express');
const passport = require('passport');
const router = express.Router();
const AddressService = require('../services/address.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getAddressSchema,
  createAddressSchema,
  updateAddressSchema,
} = require('../schemas/address.schema');

const service = new AddressService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get('/', passport.authenticate('jwt', { session: false }), getAddresses);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  findAddress,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createAddressSchema, 'body'),
  createAddress,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  validatorHandler(updateAddressSchema, 'body'),
  updateAddress,
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getAddressSchema, 'params'),
  deleteAddress,
);

// ************************************************************************************
//  *-- PRODUCT FUNCTIONS --*
// ************************************************************************************

async function getAddresses(req, res, next) {
  try {
    const user = req.user;
    const addresses = await service.show(user.cid);
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
}

async function findAddress(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const address = await service.find(parseInt(id), user.cid);
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
}

async function createAddress(req, res, next) {
  try {
    const body = req.body;
    const user = req.user;
    const address = await service.create(body, user.cid);
    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
}

async function updateAddress(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = req.user;
    const address = await service.update(id, user.cid, body);
    res.status(202).json(address);
  } catch (error) {
    next(error);
  }
}

async function deleteAddress(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    res.status(202).json(await service.delete(id, user.cid));
  } catch (error) {
    next(error);
  }
}

module.exports = router;
