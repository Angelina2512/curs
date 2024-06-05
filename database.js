const { Sequelize } = require('sequelize');

// Укажите свои данные для подключения к базе данных
const sequelize = new Sequelize('nikitenko', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
