require('dotenv').config();

module.exports = {
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  },
  from: {
    email: process.env.FROM_EMAIL || 'noreply@novashop.com',
    name: process.env.FROM_NAME || 'NovaShop'
  }
};
