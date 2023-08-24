const joi = require('joi');

const id = joi.number().integer();
const cartId = joi.number().integer();
const productId = joi.number().integer();
const quantity = joi.number().integer();

const addItemSchema = joi.object({
  cartId: cartId.required(),
  productId: productId.required(),
  quantity: quantity.required()
});

const updateItemSchema = joi.object({
  cartId,
  productId,
  quantity
});

const getItemSchema = joi.object({
  id: id.required()
});

module.exports = { addItemSchema, updateItemSchema, getItemSchema };

