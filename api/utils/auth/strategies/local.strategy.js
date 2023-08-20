const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const UserService = require('../../../services/users.service');
const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'identifier',
    passwordField: 'password',
  },
  async (identifier, password, done) => {
    try {
      const user = await service.userLogin(identifier);
      if (!user) {
        const customer = await service.emailLogin(identifier);
        if (!customer) {
          done(boom.unauthorized('User not found'));
        } else {
          if (customer.user.status === 'inactive') {
            done(boom.unauthorized('User Inactive'));
          } else {
            const validatePassword = await bcrypt.compare(
              password,
              customer.user.password,
            );
            if (!validatePassword) {
              done(boom.unauthorized('Invalid Password'), false);
            } else {
              delete customer.user.dataValues.password;
              done(null, customer);
            }
          }
        }
      } else {
        if (user.status === 'inactive') {
          done(boom.unauthorized('User Inactive'));
        } else {
          const validatePassword = await bcrypt.compare(
            password,
            user.password,
          );
          if (!validatePassword) {
            done(boom.unauthorized('Invalid Password'), false);
          } else {
            delete user.dataValues.password;
            done(null, user);
          }
        }
      }
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;
