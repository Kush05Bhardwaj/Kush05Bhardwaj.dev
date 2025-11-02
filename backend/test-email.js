require('dotenv').config();
const { createTransporter } = require('./config/email');

async function testEmail() {
  console.log('Testing email configuration...\n');
  console.log('SMTP Settings:');
  console.log('- Host:', process.env.SMTP_HOST);
  console.log('- Port:', process.env.SMTP_PORT);
  console.log('- User:', process.env.SMTP_USER);
  console.log('- Pass:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('- From:', process.env.SMTP_FROM_EMAIL);
  console.log('- To:', process.env.CONTACT_EMAIL);
  console.log('\n');

  try {
    const transporter = createTransporter();

    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection verified successfully!\n');

    // Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: 'Test Email from Portfolio Backend',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify your SMTP configuration is working correctly.</p>
        <p>If you received this email, your email setup is working! 🎉</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `Test Email\n\nThis is a test email to verify your SMTP configuration is working correctly.\n\nIf you received this email, your email setup is working!\n\nTime: ${new Date().toLocaleString()}`,
    });

    console.log('✓ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\nCheck your inbox at:', process.env.CONTACT_EMAIL);
  } catch (error) {
    console.error('✗ Email test failed!');
    console.error('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n⚠️  Authentication failed!');
      console.error('Solutions:');
      console.error('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.error('2. Enable 2-Step Verification on your Google Account');
      console.error('3. Generate a new App Password at: https://myaccount.google.com/apppasswords');
      console.error('4. Remove spaces from the app password in .env file');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️  Connection refused!');
      console.error('Check your SMTP host and port settings');
    }
  }

  process.exit();
}

testEmail();
