import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  symbol: { type: String, required: true },
  price:  { type: Number, required: true },
  image:  { type: String, default: '' },
  change: { type: Number, default: 0 },   // 24h % change
}, { timestamps: true });

export default mongoose.model('Crypto', cryptoSchema);