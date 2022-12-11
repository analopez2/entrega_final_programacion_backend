import mongoose from 'mongoose';
import ProductsSchema from './ProductsSchema.js';

const CarritosSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  productos: { type: [ProductsSchema], required: true },
});

export default { CarritosSchema };
