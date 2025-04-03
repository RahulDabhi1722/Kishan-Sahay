const nodemailer = require('nodemailer');

/**
 * Send an email using Nodemailer
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email plain text message
 * @param {String} options.html - Email HTML message (optional)
 * @returns {Promise} - Result of sending the email
 */
const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USERNAME || '',
      pass: process.env.SMTP_PASSWORD || ''
    }
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.FROM_NAME || 'Farmer Helper'} <${process.env.FROM_EMAIL || 'noreply@farmerhelper.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log(`Email sent: ${info.messageId}`);
};

module.exports = sendEmail;