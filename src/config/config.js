import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  URL_MONGO_DB: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.iqc88.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
  PORT: process.env.PORT,
  EXPIRES_IN: process.env.EXPIRES_IN,
  PWD_MAIL: process.env.PWD_MAIL,
  ADMIN_ID: process.env.ADMIN_ID,
  ADMIN_CART_ID: process.env.ADMIN_CART_ID,
  MAIL: process.env.MAIL,
  PWD_MAIL: process.env.PWD_MAIL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  AVATAR: process.env.AVATAR,
};
