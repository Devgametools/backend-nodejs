const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async hideInfo (data) {
    delete data.dataValues.password;
    delete data.dataValues.recoveryToken;
  }

  async show() {
    const data = await models.User.findAll({ include: ['customer'] });
    if (!data) {
      throw boom.notFound('No users found');
    }
    else {
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
    }
    else {
      this.hideInfo(user);
      return user;
    }
  }

  async userLogin(username) {
    const user = await models.User.findOne({where: { username }});
    return user;
  }

  async emailLogin (email) {
    const customer = await models.Customer.findOne({where: { email }, include: ['user']});
    return customer;
  }

  async getUser (identifier) {
    const user = await this.userLogin(identifier);
    if (!user) {
      const customer = await this.emailLogin(identifier);
      if (!customer) {
        throw boom.notFound('User not found');
      }
      else {
        return customer.user;
      }
    }
    else {
      return user;
    }
  }

  async create(data) {
    const newUser = await models.User.create(data, { include: ['customer'] });
    if (!newUser) {
      throw boom.notAcceptable('No data found to create user');
    }
    else {
      this.hideInfo(newUser);
      return newUser;
    }
  }

  async update(username, changes) {
    const user = await this.find(username);
    await user.update(changes);
    user.set({modifiedAt: Date.now()});
    await user.save();
    this.hideInfo(user);
    return user;
  }

  async updatePassword(username, data) {
    const user = await this.find(username);
    user.set({modifiedAt: Date.now(), password: data.password});
    await user.save();
    this.hideInfo(user);
    return user;
  }

  async delete(username) {
    const user = await this.find(username);
    await user.destroy();
    await user.customer.destroy();
    return username;
  }
}

module.exports = UsersService;
