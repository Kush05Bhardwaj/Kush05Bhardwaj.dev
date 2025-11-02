# Email Setup Guide

This portfolio uses **Nodemailer** with **Bull Queue** for handling contact form submissions via SMTP.

## Prerequisites

1. **Gmail Account** (or any SMTP provider)
2. **Redis Server** (optional, for queue functionality)

## Setup Instructions

### 1. Gmail SMTP Configuration

#### Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

#### Generate App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and your device
3. Generate password
4. Copy the 16-character password

### 2. Environment Variables

Update your `.env` file in the `backend` folder:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM_NAME=Kushagra Bhardwaj
SMTP_FROM_EMAIL=your-email@gmail.com
CONTACT_EMAIL=kush2012bhardwaj@gmail.com

# Redis Configuration (Optional)
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 3. Install Redis (Optional but Recommended)

#### Windows:
```bash
# Download from: https://github.com/microsoftarchive/redis/releases
# Or use WSL
```

#### Mac:
```bash
brew install redis
brew services start redis
```

#### Linux:
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

### 4. Install Dependencies

```bash
cd backend
npm install
```

## Features

### ✅ Implemented Features

1. **Contact Form Validation**
   - Client-side and server-side validation
   - Rate limiting (3 submissions per 15 minutes per IP)
   - Input sanitization

2. **Email Queue System**
   - Bull queue with Redis
   - Automatic retry on failure (3 attempts)
   - Exponential backoff

3. **Email Templates**
   - Admin notification email
   - Auto-reply to user
   - Beautiful HTML templates with your branding

4. **Database Storage**
   - All contact messages saved to MongoDB
   - Track email status (pending, sent, failed, read)
   - Admin dashboard integration ready

## API Endpoints

### POST `/api/contact`
Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hi, I'd like to discuss..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "data": {
    "id": "contact_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET `/api/contact`
Get all contact messages (Admin only - auth required)

### GET `/api/contact/:id`
Get single contact message (Admin only)

### DELETE `/api/contact/:id`
Delete contact message (Admin only)

## Testing

### Without Redis
The system will still work without Redis, but emails will be sent synchronously instead of queued.

### Test the Contact Form
1. Start the backend server: `npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Fill out the contact form at `http://localhost:3000#contact`
4. Check your email for:
   - Admin notification (to `CONTACT_EMAIL`)
   - Auto-reply (to user's email)

## Troubleshooting

### Emails Not Sending

1. **Check SMTP credentials**
   - Verify `SMTP_USER` and `SMTP_PASS` are correct
   - Ensure app password is used (not regular Gmail password)

2. **Check Gmail Security**
   - Enable "Less secure app access" if not using app passwords
   - Check for security alerts from Google

3. **Check Logs**
   ```bash
   # Backend logs will show email queue processing
   npm run dev
   ```

4. **Test SMTP Connection**
   - The server will log email sending attempts
   - Check for errors in console

### Redis Connection Issues

If Redis is not installed:
- Emails will still be sent, but without queueing
- Consider installing Redis for production use

## Production Deployment

### Environment Variables
Make sure to set these in your production environment:
- `NODE_ENV=production`
- All SMTP credentials
- Redis connection details (if using)

### Recommendations
1. Use a dedicated email service (SendGrid, Mailgun, etc.) for better deliverability
2. Set up Redis for queue reliability
3. Enable email notifications for failed sends
4. Monitor queue health

## Alternative SMTP Providers

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

## Support

If you encounter any issues, check:
1. Backend console logs
2. Network tab in browser DevTools
3. Email provider's logs/dashboard
4. MongoDB for saved contacts

For more help, see the main README.md file.
