import { createTransport } from 'nodemailer';

const MAIL = 'anaplopez07@gmail.com';
const PWD_MAIL = 'zittzndqjumxrsqb';

export const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: MAIL,
    pass: PWD_MAIL,
  },
});
