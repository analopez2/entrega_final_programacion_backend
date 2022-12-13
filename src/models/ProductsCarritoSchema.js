import mongoose from 'mongoose';
import { ProductsSchema } from './ProductsSchema.js';

const ProductsCarritoSchema = new mongoose.Schema({
  producto: { type: ProductsSchema, required: true },
  cantidad: { type: Number, required: true },
});

export { ProductsCarritoSchema };
