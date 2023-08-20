const express = require('express');
const passport = require('passport');
//const boom = require('@hapi/boom');
const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders', passport.authenticate('jwt', {session: false}), getOrders);


// ************************************************************************************
// ************************************************************************************

async function getOrders (req, res, next) {
  try {
    const user = req.user
    const orders = await service.findByUser(user.cid);
    res.json(orders);
  } catch (error) {
    next(error);
  }
}


module.exports = router;
