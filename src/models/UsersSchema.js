import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    telefono: String,
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: String,
    carrito: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Carrito',
    },
    direccion: String,
  },
  { timestamps: true },
);

export { UsersSchema };
