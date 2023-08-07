const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {
  }

  async create(data) {
    const newUser = await models.User.create(data);
    if (!newUser) {
      throw boom.notAcceptable('No data found to create user');
    } else {
      return newUser;
    }
  }

  async show() {
    const data = await models.User.findAll();
    if (!data) {
      throw boom.notFound('No users found');
    } else {
      return data;
    }
  }

  async findUser(username) {
    const user = await models.User.findByPk(username);
    if (!user) {
      throw boom.notFound('User not Found');
    } else {
      return user;
    }
  }

  async update(username, changes) {
    const user = await this.findUser(username);
    const newInfo = await user.update(changes);
      return newInfo;
  }

  async delete(username) {
    const user = await this.findUser(username);
    await user.destroy();
    return { username };
  }
}

module.exports = UsersService;
