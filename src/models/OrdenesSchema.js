import mongoose from 'mongoose';
import { ProductsCarritoSchema } from './ProductsCarritoSchema.js';

const OrdenesSchema = new mongoose.Schema({
  items: { type: [ProductsCarritoSchema], required: true },
  numero_orden: { type: Number },
  email: { type: String, required: true },
  direccion: { type: String, required: true },
  timestamp: { type: Date, required: true },
  estado: { type: String, default: 'generada' },
});

export { OrdenesSchema };
