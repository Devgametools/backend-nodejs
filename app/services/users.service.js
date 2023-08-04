const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [
      {
        id: '0925317182',
        name: 'Roberto Bravo',
        username: 'robertbass',
        mail: 'robertbass@hotmail.com',
        password: '12345',
      },
    ];
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
    if (this.users.length == 0) {
      throw boom.notFound('No users found');
    } else {
      return this.users;
    }
  }

  async findUser(username) {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw boom.notFound('User not Found');
    } else {
      return user;
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
