const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const UserService = require('./users.service');
const service = new UserService();

class AuthService {

  async getUser(identifier, password) {
    try {
      const user = await service.userLogin(identifier);
      if (!user) {
        const customer = await service.emailLogin(identifier);
        if (!customer) {
          throw boom.unauthorized('User not found');
        } else {
          if (customer.user.status === 'inactive') {
            throw boom.unauthorized('User Inactive');
          } else {
            const validatePassword = await bcrypt.compare(
              password,
              customer.user.password,
            );
            if (!validatePassword) {
              throw boom.unauthorized('Invalid Password');
            } else {
              delete customer.user.dataValues.password;
              delete customer.user.dataValues.recoveryToken;
              return customer;
            }
          }
        }
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
            delete user.dataValues.password;
            delete user.dataValues.recoveryToken;
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
        delete customer.user.dataValues.password;
        delete customer.user.dataValues.recoveryToken;
        return token;
      } else {
        const payload = {
          sub: user.username,
          role: user.role,
          cid: user.customerId,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return token;
      }
    } catch (error) {
      boom.unauthorized(error);
    }
  }

  //******************************************************************************** */
  //******************************************************************************** */

  async sendMail (info) {
    const transporter = nodemailer.createTransport({
      host: config.mailServer,
      secure: true,
      port: 465,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword
      }
    });
    await transporter.sendMail(info);
    return;
  }

    //******************************************************************************** */
   //******************************************************************************** */

   async sendRecovery (identifier) {
    const customer = await service.emailLogin(identifier);
    if (!customer) {
      const user = await service.userLogin(identifier);
      if (!user) {
        throw boom.unauthorized();
      } else {
        const payload = {
          sub: user.username
        };
        const token = jwt.sign(payload, config.jwtSecret);
        const link = `http://localhost:3000/api/v1/auth/recovery?token=${token}`;
        await service.update(user.username, {recoveryToken: token});
        const info = {
          from: config.mailUser,
          to: user.customer.email,
          subject: "Baby's Room - Password Recovery",
          html: `<b>Hola estimado ${user.customer.name}, haz click en este link para recuperar tu contrasena: ${link}</b>`,
        };
        await this.sendMail(info);
        return {message:"Recovery email has been sent"};
      }
    } else {
      const payload = {
        sub: customer.user.username
      };
      const token = jwt.sign(payload, config.jwtSecret);
      const link = `http://localhost:3000/api/v1/auth/recovery?token=${token}`;
      await service.update(customer.user.username, {recoveryToken: token});
      const info = {
        from: config.mailUser,
        to: customer.email,
        subject: "Baby's Room - Password Recovery",
        html: `<b>Hola estimado ${customer.name}, haz click en este link para recuperar tu contrasena: ${link}</b>`,
      };
      await this.sendMail(info);
      return {message:"Recovery email has been sent"};
    }
   }

      //******************************************************************************** */
      //******************************************************************************** */

      async changePassword (token, newPassword) {
        try {
          const payload = jwt.verify(token, config.jwtSecret);
          const user = await service.find(payload.sub);
          if (user.recoveryToken !== token) {
            throw boom.unauthorized();
          } else {
            const encrypted = await bcrypt.hash(newPassword, 10);
            await service.update(user.username, {recoveryToken: null, password: encrypted});
            return {message: 'Password has been changed succesfully'};
          }
        } catch (error) {
          throw boom.unauthorized(error);
        }
      }

}

module.exports = AuthService;
