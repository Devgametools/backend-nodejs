const express = require('express');
const router = express.Router();
const passport = require('passport');
const CustomersService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkUser } = require('../middlewares/auth.handler');
const {
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

const service = new CustomersService();

// ************************************************************************************
//  *-- ROUTES --*
// ************************************************************************************

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkUser(),
  validatorHandler(getCustomerSchema, 'params'),
  findCustomer,
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkUser(),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomer,
);

// ************************************************************************************
//  *-- CUSTOMER FUNCTIONS --*
// ************************************************************************************

async function findCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await service.find(parseInt(id));
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
}

async function updateCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    await service.update(parseInt(id), body);
    res.status(202).json({ message: 'Customer updated successfully', body });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
