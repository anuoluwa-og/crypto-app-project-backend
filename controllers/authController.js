import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

res.cookie('token', token, { 
  httpOnly: true, 
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  secure: true
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register attempt:', { name, email, password }); // add this
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: 'Registered successfully', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Register error:', err); // add this
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ message: 'Logged in', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

export const getProfile = async (req, res) => {
  res.json(req.user); // req.user set by protect middleware
};