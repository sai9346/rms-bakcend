const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variables for email credentials
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendRegistrationLink = async (email, registrationLink) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Team Registration Invitation',
      text: `You have been invited to join the team. Please complete your registration using the following link: ${registrationLink}`,
      html: `<p>You have been invited to join the team. Please complete your registration using the following link:</p>
            <a href="${registrationLink}">${registrationLink}</a>`,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendRegistrationLink,
};
