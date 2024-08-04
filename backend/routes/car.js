const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const upload = require('../config/multer');
const path = require('path');

// POST route to create a new car with an image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newCar = new Car({
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      color: req.body.color,
      image: req.file ? path.basename(req.file.path) : null // Handle missing files
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all cars
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const cars = await Car.find().skip(skip).limit(limit);
    const totalCount = await Car.countDocuments();

    res.json({ cars, totalCount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a car by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      color: req.body.color,
      image: req.file ? path.basename(req.file.path) : undefined // Handle file uploads
    };

    const car = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
