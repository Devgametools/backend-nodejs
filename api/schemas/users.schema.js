const joi = require('joi');

const name = joi.string().min(3).max(30);
const email = joi.string();
const username = joi.string().alphanum().min(3).max(30);
const password = joi.string().min(8).max(30);
const role = joi.any().valid('sysadmin', 'admin', 'client' );

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  username: username.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  username: username,
  password: password,
  role: role
});

const getUserSchema = joi.object({
  username: username.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
