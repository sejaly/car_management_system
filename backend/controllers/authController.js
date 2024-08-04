const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user without hashing the password
    const user = new User({
      name,
      email,
      password, // Plaintext password stored directly
      role,
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        password: user.password, // Returning plaintext password (not recommended for security reasons)
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error('Error registering user:', err.stack);
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request data:', req.body);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare provided password with stored password (without hashing)
    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.json({ token, role: user.role, user });
  } catch (err) {
    console.error('Error logging in:', err.stack);
    res.status(500).json({ msg: 'Error logging in' });
  }
};