const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');
const { models } = require('../libs/sequelize');
const { sendMail } = require('../utils/mail');

class UsersService {
  constructor() {}

  async hideInfo(user) {
    delete user.dataValues.password;
    delete user.dataValues.validatorToken;
  }

  async activationRequest(identifier) {
    const user = await this.userLogin(identifier);
    if (!user) {
      throw boom.unauthorized();
    } else {
      const payload = {
        sub: user.username,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      const link = `http://localhost:3000/api/v1/users/activate-user?token=${token}`;
      user.set({ validatorToken: token });
      await user.save();
      const info = {
        from: config.mailUser,
        to: user.customer.email,
        subject: "Baby's Room - Activa tu cuenta",
        html: `<b>Hola estimado/a ${user.customer.name}, haz click en este link para activar tu cuenta: ${link}</b>`,
      };
      await sendMail(info);
      return { message: 'Activation email has been sent' };
    }
  }

  async create(data) {
    const newUser = await models.User.create(data, { include: ['customer'] });
    if (!newUser) {
      return {
        message: 'Error al crear usuario',
      };
    } else {
      this.hideInfo(newUser);
      this.activationRequest(newUser.username);
      const wallet = await models.Wallet.create({
        customerId: newUser.customer.id,
      });
      return {
        message: 'Usuario creado exitosamente',
        newUser,
        wallet: wallet.cash,
      };
    }
  }

  async activateAccount(identifier) {
    try {
      const user = await this.find(identifier);
      if (user.status === 'inactive') {
        user.set({
          validatorToken: null,
          status: 'active',
        });
        await user.save();
        return { message: 'User has been activated successfully' };
      } else {
        return { message: 'User is already active' };
      }
    } catch (error) {
      throw boom.unauthorized(error);
    }
  }

  async show() {
    const data = await models.User.findAll({ include: ['customer'] });
    if (!data) {
      throw boom.notFound('No users found');
    } else {
      data.map((user) => {
        this.hideInfo(user);
      });
      return data;
    }
  }

  async find(username) {
    const user = await models.User.findByPk(username, {
      include: ['customer'],
    });
    if (!user) {
      throw boom.notFound('User not Found');
    } else {
      this.hideInfo(user);
      return user;
    }
  }

  async userLogin(username) {
    const user = await models.User.findOne({
      where: { username },
      include: ['customer'],
    });
    return user;
  }

  async emailLogin(email) {
    const customer = await models.Customer.findOne({
      where: { email },
      include: ['user'],
    });
    return customer;
  }

  async getUser(identifier) {
    const user = await this.userLogin(identifier);
    if (!user) {
      const customer = await this.emailLogin(identifier);
      if (!customer) {
        throw boom.notFound('User not found');
      } else {
        return customer.user;
      }
    } else {
      return user;
    }
  }

  async update(username, changes) {
    const user = await this.find(username);
    await user.update(changes);
    user.set({ modifiedAt: Date.now() });
    await user.save();
    this.hideInfo(user);
    return user;
  }

  async updatePassword(username, data) {
    const user = await this.find(username);
    user.set({ modifiedAt: Date.now(), password: data.password });
    await user.save();
    this.hideInfo(user);
    return user;
  }
}

module.exports = UsersService;
