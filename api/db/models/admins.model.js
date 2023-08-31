const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

const ADMIN_TABLE = 'admins';

const adminSchema = {
  username: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    },
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  modifiedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'modified_at',
  },
};

class Admin extends Model {
  static associate() {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ADMIN_TABLE,
      modelName: 'Admin',
      timestamps: false,
    };
  }
}

module.exports = { ADMIN_TABLE, adminSchema, Admin };
