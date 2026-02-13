import nodemailer from 'nodemailer';

// Create reusable transporter
export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Email templates
export const emailTemplates = {
  contactForm: (data: EmailData) => ({
    from: `"${process.env.SMTP_FROM_NAME || 'Portfolio Contact'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #ffffff; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #ffffff; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Time: ${new Date().toLocaleString()}
    `,
  }),

  autoReply: (data: EmailData) => ({
    from: `"${process.env.SMTP_FROM_NAME || 'Kushagra Bhardwaj'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Thank you for contacting me, ${data.name}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .social-links { margin-top: 20px; text-align: center; }
          .social-links a { margin: 0 10px; color: #ffffff; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">Thank You for Reaching Out!</h2>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Thank you for your message regarding "<strong>${data.subject}</strong>". I have received your inquiry and will get back to you as soon as possible.</p>
            <p>Your message:</p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #ffffff; margin: 20px 0;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
            <p>I typically respond within 24-48 hours. If your matter is urgent, feel free to reach out to me directly at <a href="mailto:kush2012bhardwaj@gmail.com">kush2012bhardwaj@gmail.com</a>.</p>
            <p>Best regards,<br><strong>Kushagra Bhardwaj</strong><br>Full Stack Developer</p>
            <div class="social-links">
              <a href="https://github.com/Kush05Bhardwaj">GitHub</a> |
              <a href="https://linkedin.com/in/kush2012bhardwaj">LinkedIn</a> |
              <a href="https://leetcode.com/u/Kush05Bhardwaj/">LeetCode</a>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${data.name},

Thank you for your message regarding "${data.subject}". I have received your inquiry and will get back to you as soon as possible.

Your message:
${data.message}

I typically respond within 24-48 hours. If your matter is urgent, feel free to reach out to me directly at kush2012bhardwaj@gmail.com.

Best regards,
Kushagra Bhardwaj
Full Stack Developer

GitHub: https://github.com/Kush05Bhardwaj
LinkedIn: https://linkedin.com/in/kush2012bhardwaj
LeetCode: https://leetcode.com/u/Kush05Bhardwaj/

---
This is an automated response. Please do not reply to this email.
    `,
  }),
};

// Send email helper
export async function sendEmail(mailOptions: any) {
  const transporter = createTransporter();
  return await transporter.sendMail(mailOptions);
}
