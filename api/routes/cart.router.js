const express = require('express');
const passport = require('passport');
const router = express.Router();
const CartService = require('../services/cart.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getProductSchema,
  addItemSchema,
  updateCartSchema,
} = require('../schemas/cart.schema');

const service = new CartService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get('/', passport.authenticate('jwt', { session: false }), getItems);

router.get(
  '/item-detail/:productId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  findItem,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  addItem,
);

router.patch(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateCartSchema, 'body'),
  updateItem,
);

router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  deleteItem,
);

// ************************************************************************************
//  *-- PRODUCT FUNCTIONS --*
// ********************************************************************item**********item
async function getItems(req, res, next) {
  try {
    const user = req.user;
    const items = await service.show(user.cid);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

async function findItem(req, res, next) {
  try {
    const { productId } = req.params;
    const user = req.user;
    const item = await service.findProduct(productId, user.cid);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function addItem(req, res, next) {
  try {
    const body = req.body;
    const user = req.user;
    const product = await service.addItem(body, user.cid);
    res.status(202).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const { productId } = req.params;
    const body = req.body;
    const user = req.user;
    const item = await service.update(productId, user.cid, body);
    res.status(202).json(item);
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { productId } = req.params;
    const user = req.user;
    res.status(202).json(await service.delete(productId, user.cid));
  } catch (error) {
    next(error);
  }
}

module.exports = router;
