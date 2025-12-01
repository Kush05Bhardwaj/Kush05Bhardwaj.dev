// Test email configuration
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
const envPath = path.join(__dirname, 'src', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

async function testEmail() {
  console.log('🔧 Testing email configuration...\n');
  
  console.log('Environment variables:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
  console.log('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Enable debug output
    });

    console.log('📧 Verifying SMTP connection...\n');
    await transporter.verify();
    console.log('✅ SMTP connection verified!\n');

    console.log('📨 Sending test email...\n');
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: 'Test Email - Portfolio Contact Form',
      html: `
        <h1>Test Email</h1>
        <p>If you receive this email, your SMTP configuration is working correctly!</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
      `,
      text: `Test Email - If you receive this, your SMTP configuration is working!\nSent at: ${new Date().toLocaleString()}`,
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.command) {
      console.error('Failed command:', error.command);
    }
  }
}

testEmail();
