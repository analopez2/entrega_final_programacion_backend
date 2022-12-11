import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
  },
  { timestamps: true },
);

export { UsersSchema };
