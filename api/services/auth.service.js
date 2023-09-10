const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UserService = require('./users.service');
const { sendMail } = require('../utils/mail');

const service = new UserService();

class AuthService {
  async validateUser(identifier, password) {
    try {
      const user = await service.getUser(identifier);
      if (!user) {
        throw boom.unauthorized('User not found');
      } else {
        if (user.status === 'inactive') {
          throw boom.unauthorized('User Inactive');
        } else {
          const validatePassword = await bcrypt.compare(
            password,
            user.password,
          );
          if (!validatePassword) {
            throw boom.unauthorized('Invalid Password');
          } else {
            service.hideInfo(user);
            return user;
          }
        }
      }
    } catch (error) {
      boom.unauthorized(error);
    }
  }

  //******************************************************************************** */
  //******************************************************************************** */

  async signToken(user) {
    try {
      if (!user.username) {
        const customer = await service.emailLogin(user.email);
        const payload = {
          sub: customer.user.username,
          role: customer.user.role,
          cid: customer.id,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        service.hideInfo(customer.user);
        return token;
      } else {
        const payload = {
          sub: user.username,
          role: user.role,
          cid: user.customerId,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        service.hideInfo(user);
        return token;
      }
    } catch (error) {
      boom.unauthorized(error);
    }
  }

  //******************************************************************************** */
  //******************************************************************************** */

  async sendRecovery(identifier) {
    const customer = await service.emailLogin(identifier);
    if (!customer) {
      const user = await service.userLogin(identifier);
      if (!user) {
        throw boom.unauthorized();
      } else {
        const payload = {
          sub: user.username,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        const link = `http://localhost:3000/api/v1/auth/recovery-password?token=${token}`;
        await service.update(user.username, { validatorToken: token });
        const info = {
          from: config.mailUser,
          to: user.customer.email,
          subject: "Baby's Room - Password Recovery",
          html: `<b>Hola estimado ${user.customer.name}, haz click en este link para recuperar tu contrasena: ${link}</b>`,
        };
        await sendMail(info);
        return { message: 'Recovery email has been sent' };
      }
    } else {
      const payload = {
        sub: customer.user.username,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      const link = `http://localhost:3000/api/v1/auth/recovery-password?token=${token}`;
      await service.update(customer.user.username, { validatorToken: token });
      const info = {
        from: config.mailUser,
        to: customer.email,
        subject: "Baby's Room - Password Recovery",
        html: `<b>Hola estimado ${customer.name}, haz click en este link para recuperar tu contrasena: ${link}</b>`,
      };
      await sendMail(info);
      return { message: 'Recovery email has been sent' };
    }
  }

  //******************************************************************************** */
  //******************************************************************************** */

  async recoveryPassword(identifier, newPassword) {
    try {
      const user = await service.find(identifier);
      await service.update(user.username, { validatorToken: null });
      await service.updatePassword(user.username, { password: newPassword });
      return { message: 'Password has been changed succesfully' };
    } catch (error) {
      throw boom.unauthorized(error);
    }
  }
}

module.exports = AuthService;
