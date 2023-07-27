const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
const db_config = require('./db_config');

const client = new Sequelize(db_config.options);

module.exports = client;
