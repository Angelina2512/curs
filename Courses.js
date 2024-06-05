const express = require('express');
const router = express.Router();
const db = require('../models');

// CREATE a course
router.post('/courses', async (req, res) => {
  try {
    const course = await db.Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await db.Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single course
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await db.Course.findByPk(req.params.id);
    if (course === null) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json(course);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a course
router.put('/courses/:id', async (req, res) => {
  try {
    const [updated] = await db.Course.update(req.body, {
      where: { course_id: req.params.id },
    });
    if (updated) {
      const updatedCourse = await db.Course.findByPk(req.params.id);
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a course
router.delete('/courses/:id', async (req, res) => {
  try {
    const deleted = await db.Course.destroy({
      where: { course_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Получение всех курсов с их категориями и преподавателями
router.get('/courses-with-details', async (req, res) => {
  try {
    const coursesWithDetails = await db.Course.findAll({
      include: [
        { model: db.Category }, // Включить категории
        { model: db.Instructor  }, // Включить преподавателей
      ],
    });
    res.json(coursesWithDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Получение всех пользователей с их курсами и статусом завершения
router.get('/users-with-courses', async (req, res) => {
  try {
    const usersWithCourses = await db.User.findAll({
      include: [
        {
          model: db.Enrollment,

          include: { model: db.Course }, // Включить курсы
        },
      ],
    });
    res.json(usersWithCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/course-enrollments/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courseEnrollments = await db.Enrollment.findAll({
      where: { course_id: courseId },
      include: { model: db.User}, // Включить пользователей
    });
    res.json(courseEnrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
