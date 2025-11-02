const { createTransporter, emailTemplates } = require('../config/email');

// Simple in-memory queue fallback
let Queue;
let emailQueue;
let useRedis = false;

try {
  Queue = require('bull');
  // Try to create queue with Redis
  emailQueue = new Queue('email', {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 1000,
    },
    settings: {
      maxStalledCount: 3,
      stalledInterval: 30000,
    },
  });

  // Test Redis connection with timeout
  const connectionTimeout = setTimeout(() => {
    console.warn('Redis connection timeout - falling back to direct email sending');
    if (emailQueue) {
      emailQueue.close();
    }
    emailQueue = null;
    useRedis = false;
  }, 2000);

  // Process email queue
  emailQueue.process(async (job) => {
    const { type, data } = job.data;
    
    console.log(`Processing email job: ${type} for ${data.email || data.name}`);
    
    const transporter = createTransporter();
    
    let emailOptions;
    
    switch (type) {
      case 'contactForm':
        emailOptions = emailTemplates.contactForm(data);
        break;
      case 'autoReply':
        emailOptions = emailTemplates.autoReply(data);
        break;
      default:
        throw new Error(`Unknown email type: ${type}`);
    }
    
    const info = await transporter.sendMail(emailOptions);
    console.log(`Email sent: ${info.messageId}`);
    
    return { success: true, messageId: info.messageId };
  });

  // Queue event listeners
  emailQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed:`, result);
  });

  emailQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
  });

  emailQueue.on('ready', () => {
    clearTimeout(connectionTimeout);
    useRedis = true;
    console.log('✓ Email queue initialized with Redis');
  });

  // Suppress repeated connection errors
  emailQueue.on('error', (error) => {
    if (!useRedis && error.code === 'ECONNREFUSED') {
      // Silently ignore connection errors after first timeout
      return;
    }
    console.error('Queue error:', error.message);
  });

} catch (error) {
  console.warn('✗ Redis not available, using direct email sending');
  emailQueue = null;
}

// Helper function to add email to queue or send directly
const sendEmail = async (type, data, options = {}) => {
  try {
    // If queue is available, use it
    if (emailQueue) {
      const job = await emailQueue.add(
        { type, data },
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
          removeOnComplete: true,
          removeOnFail: false,
          ...options,
        }
      );
      
      return { success: true, jobId: job.id };
    } else {
      // Fallback to direct sending without queue
      console.log(`Sending email directly (no queue): ${type}`);
      
      const transporter = createTransporter();
      let emailOptions;
      
      switch (type) {
        case 'contactForm':
          emailOptions = emailTemplates.contactForm(data);
          break;
        case 'autoReply':
          emailOptions = emailTemplates.autoReply(data);
          break;
        default:
          throw new Error(`Unknown email type: ${type}`);
      }
      
      const info = await transporter.sendMail(emailOptions);
      console.log(`Email sent directly: ${info.messageId}`);
      
      return { success: true, messageId: info.messageId };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (emailQueue) {
    await emailQueue.close();
  }
});

module.exports = {
  emailQueue,
  sendEmail,
};
