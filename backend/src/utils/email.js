const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

/**
 * Create transporter
 */
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('⚠️  Email configuration missing. Email functionality will not work.');
    return null;
  }

  return nodemailer.createTransporter(emailConfig.smtp);
};

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 */
exports.sendEmail = async (options) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('Email skipped - no configuration');
    return;
  }

  const mailOptions = {
    from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    throw error;
  }
};

/**
 * Send welcome email
 */
exports.sendWelcomeEmail = async (user) => {
  await exports.sendEmail({
    to: user.email,
    subject: 'Welcome to NovaShop!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .button { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to NovaShop!</h1>
          </div>
          <div class="content">
            <h2>Hi ${user.firstName},</h2>
            <p>Thank you for joining NovaShop! We're excited to have you as part of our community.</p>
            <p>Your account has been successfully created. You can now:</p>
            <ul>
              <li>Browse our amazing products</li>
              <li>Add items to your wishlist</li>
              <li>Track your orders</li>
              <li>Get exclusive deals and offers</li>
            </ul>
            <a href="${process.env.CLIENT_URL}/products" class="button">Start Shopping</a>
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Happy Shopping!</p>
            <p><strong>The NovaShop Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `
  });
};

/**
 * Send order confirmation email
 */
exports.sendOrderConfirmationEmail = async (user, order) => {
  await exports.sendEmail({
    to: user.email,
    subject: `Order Confirmation - #${order.id.substring(0, 8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .order-summary { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .total { font-size: 1.2em; font-weight: bold; color: #10B981; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hi ${user.firstName},</h2>
            <p>Thank you for your order! We've received it and will process it soon.</p>
            <div class="order-summary">
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> <span class="total">$${order.total}</span></p>
            </div>
            <p>We'll send you another email when your order ships.</p>
            <p><strong>The NovaShop Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `
  });
};
