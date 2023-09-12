const express = require('express');
const passport = require('passport');
const router = express.Router();
const CartService = require('../services/cart.service');
const { checkCustomer } = require('../middlewares/auth.handler');
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
  '/item-detail',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'body'),
  findItem,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  addItem,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkCustomer(),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateCartSchema, 'body'),
  updateItem,
);

router.delete(
  '/:id',
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
    const body = req.body;
    const user = req.user;
    const item = await service.findProduct(body.productId, body.customerId);
    if (item.customerId === user.cid) {
      res.status(200).json(item);
    } else {
      res
        .status(401)
        .json({ message: 'No autorizado para realizar esta accion' });
    }
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
    const { id } = req.params;
    const body = req.body;
    const user = req.user;
    const item = await service.find(id);
    if (item.customerId === user.cid) {
      const newItem = await service.update(id, body);
      res.status(202).json(newItem);
    } else {
      res
        .status(401)
        .json({ message: 'No autorizado para realizar esta accion' });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const item = await service.find(id);
    if (item.customerId === user.cid) {
      await service.delete(id);
      res.status(202).json({ message: 'Item eliminado del Shopping Cart', id });
    } else {
      res
        .status(401)
        .json({ message: 'No autorizado para realizar esta accion' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
