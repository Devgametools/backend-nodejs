const joi = require('joi');

const username = joi.string().alphanum().min(3).max(30);
const password = joi.string().min(8).max(30);
const role = joi.any().valid('sysadmin', 'admin', 'client' );
const status = joi.any().valid('active', 'inactive');
const modifiedAt = joi.date();
const name = joi.string().min(3).max(30);
const lastName = joi.string();
const email = joi.string().email();
const phone =  joi.string();

const createUserSchema = joi.object({
  username: username.required(),
  password: password.required(),
  role: role.required(),
  customer: joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    phone: phone.required()
  })
});

const updateUserSchema = joi.object({
  username,
  password,
  role,
  status,
  modifiedAt,
  customer: joi.object({
    name,
    lastName,
    email,
    phone
  })

});

const getUserSchema = joi.object({
  username: username.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
