const joi = require('joi');

const username = joi.string().alphanum().min(3).max(30);
const password = joi.string().min(8).max(30);
const status = joi.any().valid('active', 'inactive');
const fullname = joi.string().min(3).max(30);
const email = joi.string().email();
const phone = joi.string();

const createAdminSchema = joi.object({
  username: username.required(),
  password: password.required(),
  fullname: fullname.required(),
  email: email.required(),
  phone: phone.required(),
});

const updateAdminSchema = joi.object({
  username,
  status,
  fullname,
  email,
  phone,
});

const updatePasswordSchema = joi.object({
  password: password.required(),
});

const getAdminSchema = joi.object({
  username: username.required(),
});

module.exports = {
  createAdminSchema,
  updateAdminSchema,
  updatePasswordSchema,
  getAdminSchema,
};
