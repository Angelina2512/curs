const express = require('express');
const router = express.Router();
const db = require('../models');

// CREATE an instructor
router.post('/instructors', async (req, res) => {
  try {
    const instructor = await db.Instructor.create(req.body);
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all instructors
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await db.Instructor.findAll();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single instructor
router.get('/instructors/:id', async (req, res) => {
  try {
    const instructor = await db.Instructor.findByPk(req.params.id);
    if (instructor === null) {
      res.status(404).json({ message: 'Instructor not found' });
    } else {
      res.json(instructor);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE an instructor
router.put('/instructors/:id', async (req, res) => {
  try {
    const [updated] = await db.Instructor.update(req.body, {
      where: { instructor_id: req.params.id },
    });
    if (updated) {
      const updatedInstructor = await db.Instructor.findByPk(req.params.id);
      res.status(200).json(updatedInstructor);
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE an instructor
router.delete('/instructors/:id', async (req, res) => {
  try {
    const deleted = await db.Instructor.destroy({
      where: { instructor_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
