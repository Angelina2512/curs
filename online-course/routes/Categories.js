const express = require('express');
const router = express.Router();
const db = require('../models');

// CREATE a category
router.post('/categories', async (req, res) => {
  try {
    const category = await db.Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single category
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await db.Category.findByPk(req.params.id);
    if (category === null) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a category
router.put('/categories/:id', async (req, res) => {
  try {
    const [updated] = await db.Category.update(req.body, {
      where: { category_id: req.params.id },
    });
    if (updated) {
      const updatedCategory = await db.Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a category
router.delete('/categories/:id', async (req, res) => {
  try {
    const deleted = await db.Category.destroy({
      where: { category_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
