const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data, {include: ['customer']});
    if (!newUser) {
      throw boom.notAcceptable('No data found to create user');
    } else {
      return newUser;
    }
  }

  async show() {
    const data = await models.User.findAll({include: ['customer']});
    if (!data) {
      throw boom.notFound('No users found');
    } else {
      return data;
    }
  }

  async find(username) {
    const user = await models.User.findByPk(username);
    if (!user) {
      throw boom.notFound('User not Found');
    } else {
      return user;
    }
  }

  async update(username, changes) {
    const user = await this.find(username);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      const newInfo = await user.update(changes);
      return newInfo;
    }
  }

  async delete(username) {
    const user = await this.find(username);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      await user.destroy();
    }
    return { username };
  }
}

module.exports = UsersService;
