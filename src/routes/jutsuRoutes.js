const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Jutsu = require('../models/jutsuModel');

// Middleware de validation
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

// Create a new jutsu
router.post('/', validate([
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('rank').isIn(['D', 'C', 'B', 'A', 'S']).withMessage('Invalid rank'),
  body('type').isIn(['Ninjutsu', 'Genjutsu', 'Taijutsu', 'Kekkei Genkai', 'Senjutsu']).withMessage('Invalid type')
]), async (req, res) => {
  try {
    const jutsu = new Jutsu(req.body);
    const savedJutsu = await jutsu.save();
    res.status(201).json(savedJutsu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all jutsu
router.get('/', async (req, res) => {
  try {
    const jutsus = await Jutsu.find();
    res.json(jutsus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific jutsu
router.get('/:id', async (req, res) => {
  try {
    const jutsu = await Jutsu.findById(req.params.id);
    if (!jutsu) return res.status(404).json({ message: 'Jutsu not found' });
    res.json(jutsu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a jutsu
router.put('/:id', async (req, res) => {
  try {
    const updatedJutsu = await Jutsu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJutsu) return res.status(404).json({ message: 'Jutsu not found' });
    res.json(updatedJutsu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a jutsu
router.delete('/:id', async (req, res) => {
  try {
    const deletedJutsu = await Jutsu.findByIdAndDelete(req.params.id);
    if (!deletedJutsu) return res.status(404).json({ message: 'Jutsu not found' });
    res.json({ message: 'Jutsu deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;