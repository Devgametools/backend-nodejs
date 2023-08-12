const joi = require('joi');

const username = joi.string().alphanum().min(3).max(30);
const password = joi.string().min(8).max(30);
const role = joi.any().valid('sysadmin', 'admin', 'client' );
const status = joi.any().valid('active', 'inactive');
const customerId = joi.number().integer();

const createUserSchema = joi.object({
  username: username.required(),
  password: password.required(),
  role: role.required(),
  customerId: customerId.required()
});

const updateUserSchema = joi.object({
  username: username,
  password: password,
  role: role,
  status: status
});

const getUserSchema = joi.object({
  username: username.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
