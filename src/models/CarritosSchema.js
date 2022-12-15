import mongoose from 'mongoose';
import { ProductsCarritoSchema } from './ProductsCarritoSchema.js';

const CarritosSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  productos: { type: [ProductsCarritoSchema], required: true },
  direccion: { type: String },
});

export { CarritosSchema };
