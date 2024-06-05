const express = require('express');
const router = express.Router();
const db = require('../models');

// CREATE an enrollment
router.post('/enrollments', async (req, res) => {
  try {
    const enrollment = await db.Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all enrollments
router.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await db.Enrollment.findAll();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single enrollment
router.get('/enrollments/:id', async (req, res) => {
  try {
    const enrollment = await db.Enrollment.findByPk(req.params.id);
    if (enrollment === null) {
      res.status(404).json({ message: 'Enrollment not found' });
    } else {
      res.json(enrollment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE an enrollment
router.put('/enrollments/:id', async (req, res) => {
  try {
    const [updated] = await db.Enrollment.update(req.body, {
      where: { enrollment_id: req.params.id },
    });
    if (updated) {
      const updatedEnrollment = await db.Enrollment.findByPk(req.params.id);
      res.status(200).json(updatedEnrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE an enrollment
router.delete('/enrollments/:id', async (req, res) => {
  try {
    const deleted = await db.Enrollment.destroy({
      where: { enrollment_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
