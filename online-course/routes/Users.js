const express = require('express');
const router = express.Router();
const db = require('../models');

// CREATE a user
router.post('/users', async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all users
router.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (user === null) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a user
router.put('/users/:id', async (req, res) => {
  try {
    const [updated] = await db.User.update(req.body, {
      where: { user_id: req.params.id },
    });
    if (updated) {
      const updatedUser = await db.User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a user
router.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await db.User.destroy({
      where: { user_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
