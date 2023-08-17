const boom = require('@hapi/boom');
//const bcrypt = require('bcryptjs');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async show() {
    const data = await models.User.findAll({ include: ['customer'] });
    data.map((user) => delete user.dataValues.password);
    if (!data) {
      throw boom.notFound('No users found');
    } else {
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
      delete user.dataValues.password;
      return user;
    }
  }

  async userLogin(username) {
    const user = await models.User.findOne({where: { username }, include: ['customer']});
      return user;
  }

  async emailLogin (email) {
    const customer = await models.Customer.findOne({where: { email }, include: ['user']});
    return customer;
  }

  async create(data) {
    const newUser = await models.User.create(data, { include: ['customer'] });
    if (!newUser) {
      throw boom.notAcceptable('No data found to create user');
    } else {
      delete newUser.dataValues.password;
      return newUser;
    }
  }

  async update(username, changes) {
    const user = await this.find(username);
    user.set({ modifiedAt: Date.now() });
    await user.save();
    const newInfo = await user.update(changes);
    if (newInfo.password) {
      delete newInfo.dataValues.password;
    }
    return newInfo;
  }

  async delete(username) {
    const user = await this.find(username);
    await user.destroy({ include: ['customer'] });
    return { username };
  }
}

module.exports = UsersService;
