const Sequelize = require('sequelize');

const sequelize = new Sequelize('nikitenko', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Импортируем модели
db.Category = require('./Category')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Course = require('./Course')(sequelize, Sequelize);
db.Enrollment = require('./Enrollment')(sequelize, Sequelize);
db.Instructor = require('./Instructor')(sequelize, Sequelize);

Object.keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

module.exports = db;
