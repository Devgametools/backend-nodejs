const express = require('express');
const router = express.Router();
const OrdersService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');

const service = new OrdersService();


router.get('/', getOrders);
router.get('/:id', validatorHandler(getOrderSchema, 'params'), findOrder);
router.post('/', validatorHandler(createOrderSchema, 'body'), createOrder);
router.post('/add-item', validatorHandler(addItemSchema, 'body'), createItem);
router.patch('/:id', validatorHandler(getOrderSchema, 'params'), validatorHandler(updateOrderSchema, 'body'), updateOrder);
router.put('/:id', validatorHandler(getOrderSchema, 'params'), validatorHandler(updateOrderSchema, 'body'), updateOrder);
router.delete('/:id', validatorHandler(getOrderSchema, 'params'), deleteOrder);

// ************************************************************************************
// ************************************************************************************

async function getOrders(req, res, next) {
  try {
    const orders = await service.show();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

async function findOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = await service.find(parseInt(id));
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const body = req.body;
    await service.create(body);
    res.status(201).json({ message: 'Order created successfully', body });
  } catch (error) {
    next(error)
  }
}

async function createItem(req, res, next) {
  try {
    const body = req.body;
    await service.addItem(body);
    res.status(201).json({ message: 'Order created successfully', body });
  } catch (error) {
    next(error)
  }
}

async function updateOrder (req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    await service.update(parseInt(id), body);
    res.status(202).json({ message: 'Order updated successfully', body });
  } catch (error) {
    next(error);
  }
}

async function deleteOrder (req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(parseInt(id));
    res.status(202).json({ message: 'Order deleted successfully', id });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
