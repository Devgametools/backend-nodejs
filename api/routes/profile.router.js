const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');
const CartService = require('../services/cart.service');

const router = express.Router();
const os = new OrderService();
const cs = new CartService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  getOrders,
);

router.get(
  '/my-cart',
  passport.authenticate('jwt', { session: false }),
  getShoppingCart,
);

// ************************************************************************************
//  *-- MY ORDER FUNCTIONS --*
// ************************************************************************************

async function getOrders(req, res, next) {
  try {
    const user = req.user;
    const orders = await os.findByUser(user.cid);
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function getShoppingCart(req, res, next) {
  try {
    const user = req.user;
    const cart = await cs.show(user.cid);
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
