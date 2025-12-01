// Test email configuration for Portfolio Contact Form
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
const envPath = path.join(__dirname, '.env.local');
console.log('Reading env file from:', envPath, '\n');

try {
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

  console.log('🔧 Testing email configuration...\n');
  console.log('SMTP_HOST:', envVars.SMTP_HOST);
  console.log('SMTP_PORT:', envVars.SMTP_PORT);
  console.log('SMTP_USER:', envVars.SMTP_USER);
  console.log('SMTP_PASS:', envVars.SMTP_PASS ? '***' + envVars.SMTP_PASS.slice(-4) : 'NOT SET');
  console.log('CONTACT_EMAIL:', envVars.CONTACT_EMAIL);
  console.log('\n');

  (async () => {
    try {
      const transporter = nodemailer.createTransport({
        host: envVars.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(envVars.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: envVars.SMTP_USER,
          pass: envVars.SMTP_PASS,
        },
      });

      console.log('📧 Verifying SMTP connection...');
      await transporter.verify();
      console.log('✅ SMTP connection verified!\n');

      console.log('📨 Sending test email...');
      const info = await transporter.sendMail({
        from: `"${envVars.SMTP_FROM_NAME}" <${envVars.SMTP_FROM_EMAIL}>`,
        to: envVars.CONTACT_EMAIL,
        subject: 'Test Email - Portfolio Contact Form',
        html: `
          <h1>✅ Test Email Successful</h1>
          <p>If you receive this email, your SMTP configuration is working correctly!</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `Test Email - If you receive this, your SMTP configuration is working!\nSent at: ${new Date().toLocaleString()}`,
      });

      console.log('\n✅ Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      console.log('\n✨ Check your inbox at:', envVars.CONTACT_EMAIL);
    } catch (error) {
      console.error('\n❌ Error sending email:', error.message);
      if (error.code) console.error('Error code:', error.code);
      if (error.command) console.error('Failed command:', error.command);
      
      console.log('\n📝 Common fixes:');
      console.log('1. Regenerate Gmail App Password: https://myaccount.google.com/apppasswords');
      console.log('2. Enable 2-Step Verification on your Google account');
      console.log('3. Make sure "Less secure app access" is OFF (use App Passwords instead)');
      console.log('4. Check if your Gmail account is locked or has security alerts');
    }
  })();

} catch (error) {
  console.error('❌ Error reading .env.local file:', error.message);
  console.log('\nMake sure the file exists at: .env.local');
}
