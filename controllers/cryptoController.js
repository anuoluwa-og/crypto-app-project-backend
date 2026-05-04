import Crypto from '../models/Crypto.js';

export const getAllCryptos = async (req, res) => {
  const cryptos = await Crypto.find().sort({ createdAt: -1 });
  res.json(cryptos);
};

export const getGainers = async (req, res) => {
  // Top gainers: highest positive 24h change
  const gainers = await Crypto.find({ change: { $gt: 0 } }).sort({ change: -1 });
  res.json(gainers);
};

export const getNewListings = async (req, res) => {
  // Newest first
  const newOnes = await Crypto.find().sort({ createdAt: -1 });
  res.json(newOnes);
};

export const addCrypto = async (req, res) => {
  const { name, symbol, price, image, change } = req.body;
  try {
    const crypto = await Crypto.create({ name, symbol, price, image, change });
    res.status(201).json({ message: 'Crypto added', crypto });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};