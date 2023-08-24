const joi = require('joi');

const id = joi.number().integer();
const orderId = joi.number().integer();
const method = joi.any().valid('tarjeta', 'transferencia', 'deposito');
const voucher = joi.string();
const images = joi.string();

const getPaymentSchema = joi.object({
  id: id.required()
});

const createPaymentSchema = joi.object({
  orderId: orderId.required(),
  method: method.required(),
  voucher: voucher.required(),
  images: images.required()
});

module.exports = { getPaymentSchema, createPaymentSchema };
