const express = require('express');
const router = express.Router();
const CustomersService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateCustomerSchema, getCustomerSchema} = require('../schemas/customer.schema');

const service = new CustomersService();


router.get('/', getCustomers);
router.get('/:id', validatorHandler(getCustomerSchema, 'params'), findCustomer);
router.patch('/:id', validatorHandler(getCustomerSchema, 'params'), validatorHandler(updateCustomerSchema, 'body'), updateCustomer);
router.put('/:id', validatorHandler(getCustomerSchema, 'params'), validatorHandler(updateCustomerSchema, 'body'), updateCustomer);
router.delete('/:id', validatorHandler(getCustomerSchema, 'params'), deleteCustomer);

// ************************************************************************************
// ************************************************************************************

async function getCustomers(req, res, next) {
  try {
    const customers = await service.show();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
}

async function findCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await service.find(parseInt(id));
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
}

async function updateCustomer (req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    await service.update(parseInt(id), body);
    res.status(202).json({ message: 'Customer updated successfully', body });
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer (req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(parseInt(id));
    res.status(202).json({ message: 'Customer deleted successfully', id });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
