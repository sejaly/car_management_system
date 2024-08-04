const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  image: { type: String }  // Store the URL/path of the uploaded image
});

module.exports = mongoose.model('Car', carSchema);
