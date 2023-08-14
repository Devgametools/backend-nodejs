const joi = require('joi');

const id = joi.number().integer();
const customerId =  joi.number().integer();
const status = joi.any().valid('pending', 'collected', 'sent', 'completed');
const location = joi.any().valid('local', 'international');
const orderId = joi.number().integer();
const productId = joi.number().integer();
const amount = joi.number().integer().min(1);

const createOrderSchema = joi.object({
  customerId: customerId.required(),
  location: location.required()
});

const updateOrderSchema = joi.object({
  customerId: customerId,
  status: status,
  location: location,
});

const getOrderSchema = joi.object({
  id: id.required()
});

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const updateItemSchema = joi.object({
  orderId: orderId,
  productId: productId,
  amount: amount
});


module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema, updateItemSchema };
