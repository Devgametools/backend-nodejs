const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');
const { checkUser } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new OrderService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  checkUser(),
  getOrders,
);

// ************************************************************************************
//  *-- MY ORDER FUNCTIONS --*
// ************************************************************************************

async function getOrders(req, res, next) {
  try {
    const user = req.user;
    const orders = await service.findByUser(user.cid);
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
