const express = require('express');
const app = express();
const sequelize = require('./database');

// Подключение роутов
const categoriesRouter = require('./routes/Categories');
const usersRouter = require('./routes/Users');
const enrollmentsRouter = require('./routes/Enrollments');
const coursesRouter = require('./routes/Courses');
const instructionRouter = require('./routes/Instructors');

// Применение роутов к приложению
app.use(express.json()); // Для парсинга JSON-тела запросов

app.use('', categoriesRouter);
app.use('', usersRouter);
app.use('', enrollmentsRouter);
app.use('', coursesRouter);
app.use('', instructionRouter);

// Проверка соединения с базой данных и запуск сервера
(async () => {
  try {
    await sequelize.authenticate();
    console.log('БД подключена');

    // Синхронизация моделей с базой данных (создание таблиц)
    await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Запущено на порту - ${PORT}`);
    });
  } catch (error) {
    console.error('Не возможнo подключится к бд:', error);
  }
})();
