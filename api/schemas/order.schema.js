const joi = require('joi');

const id = joi.number().integer();
const customerId =  joi.number().integer();
const orderStatus = joi.any().valid('requested', 'collected', 'sent', 'completed');
const paymentStatus = joi.boolean();
const shippingAddress = joi.number().integer();
const orderId = joi.number().integer();
const productId = joi.number().integer();
const quantity = joi.number().integer().min(1);

const createOrderSchema = joi.object({
  customerId: customerId.required(),
  shippingAddress: shippingAddress.required(),
  paymentStatus
});

const updateOrderSchema = joi.object({
  customerId,
  orderStatus,
  paymentStatus,
  shippingAddress,
});

const getOrderSchema = joi.object({
  id: id.required()
});

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required()
});

const updateItemSchema = joi.object({
  orderId,
  productId,
  quantity
});


module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema, updateItemSchema };
