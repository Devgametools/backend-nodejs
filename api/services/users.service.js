const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class UsersService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => {throw boom.notAcceptable(err)});
    this.show();
  }

  async create(data) {

    if (!data) {
      throw boom.notAcceptable('No data found to create user');
    } else {
      this.users.push(data);
      return data;
    }
  }

  async show() {
    const resultSet = await this.pool.query('SELECT * FROM users');
    if (resultSet.length == 0) {
      throw boom.notFound('No users found');
    } else {
      return resultSet.rows;
    }
  }

  async findUser(username) {
    const resultSet = await this.pool.query(`SELECT * FROM users WHERE username = '${username}'`);
    if (resultSet.length == 0) {
      throw boom.notFound('User not Found');
    } else {
      return resultSet.rows;
    }
  }

  async update(username, changes) {
    const index = this.users.findIndex((user) => user.username === username);
    if (index === -1) {
      throw boom.notFound('User not found');
    } else {
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes,
      };
    }
    return this.users[index];
  }

  async delete(username) {
    const index = this.users.findIndex((user) => user.username === username);
    if (index === -1) {
      throw boom.notFound('User not found');
    } else {
      this.users.splice(index, 1);
    }
    return { username };
  }
}

module.exports = UsersService;
