"use strict";
const { Model } = require("sequelize");
const PROTECTED_ATTRIBUTES = ["password"];
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      // hide protected fields
      let attributes = Object.assign({}, this.get());
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: {
        type: DataTypes.STRING,
        get() {
          return undefined;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
