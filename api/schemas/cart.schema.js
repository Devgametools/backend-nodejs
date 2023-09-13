const joi = require('joi');

const productId = joi.number().integer();
const quantity = joi.number().integer();

const addItemSchema = joi.object({
  productId: productId.required(),
  quantity: quantity.required(),
});

const updateCartSchema = joi.object({
  quantity,
});

const getProductSchema = joi.object({
  productId: productId.required(),
});

module.exports = { addItemSchema, updateCartSchema, getProductSchema };
