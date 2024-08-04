const Car = require('../models/car');
const cloudinary = require('../config/cloudinary'); // Ensure this file exists

// Create a new car with optional image upload
exports.createCar = async (req, res) => {
  try {
    const { name, model, year, price } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newCar = new Car({ name, model, year, price, image: imageUrl });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a car by ID with optional image upload
exports.updateCar = async (req, res) => {
  try {
    const { name, model, year, price } = req.body;
    const updatedData = { name, model, year, price };
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      updatedData.image = imageUrl;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search cars by name
exports.searchCarByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }

    const cars = await Car.find({ name: new RegExp(name, 'i') });

    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars found' });
    }

    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
