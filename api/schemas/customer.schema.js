const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const email = Joi.string().email();
const phone =  Joi.string();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  email,
  phone,
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
