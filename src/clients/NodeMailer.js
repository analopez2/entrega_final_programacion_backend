import { createTransport } from 'nodemailer';
import { config } from '../config/config.js';

export const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.MAIL,
    pass: config.PWD_MAIL,
  },
});
