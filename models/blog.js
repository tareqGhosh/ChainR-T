'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   Blog.belongsTo(Model.User, {
    //     foreignKey: { name: 'user_id', allowNull: false }
    // });
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs'
  });
  Blog.associate = function(models) {
    Blog.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
  };
  return Blog;
};