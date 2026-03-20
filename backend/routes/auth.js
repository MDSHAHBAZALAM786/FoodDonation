const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password, role, mobile } = req.body;

  try {
    if (!email || !password || !mobile) {
      return res.status(400).json({ message: "name, email, mobile and password are required" });
    }

    if (role === 'admin') {
      return res.status(400).json({ message: "Admin account cannot be created via register" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name || "",
      email,
      mobile,
      password: hashedPassword,
      role: role || "receiver",
    });

    return res.json({ message: "User registered successfully", id: user._id });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Registration failed" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  // Hardcoded admin login
  if (email === 'admin9558@gmail.com' && password === 'Admin@#001') {
    const token = jwt.sign(
      { id: 'admin-hardcoded', role: 'admin', email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({ token, email, role: 'admin' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token, email: user.email, role: user.role, mobile: user.mobile });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;